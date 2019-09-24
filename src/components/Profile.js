import React from 'react'
import { connect } from 'react-redux'

class Profile extends React.Component {

    render() {
       
        return (
            <div>
                <p>User: {this.props.currentUser.full_name}</p>
                <p>Username: {this.props.currentUser.username}</p>
                <p>User's Child: {this.props.currentUser.full_name}</p>
                <p>User's Child: {this.props.currentUser.babies ? this.props.currentUser.babies.map(baby => baby.full_name) : null}</p>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

export default connect(mapStateToProps)(Profile)