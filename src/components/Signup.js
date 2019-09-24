import React from 'react'
import { Form, Input, Button, Container, Icon } from 'semantic-ui-react'
import '../assets/Signup.css'
import { connect } from 'react-redux'


class Signup extends React.Component {
    state= {
        username: "",
        password: "",
        passwordConfirmation: "",
        first_name: "",
        last_name: ""
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        if (this.state.password === this.state.passwordConfirmation) {
            this.createUser()
        } else {
            alert("Sorry, your passwords do not match.")
        }
    }

    createUser = () => {
        fetch("http://localhost:3001/api/v1/users", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json'
            }, 
            body: JSON.stringify({
                user: this.state
            })
        }).then(res => res.json())
            .then(response => {
                if (response.errors) {
                    alert(response.errors)
                } else {
                    // console.log('from signup fetch', response)
                    localStorage.setItem("token", response.token)
                    this.props.setCurrentUser(response.user)
                    this.props.history.push(`/add-baby`)
                }   
        })
    }




    render() {

        return (
            <div className="signup-form">
                <div></div>
                <h3>Please Sign-up to Start Using Hello BB</h3>
                <Container>
                <Form onSubmit={this.handleSubmit}>

                    <Form.Field>
                    <label>First Name</label>
                        <Input fluid
                            placeholder='First Name'
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                        />
                    </Form.Field>                                 

                    <Form.Field>
                    <label>Last Name</label>    
                        <Input fluid
                            placeholder='Last Name'
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Username</label>
                        <Input fluid
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            minLength ="3"
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Password</label>
                        <Input fluid
                            placeholder='Password'
                            name="password"
                            value={this.state.password}
                            type="password"
                            onChange={this.handleChange}
                            minLength="3"
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Password Confirmation</label>
                        <Input fluid
                            placeholder='Confirm Password'
                            name="passwordConfirmation"
                            value={this.state.passwordConfirmation}
                            type="password"
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Button animated type="submit" secondary>
                    <Button.Content visible>Next</Button.Content>
                    <Button.Content hidden>
                        <Icon name='arrow right'/>
                    </Button.Content>
                    </Button>
                </Form> 
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser
    }
}

function mapDispatchToProps(dispatch) {

    return {
        setCurrentUser: (user) => {
            return dispatch({
                type: "SET_CURRENT_USER",
                payload: user
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Signup)