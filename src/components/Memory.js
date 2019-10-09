import React from 'react'
import '../assets/Memory.css'
import { Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Form, Input, Button } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react'
// import cloudinary from 'cloudinary'
// import {Image, Transformation} from 'cloudinary-react'

class Memory extends React.Component {
    state = {
        isClicked: false,
        caption: "",
        date: "",
        link: "",
        baby_id: this.props.currentBaby.id
    }

    handleClick = () => {
        this.setState({
            isClicked: !this.state.isClicked, 
        })
    }


    handleBackClick = () => {
        this.setState({
            isClicked: false
        })
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value })
        }
  }

    render() {
        // console.log('memory', this.props)
        
        return (
        
        
        <div className="border">  
            <Icon corner className="delete-btn" name='delete' onClick={() => this.props.removeSelectedMemory(this.props.id)}/>
            <figure className="image-effect">
                <figcaption><span>{this.props.date}</span></figcaption>
                <div className="crop">
                <img 
                    // width and height are set in Cloudinary
                    src={this.props.link} 
                    alt={this.props.caption}
                    onClick={this.handleClick}
                    
                    />
                    </div>
                    {/* {cloudinary.imageTag(this.props.link, {width: 150, crop: "scale"}).toHtml()} */}
                    {this.state.isClicked ? 
                    <div className="image-description">
                        <Form id="edit-image-form">
                            <h2>Edit This Post</h2>
                            <Form.Field>
                                <label>Date</label>
                                <DateInput
                                    name="date"
                                    placeholder={this.props.date}
                                    value={this.state.date}
                                    iconPosition="left"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>

                            <Form.Field>
                                <label>Caption</label>
                                <Input fluid
                                placeholder={this.props.caption}
                                name="caption"
                                value={this.state.caption}
                                onChange={this.handleChange}
                                />
                            </Form.Field> 

                            

                            <Button type="submit" secondary
                            onClick={()=> this.props.editSelectedMemory(this.props.id, this.props.link, this.state)}
                            >
                                <Button.Content>Edit</Button.Content>
                            </Button>

                        </Form>
                    <Icon 
                        color="black" 
                        className="go-back-btn" 
                        onClick={this.handleBackClick}
                        name='arrow left'/>

                    </div> : 
                    <figcaption><p>{this.props.caption}</p></figcaption>}
                
            </figure>  
        </div>
        
        )
    }
}


function mapStateToProps(state) {
    // console.log('memory state', state)
    return {
        currentUser: state.currentUser,
        currentBaby: state.currentBaby
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeSelectedMemory: (id) => {
            const token = localStorage.getItem("token")
            if (token) {
                fetch(`http://localhost:3001/api/v1/media/${id}`, {
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
                                type: "REMOVE_SELECTED_MEMORY",
                                payload: id
                            })
                        }
                    })
            }
            
        }, 
        editSelectedMemory: (id,link, state) => {
            // const baby = this.props.currentBaby
            // console.log('edited hit')
            const token = localStorage.getItem("token")
            if (token) {
                fetch(`http://localhost:3001/api/v1/media/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Accepts': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify({
                            caption: state.caption,
                            date: state.date,
                            link: link,
                            baby_id: state.baby_id
                        })
                    }).then(res => res.json())
                    .then(response => {
                        if (response.errors) {
                            alert(response.errors)
                        } else {
                            // console.log('from edit memory fetch')
                            dispatch({
                                type: "EDIT_SELECTED_MEMORY",
                                payload: response
                            })
                        }
                    })
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Memory)