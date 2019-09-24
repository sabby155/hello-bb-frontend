import React from 'react'
import { Menu, Dropdown} from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Link } from "react-router-dom"


class Navbar extends React.Component {
     state = {
        activeItem: "",
     }
    
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    handleSelectChange = (event, data) => {
        this.props.setCurrentBaby(data.value)
    }
  

    render() {
        // console.log("inside render", this.props.currentUser)
        const { activeItem } = this.state
        return (
            <div>
            <Menu inverted>
                

                {this.props.currentUser 

                ? 
                
                <Menu.Menu position='right' >
                    <Dropdown item text='Children'>
                    <Dropdown.Menu>
                        { this.props.currentUser.babies ? this.props.currentUser.babies.map( baby => {
                            return (<Dropdown.Item 
                                        key={baby.id}
                                        onClick={this.handleSelectChange}
                                        name="currentBaby"
                                        value={baby.first_name}
                                    >{baby.first_name}</Dropdown.Item>)
                        }
                     ) : null }   
                     </Dropdown.Menu>
                    </Dropdown>


                <Menu.Item 
                    name='home' 
                    active={activeItem === 'home'} 
                    to="/home"
                    as= {Link}
                    onClick={this.handleItemClick}>
                Home
                </Menu.Item>

                <Menu.Item 
                    name='add_baby' 
                    active={activeItem === 'add_baby'} 
                    to = "/add-baby"
                    as= {Link}
                    onClick={this.handleItemClick}>
                Add Baby
                </Menu.Item>

                <Menu.Item 
                    name='profile' 
                    active={activeItem === 'profile'}
                    to = {`/users/${this.props.currentUser.id}`}
                    as = {Link}
                    onClick={this.handleItemClick}>
                    Profile
                </Menu.Item>

                <Menu.Item 
                        onClick={this.props.logOut}
                        name='login' 
                        active={activeItem === 'login'}
                        to = "/login"
                        as = {Link}
                        >
                        Logout
                    </Menu.Item>
                </Menu.Menu>

                :
                
                <Menu.Menu position = 'right'>
                    <Menu.Item 
                        name='sign_up' 
                        active={activeItem === 'sign_up'}
                        to = "/sign-up"
                        as = {Link}
                        onClick={this.handleItemClick}>
                        Signup
                    </Menu.Item>

                    <Menu.Item 
                        name='login' 
                        active={activeItem === 'login'}
                        to = "/login"
                        as = {Link}
                        onClick={this.handleItemClick}>
                        Login
                    </Menu.Item>
                </Menu.Menu>    
                }
              
            </Menu>
           </div>
        )
    }

}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser, 
        currentBaby: state.currentBaby
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCurrentBaby: (baby) => {
            return dispatch({
                type: "SET_CURRENT_BABY",
                payload: baby
            })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)


