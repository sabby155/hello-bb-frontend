import React from 'react'
import {   Grid,  Segment, Image, Container, Responsive } from 'semantic-ui-react'
import { connect } from 'react-redux'
import '../assets/VerticalBar.css'
import whale from '../assets/whale.png'
import cloud from '../assets/cloud.png'
import stars from '../assets/zodiac-stars.png'
import plant from '../assets/plant.png'
import plus from '../assets/plus.png'
import birdy from '../assets/birdy.png'
import cupcake from '../assets/cupcake.png'


class VerticalBar extends React.Component {
    
render() {
    return ( 
        
            <div id="vertical-grid">
                <Container>
                
                <div>
                { this.props.currentBaby ?
                    <Responsive as={Segment} minWidth={990}>
                    <Grid reversed='computer vertically'>
                    <div className="vertical-info-text">Your weight was <br/> <span><strong>{this.props.currentBaby.weight}</strong></span> lbs</div>
                    <span className="whale"><Image src={whale} width="40" height="30"></Image></span>

                    <div className="vertical-info-text">Your height was <br/> <span><strong>{this.props.currentBaby.height}</strong></span> in.</div>
                    <span className="cloud"><Image src={cloud} width="40" height="30"></Image></span>

                    <div className="vertical-info-text">Your were delivered in <br/><span><strong>{this.props.currentBaby.delivered_in}</strong></span></div>
                     <span className="plus-sign"><Image src={plus} width="30" height="30"></Image></span>


                    <div className="vertical-info-text">You were delivered by <br/><span><strong>{this.props.currentBaby.delivered_by}</strong></span></div>
                    <span className="birdy"><Image src={birdy} width="40" height="35"></Image></span>

                    <div className="vertical-info-text">You first street address was <br/><span><strong>{this.props.currentBaby.first_address}</strong></span></div>
                    <span className="plant"><Image src={plant} width="40" height="35"></Image></span>

                    <div className="vertical-info-text">Your zodiac sign is <br/><span><strong>{this.props.currentBaby.horoscope_sign}</strong></span></div>
                    <span className="zodiac-stars"><Image src={stars} width="45" height="47"></Image></span>

                    <div className="vertical-info-text">Life became sweeter when you arrived on <br/><span><strong>{this.props.currentBaby.birth_date}</strong></span></div>
                    <span className="cupcake"><Image src={cupcake} width="35" height="40"></Image></span>

                    <h3>When We Got You</h3> 
                    
                    </Grid> 
                    </Responsive>
                    : null 
                }
                </div>
                
                </Container>
                
            </div>
            
        )
    
    }
}



function mapStateToProps(state) {
    return {
        currentBaby: state.currentBaby
    }
}

export default connect(mapStateToProps)(VerticalBar)