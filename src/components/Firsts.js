import React from 'react'
import { Container, Image, Grid, Form, Input} from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../assets/Firsts.css'
import { Icon, Button } from 'semantic-ui-react'

import bear from '../assets/bear-and-stars.png'
import garland from '../assets/096.png'
import scissors from '../assets/scissors.svg'

class Firsts extends React.Component {

    state = {
        caption: "Click to view or document a memorable favorite or a first.",
        link: "https://images.unsplash.com/photo-1558542086-b116634c8dd2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80",
        date: new Date().toLocaleDateString(),
        name: "Select a First <3",
        isClicked: false,
        baby_id: this.props.currentBaby.id
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

    handleSmileClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[4].caption,
                link: this.props.babyMilestones[4].link,
                date: this.props.babyMilestones[4].date,
                name: "First Smile"
            })
        
           this.props.setSelectedMilestone(this.props.babyMilestones[4])
        } 
    }

    handleLaughClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[5].caption,
                link: this.props.babyMilestones[5].link,
                date: this.props.babyMilestones[5].date,
                name: "First Laugh"

            })
        
            this.props.setSelectedMilestone(this.props.babyMilestones[5])
        }
    }

    handleWalkClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[1].caption,
                link: this.props.babyMilestones[1].link,
                date: this.props.babyMilestones[1].date,
                name: "First Walk",
            })
        
        this.props.setSelectedMilestone(this.props.babyMilestones[1])  
        }
    }

    handleSolidsClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[2].caption,
                link: this.props.babyMilestones[2].link,
                date: this.props.babyMilestones[2].date,
                name: "First Solid Food"
            })
            
        this.props.setSelectedMilestone(this.props.babyMilestones[2])
        }
    }

    handleCrawlClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[6].caption,
                link: this.props.babyMilestones[6].link,
                date: this.props.babyMilestones[6].date,
                name: "First Crawl"
            })
        
        this.props.setSelectedMilestone(this.props.babyMilestones[6])
        }
    }

    handleToothClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[3].caption,
                link: this.props.babyMilestones[3].link,
                date: this.props.babyMilestones[3].date,
                name: "First Tooth"
            })
        
        this.props.setSelectedMilestone(this.props.babyMilestones[3])
        }
    }

    handleSitUpClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[7].caption,
                link: this.props.babyMilestones[7].link,
                date: this.props.babyMilestones[7].date,
                name: "First Sitting-Up"
            })
        
        this.props.setSelectedMilestone(this.props.babyMilestones[7])
        }
    }

    handleOutingClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[8].caption,
                link: this.props.babyMilestones[8].link,
                date: this.props.babyMilestones[8].date,
                name: "First Outing"
            })
        
        this.props.setSelectedMilestone(this.props.babyMilestones[8])
        }
    }

    handleWordClick = () => {
        if (this.props.babyMilestones) {
            this.setState({
                caption: this.props.babyMilestones[0].caption,
                link: this.props.babyMilestones[0].link,
                date: this.props.babyMilestones[0].date,
                name: "First Word"
            })
        
        this.props.setSelectedMilestone(this.props.babyMilestones[0])
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
        console.log('hello from firsts!', this.props.selectedMilestone)
        return (
            <Container className="main-container">  
             <Grid>
              {/* <Grid.Column width={6}>    */}
            

                <div className="square-grid">
                <button className="button-item" onClick={this.handleSmileClick}>Smile</button>
                <button className="button-item" onClick={this.handleLaughClick}>Laugh</button>
                <button className="button-item" onClick={this.handleWalkClick}>Walk</button>
                <button className="button-item" onClick={this.handleSolidsClick}>Solids</button>
                <button className="button-item" onClick={this.handleCrawlClick}>Crawl</button>
                <button className="button-item" onClick={this.handleToothClick}>Tooth</button>
                <button className="button-item" onClick={this.handleSitUpClick}>Sit-up</button>
                <button className="button-item" onClick={this.handleOutingClick}>Outing</button>
                <button className="button-item" onClick={this.handleWordClick}>Word</button>
                </div>
                {/* </Grid.Column> */}



                {/* <Grid.Column width={10}> */}
                <div>
                
                <Image className="scissors" src={scissors} width="35" height="35" floated='left' />
                
                <div className="first-fave-card">
                    
                    {/* <Icon corner className="delete-btn" name='edit-milestone' onClick={() => this.props.removeSelectedMemory(this.props.id)}/> */}
                    
                    <h4>{this.state.name !== "Select a First <3" ? this.props.currentBaby.first_name + "'s " + this.state.name : this.state.name }</h4>

                    <Image className="first-fave-pic" src={this.state.link} width="170" height="170" floated='left' />
                    <Image className="bear" src={bear} width="170" height="190" floated='right' />
                    <Image className="garland" src={garland} width="105" height="23"/>
                    
                    {
                        this.state.isClicked && this.state.name !== "Select a First <3" ?
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
    console.log('new test from firsts!:', state)
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

export default connect(mapStateToProps, mapDispatchToProps)(Firsts)