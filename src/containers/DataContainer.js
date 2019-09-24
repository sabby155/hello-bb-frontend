import React from 'react'
import { connect } from 'react-redux'
import { Grid, Image, Container, Divider, Responsive, Segment } from 'semantic-ui-react'
import '../assets/DataContainer.css'
import crown from '../assets/crown.png'
import moon from '../assets/moon-phase.png'
import gas from '../assets/gas.png'
import piggy from '../assets/piggy.png'
import house from '../assets/house.png'
import world from '../assets/world.png'


class DataContainer extends React.Component {

    state = {
        moon: "",
        gas: "",
        house: "",
        population: "",
        president: "",
        wage: ""
    }

    componentDidUpdate(prevProps) {
        let token = localStorage.getItem("token")

        if (this.props.currentBaby !== prevProps.currentBaby) {
            let birthday = this.props.currentBaby.birth_date
            // console.log(birthday)
            if (token) {
                fetch('http://localhost:3001/api/v1/data', {
                        method: 'POST',
                        headers: {
                            'Content-Type': "application/json",
                            'Accepts': "application/json",
                            'Authorization': token
                        },
                        body: JSON.stringify({
                            birthday: birthday
                        })
                    }).then(res => res.json())
                        .then(parsedRes => {
                            // console.log('pres', parsedRes)
                            this.setState({
                                moon: parsedRes.moon,
                                gas: parsedRes.gas,
                                house: parsedRes.house,
                                population: parsedRes.population,
                                president: parsedRes.president,
                                wage: parsedRes.wage
                            })
                        })
            }
        }
    }
    


    render() {
        // console.log('datacontainer: ',this.props)
        return(
            <div className="main-div">
            
            {this.props.currentBaby && this.state.moon !== ""? 
            <Segment.Group>
                <Responsive as={Segment} minWidth={1300}>
            <Container className="data-container">
            {/* <Divider/> */}
            <h3>The World When You Were Born</h3><br></br>

            <Grid className="grid-container" columns={3} divided>
                <Grid.Row className="row">
                <Grid.Column>
                    <Image src={moon} width="90" height="95" className="moon"/>
                    < p className = 'text-moon'> When you were born, the moon 's phase was a <strong>{this.state.moon.match(/was(.*)/)[1]}</strong></p>
                </Grid.Column>
                <Grid.Column>
                    <Image src={gas} width="60" height="60"  className="gas"/>
                    <p className='text-gas'>When you were born, gas went for <strong>{this.state.gas}</strong>.</p>
                </Grid.Column>
                <Grid.Column>
                    <Image src={house} width="50" height="60" className="house"/>
                    <p className='text-house'>When you were born, the average for a home cost <strong>{this.state.house}</strong>. </p>
                </Grid.Column>
                </Grid.Row>
            
                <Grid.Row>
                <Grid.Column>
                    <Image src={world} width="60" height="58" />
                    <p className='text-world'>When you were born, the world population was <strong>{this.state.population}</strong>. </p>                
                    </Grid.Column>
                <Grid.Column>
                    <Image src={crown} width="50" height="55" className="crown"  />
                    <p className='text-crown'>When you were born, the President of the United States was <strong>{this.state.president}</strong>.</p>                
                    </Grid.Column>
                <Grid.Column>
                    <Image src={piggy} width="90" height="65" />
                    <p className='text-piggy'>When you were born, minimum wage was <strong>{this.state.wage}</strong>.</p>                       
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            </Container>
             </Responsive>
            </Segment.Group>
            :null}
           
           </div> 
        )
    }

}

function mapStateToProps(state) {
    // console.log(state)
    return {
        currentUser: state.currentUser,
        currentBaby: state.currentBaby
    }
}

export default connect(mapStateToProps)(DataContainer)