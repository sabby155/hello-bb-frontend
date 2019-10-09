import React from 'react'
import Favorites from '../components/Favorites'
import Firsts from '../components/Firsts'
import { Container, Divider, Button, Image, Responsive } from 'semantic-ui-react'
import '../assets/FirstFavesContainer.css'
import { connect } from 'react-redux'
import chevron from '../assets/chevron-pattern.png'

class FirstFavesContainer extends React.Component {

    state = {
        favesClicked: false,
    }

    handleFavesClick = () => {
        this.setState({
            favesClicked: true
        })
    }

    handleFirstsClick = () => {
        this.setState({
            favesClicked: false
        })
    }

    componentDidUpdate(prevProps) {
        // console.log("inside componentDidMount: ", this.props.currentBaby)
        const token = localStorage.getItem("token")
        if (this.props.currentBaby !== prevProps.currentBaby) {
            fetch('http://localhost:3001/api/v1/baby-milestones', {
                    headers: {
                        'Authorization': token
                    }
                })
                .then(res => res.json())
                .then(data => {
                    // console.log('printing miletones', data)
                    this.props.saveBabyMilestones(data)
                })
        }
    }

  


    render() {
        return (
            <div className="first-faves-container">
                {this.props.currentBaby ? 
            <Responsive  minWidth={1300}>    
            <Container>
                <Divider />
                <Image className="chevron" src={chevron} width="100" height="50"/>

                {/* <h3>Your Milestones</h3><br></br><br></br> */}

                <div className="button-container">
                <Button className="first-fave-button" color='teal' size='large' onClick={this.handleFirstsClick}>
                    <Button.Content>
                        Firsts
                    </Button.Content>
                </Button>
                <Button  className="first-fave-button"color='teal'size='large' onClick={this.handleFavesClick}>
                    <Button.Content>
                        Faves
                    </Button.Content>
                </Button>
                </div>
                <div>    
                {this.state.favesClicked ?  <Favorites babyMilestones={this.props.babyMilestones} /> : <Firsts babyMilestones={this.props.babyMilestones} /> }
                </div>        
            </Container>
            </Responsive>
                    : null }
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('loaded from redux', state)
    return {
        currentUser: state.currentUser,
        currentBaby: state.currentBaby,
        babyMilestones: state.babyMilestones
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveBabyMilestones: (babyMilestones) => {
            return dispatch({
                type: "SAVE_BABY_MILESTONES",
                payload: babyMilestones
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstFavesContainer)