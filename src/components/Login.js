import React from 'react'
import { Form, Input, Button, Container } from 'semantic-ui-react'
import '../assets/Login.css'
import { connect } from 'react-redux'


class Login extends React.Component {
    state = {
        username: "",
        password: ""
    }


    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log("inside handleSubmit")
        event.preventDefault()
        fetch('http://localhost:3001/api/v1/login', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json", 
                'Accepts': "application/json",
            
            }, 
            body: JSON.stringify(this.state)
        })
        .then(res => res.json())
        .then(response => {
            if(response.errors) {
                alert(response.errors)
            } else {
                this.props.setCurrentUser(response.user)
                localStorage.setItem("token", response.token)

                this.props.history.push(`users/${response.user.id}`)
            }
        })
    }


    render() {
        return (
            <div>
                <div className="login-form">
                <div></div>
                <h3>Please Login to Hello BB</h3>
                <Container>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                    <label>Username</label>
                        <Input fluid
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Password</label>
                        <Input fluid
                            placeholder='Password'
                            name="password"
                            type = "password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 


                    <Button type="submit" secondary>
                    <Button.Content >Login</Button.Content>
                    </Button>
                </Form> 
                </Container>
            </div>
            </div>
        ) 
    }
}

function mapStateToProps(state) {
    return {currentUser: state.currentUser}
}

function mapDispatchToProps(dispatch){
    return {
        setCurrentUser: (user) => {
        return dispatch({type: "SET_CURRENT_USER", payload: user})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)