import React from 'react'
import { connect } from 'react-redux'
import InfoContainer from './InfoContainer'
import MemoryListContainer from './MemoryListContainer'
import { Grid } from 'semantic-ui-react'
import VerticalBar from '../components/VerticalBar'
import '../assets/HomeContainer.css'

class HomeContainer extends React.Component{
    componentDidMount() {
      
    }
    render(){
        // console.log('from home container yo', this.props.currentUser)
        return (
            <div className="site">
                <main className="site-content">
                <Grid>
                    <Grid.Column width={2}>
                        <VerticalBar/>
                    </Grid.Column>

                    <Grid.Column width={14}>
                        <InfoContainer />
                    </Grid.Column>
                    
                </Grid>
                    <div>
                        <MemoryListContainer/>
                    </div>
                   </main> 
                <div className="ui inverted footer segment">
                    Hello BB &trade; &#8226; Made With Love By Sabrina Chowdhury &#8226; 2019 &#8226; 
                </div>    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps)(HomeContainer)