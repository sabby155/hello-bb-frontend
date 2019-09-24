import React from 'react'
import {  Container, Image, Grid, Form, Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
// import '../assets/Favorites.css'
import bear from '../assets/bear-and-stars.png'
import garland from '../assets/096.png'
import scissors from '../assets/scissors.svg'




class Favorites extends React.Component {

    state = {
        caption: "Click to view or document a memorable favorite or a first.",
        link: "https://images.unsplash.com/photo-1558542086-b116634c8dd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        date: "04-07-1988",
        name: "Select a Favorite <3",
        isClicked: false,
    }

    handleCardClick = () => {
        if (this.state.name !== "Select a First <3") {
            this.setState({
                isClicked: !this.state.isClicked,
            })
        }
    }

    handleBackClick = () => {
        this.setState({
            isClicked: false
        })
    }

    handleFoodClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[9].caption,
                link: this.props.babyMilestones[9].link,
                date: this.props.babyMilestones[9].date,
                name: "Favorite Food"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[9])
        }
    }

    handleSongClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[14].caption,
                link: this.props.babyMilestones[14].link,
                date: this.props.babyMilestones[14].date,
                name: "Favorite Song"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[14])
        }
    }

    handleToyClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[10].caption,
                link: this.props.babyMilestones[10].link,
                date: this.props.babyMilestones[10].date,
                name: "Favorite Toy"
            })
            this.props.setSelectedMilestone(this.props.babyMilestones[10])
        }
    }

    handleBookClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[12].caption,
                link: this.props.babyMilestones[12].link,
                date: this.props.babyMilestones[12].date,
                name: "Favorite Book"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[12])
        }
    }

    handleBlanketClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[15].caption,
                link: this.props.babyMilestones[15].link,
                date: this.props.babyMilestones[15].date,
                name: "Favorite Blanket"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[15])
        }
    }

    handleOutfitClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[16].caption,
                link: this.props.babyMilestones[16].link,
                date: this.props.babyMilestones[16].date,
                name: "Favorite Outfit"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[16])
        }
    }

    handleActivityClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[17].caption,
                link: this.props.babyMilestones[17].link,
                date: this.props.babyMilestones[17].date,
                name: "Favorite Activity"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[17])
        }
    }

    handleGameClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[11].caption,
                link: this.props.babyMilestones[11].link,
                date: this.props.babyMilestones[11].date,
                name: "Favorite Game"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[11])
        }
    }

    handleShowClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[13].caption,
                link: this.props.babyMilestones[13].link,
                date: this.props.babyMilestones[13].date,
                name: "Favorite Show"
            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[13])
        }
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
        console.log('look at this!', this.props.babyMilestones)
        return (

        <Container className="main-container">  
             <Grid>
    
                <div className="square-grid">
                <button className="button-item" onClick={this.handleFoodClick}>Food</button>
                <button className="button-item" onClick={this.handleSongClick}>Song</button>
                <button className="button-item" onClick={this.handleToyClick}>Toy</button>
                <button className="button-item" onClick={this.handleBookClick}>Book</button>
                <button className="button-item" onClick={this.handleBlanketClick}>Blanket</button>
                <button className="button-item" onClick={this.handleOutfitClick}>Outfit</button>
                <button className="button-item" onClick={this.handleActivityClick}>Activity</button>
                <button className="button-item" onClick={this.handleGameClick}>Game</button>
                <button className="button-item" onClick={this.handleShowClick}>Show</button>
                </div>

                {/* <Grid.Column width={10}> */}

                <div>
                    <Image className="scissors" src={scissors} width="35" height="35" floated='left' />

                <div className="first-fave-card">

                    <h4>{this.state.name !== "Select a Favorite <3" ? this.props.currentBaby.first_name + "'s " + this.state.name : this.state.name }</h4>

                    <Image className="first-fave-pic" src={this.state.link} width="170" height="170" floated='left' />
                    <Image className="bear" src={bear} width="170" height="190" floated='right' />
                    <Image className="garland" src={garland} width="105" height="23"/>

                    {
                        this.state.isClicked && this.state.name !== "Select a Favorite <3" ?
                    <div className="edit-firsts-caption-form">
                    <Form >
                        
                        <Form.TextArea 
                        label="Edit Caption"
                        name="caption"
                        id="firsts-caption"
                        placeholder={this.state.caption}
                        value={this.state.caption}
                        onChange={this.handleChange}
                        // onClick={this.handleCardClick}
                        />

                        <Button circular
                            type="submit"
                            size="small"
                            icon color='teal'
                            id="edit-milestone-caption-btn"
                            onClick = {(e) => {
                                // console.log('check props here', this)
                                this.props.editSelectedMilestone(this.props.selectedMilestone.id, this.state)
                            }}
                            >
                            <Icon name="check"/>
                        </Button> 
                        
                    </Form>  
                    
                    <Icon 
                        color="black" 
                        className="milestones-go-back-btn" 
                        onClick={this.handleBackClick}
                        name='arrow left'/> 
                    
                    
                    </div>
                    :
                    <div className="card-content">
                        <p className="caption" onClick={this.handleCardClick}>
                        {this.state.caption}
                        </p>
                        <br></br><br></br>
                        <p className="date">{this.state.date}</p>
                    </div>
                    }
                </div>
                </div>

                {/* </Grid.Column> */}
                </Grid> 
            </Container>


 
        )
    }
}

function mapStateToProps(state) {
    return {
        currentBaby: state.currentBaby,
        selectedMilestone: state.selectedMilestone
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setSelectedMilestone: (milestone) => {
            return dispatch({
                type: "SET_SELECTED_MILESTONE",
                payload: milestone
            })
        },
        editSelectedMilestone: (id, state) => {
            // const baby = this.props.currentBaby
            // console.log('edited hit')
            const token = localStorage.getItem("token")
            if (token) {
                fetch(`http://localhost:3001/api/v1/baby-milestones/${id}`, {
                        method: 'PATCH',
                        headers: {
                            'Accepts': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify({
                            caption: state.caption,
                            baby_id: state.baby_id
                        })
                    }).then(res => res.json())
                    .then(response => {
                        if (response.errors) {
                            alert(response.errors)
                        } else {
                            // console.log('from edit memory fetch')
                            dispatch({
                                type: "EDIT_SELECTED_MILESTONE",
                                payload: response
                            })
                        }
                    })
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)