import React from 'react'
import { Container, Divider, Image, Button, Icon, Responsive } from 'semantic-ui-react'
import { connect } from 'react-redux'
import Letter from '../components/Letter'
import '../assets/Letter.css'
import bird from '../assets/hello-bird.png'
import arrow from '../assets/smooth-arrow.png'
import '../assets/LoveLettersContainer.css'
import line from '../assets/line-pattern.png'

class LoveLetterContainer extends React.Component {

    state = {
        letters: [],
    }

    componentDidUpdate(prevProps) {
        // console.log("inside componentDidMount: ", this.props.currentBaby)
        const token = localStorage.getItem("token")
        if (this.props.currentBaby !== prevProps.currentBaby) {
            fetch('http://localhost:3001/api/v1/letters', {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(res => res.json())
                .then(letters => {
                    // console.log('printing letters', letters)
                    this.props.saveLoveLetters(letters)
                    this.props.checkForLetters()
                    // this.setState({
                    //     letters: letters
                    // })
                })
        }
    }

    renderLoveLetters = () => {
        if (this.props.currentBaby && this.props.letters.length > 0) {
            return this.props.letters.map(letter => {
                return (<Letter {...letter} key={letter.id}/>)
            })
        }
        // else {
        //     return <Letter />
        // }
    }

    handleNewClick = () => {
        this.props.newButtonClicked(!this.props.newLetterButtonClicked)
    }

    render() {
        // console.log('this one!!!!', this.props.letters)
        
        return (
            <div>
                {this.props.currentBaby ? 
                <Responsive  minWidth={1300}>   
                <Container>
                <Divider> </Divider>
                <div className="wrapper">

                    {this.props.letters.length < 3 ?
                    <Button 
                    size="small"
                    icon color='black'
                    id="new-letter-button"
                    onClick={this.handleNewClick}
                    >
                    {this.props.newLetterButtonClicked ? <Icon name='minus'/> : <Icon name='plus'/>}
                    </Button> : null
                    }    

                    <div className="letter-header">
                        <h3>My Love Notes To You</h3>
                        <p> { this.props.letters.length >= 1 ?
                            this.props.currentBaby.first_name + ' has ' + this.props.letters.length + ' / 3 total notes.': this.props.currentBaby.first_name + ' has no notes. Add one!'
                            }
                        </p>
                    </div>   
                     <div className="cards-wrapper">       
                        <ul className="cards">
                        {this.props.newLetterButtonClicked ? <div className="new-letter-form"><Letter/></div> : this.renderLoveLetters()}
                        </ul>
                     </div>   
                    
                    
                        <div className="side-panel">
                        <Image className="bird" src={bird} width="300" height="250" />
                        <Image className="line-pattern" src={line} width="200" height="170" />
                        <Image id="arrow" src={arrow} width="290" height="250" /> 
                        </div> 
                    {/* <Image className="arrow" src={arrow} width="250" height="250" />      */}
                    {/* <Image className="scribble" src={scribble} width="500" height="550" /> */}
                </div>

                </Container>
                </Responsive>
                    : null}
            </div> 
           
        )
    }
}

function mapStateToProps(state) {
    // console.log('loaded from LOVE redux', state)
    return {
        currentUser: state.currentUser,
        currentBaby: state.currentBaby,
        letters: state.letters,
        newLetterButtonClicked: state.newLetterButtonClicked
    }
}
//add a state above that changes props.isineditmode to false when minus sign is clicked

function mapDispatchToProps(dispatch) {
    return {
        saveLoveLetters: (letters) => {
            return dispatch({
                type: "SAVE_LOVE_LETTERS",
                payload: letters
            })
        },
        newButtonClicked: (boolean) => {
            return dispatch({
                type: "NEW_LETTER_BUTTON_CLICKED",
                payload: boolean
            })
        },
        checkForLetters: () => {
            return dispatch({
                type: "CHECK_LETTERS",
            })
        }

    }

}

export default connect(mapStateToProps, mapDispatchToProps)(LoveLetterContainer)