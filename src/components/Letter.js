import React from 'react'
import {Container, Image, Button, Icon, Form} from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../assets/Letter.css'
import stamp from '../assets/postage-stamp.png'
import $ from 'jquery';


class Letter extends React.Component {
    state = {
        content: "",
        baby_id: this.props.currentBaby.id,
    }

    componentDidMount() {
        $.fn.commentCards = function () {
            return this.each(function () {

                var $this = $(this),
                    $cards = $this.find('.card'),
                    $current = $cards.filter('.card--current'),
                    $next;

                $cards.on('click', function () {
                    if (!$current.is(this)) {
                        $cards.removeClass('card--current card--out card--next');
                        $current.addClass('card--out');
                        $current = $(this).stop().addClass('card--current');
                        $next = $current.next();
                        $next = $next.length ? $next : $cards.first();
                        $next.addClass('card--next');
                    }
                });

                if (!$current.length) {
                    $current = $cards.last();
                    $cards.first().trigger('click');
                }

                $this.addClass('cards--active');

            })

        };

        $('.cards').commentCards();
        
    }

    handleChange = (event, {name, value}) => {
        // console.log('value:', value)
        if (this.state.hasOwnProperty(name)) {
        this.setState({ 
            [name]: value,
        });
        }
    }

 

    render() {
        // console.log("IMPORTANT", this.props)
        return (
            
            <div className="wrapper">  
            <div>
            <link href='https://fonts.googleapis.com/css?family=La+Belle+Aurore' rel='stylesheet' type='text/css'/>
            {/* {!this.props.letters ? this.props.newLetterButtonClicked : null} */}
            <Container>  
            <li className="card">
                {this.props.newLetterButtonClicked ?  null: <Icon corner className="delete-btn" name='delete' onClick={() => this.props.removeSelectedLetter(this.props.id)}/> }<br></br><br></br>

                <div className="post-stample">
                </div>
                    <p className="greeting">Dear {this.props.currentBaby.first_name},</p> <br></br>

                    <Form onSubmit={this.props.isInEditMode && !this.props.newLetterButtonClicked? (() => this.props.editSelectedLetter(this.state, this.props.id)) : (() => this.props.addLetterToLetters(this.state))}>
                                {this.props.isInEditMode ?
                                <Form.TextArea
                                    // label="Message"
                                    id="content" 
                                    name="content" 
                                    placeholder="I hope you fall in love with being alive. I hope you have best friends and make fun memories and know the joys of genuine laughter. I hope you swim in the depths of the oceans, and feel the dirt underneath your fingernails when you climb mountains."
                                    defaultValue={this.props.content ? this.props.content : this.state.content}
                                    onChange={this.handleChange}
                                    onClick={this.props.changeEditMode}
                                />
                                :
                                <Form.TextArea
                                    // label="Message"
                                    id="content" 
                                    name="content" 
                                    placeholder="I hope you fall in love with being alive. I hope you have best friends and make fun memories and know the joys of genuine laughter. I hope you swim in the depths of the oceans, and feel the dirt underneath your fingernails when you climb mountains."
                                    value={this.props.content ? this.props.content : this.state.content}
                                    onChange={this.handleChange}
                                    onClick={this.props.changeEditMode}
                                />
                                }

                        { this.state.content !== "" && this.props.isInEditMode ?   
                        <Button circular
                            type="submit"
                            size="small"
                            icon color='teal'
                            id="add-note-button"
                            >
                            <Icon name="check"/>
                        </Button> : null}
                    </Form>

                    
                    
                <div className="signature">    
                <p>Lovingly,</p><br></br>
                <p>Your {this.props.currentBaby.relationship}</p>
                </div>
            <Image className="stamp" src={stamp} width="155" height="100" />
            

            </li> 
            </Container>
            </div>
            </div>

        )
    }
}


function mapStateToProps(state) {
    // console.log("TEST FROM LETTER!!:", state)
    return {
        currentBaby: state.currentBaby,
        letters: state.letters,
        newLetterButtonClicked: state.newLetterButtonClicked,
        isInEditMode: state.isInEditMode
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addLetterToLetters: (state) => {   
        const token = localStorage.getItem("token")
         if (token) {   
         return fetch("http://localhost:3001/api/v1/letters", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    content: state.content,
                    baby_id: state.baby_id
                })
            }).then(res => res.json())
            .then(response => {
                if (response.errors) {
                    alert(response.errors)
                } else {
                    dispatch({
                        type: "ADD_LETTER_TO_LETTERS",
                        payload: response
                    })
                  
                }
            })
        }
        },
        editSelectedLetter: (state, id) => {
            // const baby = this.props.currentBaby
            // console.log('edited hit')
            const token = localStorage.getItem("token")
            if (token) {
                fetch(`http://localhost:3001/api/v1/letters/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Accepts': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify({
                            content: state.content,
                            baby_id: state.baby_id
                        })
                    }).then(res => res.json())
                    .then(response => {
                    if (response.errors) {
                        alert(response.errors)
                    } else {
                        // console.log('from edit letter fetch')
                        dispatch({
                            type: "EDIT_SELECTED_LETTER",
                            payload: response
                        })
                    }
                })
            }
        },
        removeSelectedLetter: (id) => {
            const token = localStorage.getItem("token")
            if (token) {
                fetch(`http://localhost:3001/api/v1/letters/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Authorization': token
                        }
                    }).then(res => res.json())
                .then(response => {
                    if (response.errors) {
                        alert(response.errors)
                    } else {
                        // console.log('from delete memory fetch', response)
                        dispatch({
                            type: "REMOVE_SELECTED_LETTER",
                            payload: id
                        })
                    }
                })
            }
        },
        changeEditMode: (boolean) => {
            return dispatch({
                type: "EDIT_MODE_TOGGLED",
                payload: boolean
            })
        }
    }
}



export default connect(mapStateToProps,mapDispatchToProps)(Letter)