import React from 'react'
import { Form, Input, Button, Container, Dropdown } from 'semantic-ui-react'
import '../assets/AddBaby.css'
import { connect } from 'react-redux'
import { DateInput } from 'semantic-ui-calendar-react'

class AddBaby extends React.Component {
    state = {
        relationship: "",
        first_name: "",
        last_name: "",
        birth_date: "",
        delivered_in: "",
        delivered_by: "",
        weight: "",
        height: "",
        horoscope_sign: "",
        first_address: "",
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSelectChange = (event, data) => {
        this.setState({
            [data.name] : data.value
        })
    }

    createBaby = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token")

        fetch("http://localhost:3001/api/v1/babies", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accepts': 'application/json',
                'Authorization': token
            }, 
            body: JSON.stringify(this.state)
        }).then(res => res.json())
            .then(response => {
                if (response.errors) {
                    alert(response.errors)
                } else {
                    console.log('from addbaby fetch', response)
                    this.props.addBabyToUser(response.baby)
                    this.props.history.push(`/home`)
                }   
        })
    }

    render() {
        const relationships = ['Mother', 'Father']
        const horoscopeSigns = ['Aries', 'Gemini','Taurus', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces']

        const relationOptions = relationships.map((relation, index) => ({
            key: relation[index],
            text: relation,
            value: relation,
        }))

        const signOptions = horoscopeSigns.map((sign, index) => ({
            key: sign[index],
            text: sign,
            value: sign,
        }))

        return (
            <div>
                <div className="add-baby-form">
                <div></div>
                <h2>Almost there.</h2>
                <h3>Please enter your baby's information.</h3>
                <Container>
                <Form onSubmit={this.createBaby}>

                    <Form.Field>
                    <label>Your Relationship</label>
                      <Dropdown 
                        placeholder='Relation' search selection 
                        options={relationOptions} 
                        name="relationship"
                        onChange={this.handleSelectChange}
                        />
                    </Form.Field>                                 

                    <Form.Field>
                    <label>Baby's First Name</label>    
                        <Input fluid
                            placeholder="First Name"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                        <label>Baby's Last Name</label>
                        <Input fluid
                            placeholder="Last Name"
                            name="last_name"
                            value={this.state.last_name}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                        <label>Baby's Birthdate</label>
                        <DateInput fluid
                            placeholder="Date"
                            name="birth_date"
                            value={this.state.birth_date}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Baby's Place of Delivery</label>
                        <Input fluid
                            placeholder="Place of Delivery"
                            name="delivered_in"
                            value={this.state.delivered_in}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Person Who Assisted Delivery</label>
                        <Input fluid
                            placeholder="Doctor/ Midwife/ Person's Name"
                            name="delivered_by"
                            value={this.state.delivered_by}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Baby's Weight</label>
                        <Input fluid
                            placeholder="Weight"
                            name="weight"
                            value={this.state.weight}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Baby's Height</label>
                        <Input fluid
                            placeholder="Height"
                            name="height"
                            value={this.state.height}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Baby's Horoscope</label>
                      <Dropdown 
                        placeholder='Horoscope Sign' search selection 
                        options={signOptions} 
                        name="horoscope_sign"
                        onChange={this.handleSelectChange}
                        />
                    </Form.Field> 

                    <Form.Field>
                    <label>Baby's First Address</label>
                        <Input fluid
                            placeholder="Baby's First Address"
                            name="first_address"
                            value={this.state.first_address}
                            onChange={this.handleChange}
                        />
                    </Form.Field> 

                    <Button type="submit" secondary>
                    <Button.Content>Submit</Button.Content>
                    </Button>
                </Form> 
                </Container>
            </div>
            </div>
        )
    }
}




function mapDispatchToProps(dispatch) {
    return {
        addBabyToUser: (baby) => {
            return dispatch({
                type: "ADD_BABY_TO_USER",
                payload: baby
            })
        }
    }
}

export default connect( null, mapDispatchToProps)(AddBaby)