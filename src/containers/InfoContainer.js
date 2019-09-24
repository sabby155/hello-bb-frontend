import React from 'react'
// import VerticalBar from '../components/VerticalBar'
import { connect } from 'react-redux'
import DataContainer from './DataContainer'
import FirstFavesContainer from './FirstFavesContainer'
import LoveLetterContainer from './LoveLettersContainer'
// import '../assets/InfoContainer.css'
import { Container} from 'semantic-ui-react'

class InfoContainer extends React.Component {
    render() {
        return (
          
            <div className="outer-div">
                <Container>
                <DataContainer />
                <FirstFavesContainer />
                <LoveLetterContainer/>
                </Container>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        currentBaby: state.currentBaby
    }
}

export default connect(mapStateToProps)(InfoContainer)