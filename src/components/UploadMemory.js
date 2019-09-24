import React from 'react'
import { Form, Input, Button, Container, Image, Segment } from 'semantic-ui-react'
import '../assets/UploadMemory.css'
import { DateInput } from 'semantic-ui-calendar-react'
// import Dropzone from 'react-dropzone'
import { connect } from 'react-redux'
import request from 'superagent';
import heart from '../assets/heart-post.png'

const CLOUDINARY_UPLOAD_PRESET = 'oo3ujbhi';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dbobnsl3o/image/upload';


class UploadMemory extends React.Component {

    
    state = {
        caption: "",
        date: "",
        link: "",
        baby_id: this.props.currentBaby.id,
        uploadedFile: "",
        uploaded: false,
    }

    onImageDrop = (file) => {
        this.setState({
            uploadedFile: file
        })
        this.handleImageUpload(file);
    }

    handleImageUpload = (file) => {
        // const token = localStorage.getItem("token")

        // return fetch( CLOUDINARY_UPLOAD_URL, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({
        //             'upload_preset': CLOUDINARY_UPLOAD_PRESET,
        //             'file': file
        //         })
        //     }).then(res => res.json())
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             link: response.secure_url
        //         })
        //     })
            let upload = request.post(CLOUDINARY_UPLOAD_URL)
                .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                .field('file', file);

            upload.end((err, response) => {
                if (err) {
                    console.error(err);
                }

                if (response.body.secure_url !== '') {
                    this.setState({
                        link: response.body.secure_url
                    });
                }
            });
        }   
        
    

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
        this.setState({ [name]: value });
        }
    }

  

    render() {
        // console.log(this.state)
        return (
            <Segment> 
            <div className="upload-form"> 

                <h2>Upload A New Post</h2>       
                <Container>
                    <Form onSubmit={() => this.props.addMemoryToMemories(this.state)}>
                        <Form.Field>
                            <label>Date</label>
                            <DateInput
                                name="date"
                                placeholder="Date"
                                value={this.state.date}
                                iconPosition="left"
                                onChange={this.handleChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <label>Caption</label>
                            <Input fluid
                                placeholder="Caption"
                                name="caption"
                                value={this.state.caption}
                                onChange={this.handleChange}
                                />
                        </Form.Field> 
                      
    

                        <Form.Field>
                            <div className="drop">    
                                <input type="file" multiple onChange={(e) => {this.onImageDrop(e.target.files[0])}}/><br></br>
                                {this.state.link !== "" ? <p>File Selected!</p> : <p>Drag your files here or click in this area.</p>}
                            </div>
                        </Form.Field>

                        <Button type="submit" secondary className="button">
                            <Button.Content>Upload</Button.Content>
                        </Button>
                    </Form>
                </Container>
                <Image src={heart} className="heart-pic" width="250" height="300">

                </Image>
                </div>
             </Segment>  

            
        )
    }
}



function mapStateToProps(state) {
    return {
        currentBaby: state.currentBaby
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addMemoryToMemories: (state) => {   
        const token = localStorage.getItem("token")
         if (token) {   
         return fetch("http://localhost:3001/api/v1/media", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accepts': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify({
                    caption: state.caption,
                    date: state.date,
                    link: state.link,
                    baby_id: state.baby_id
                })
            }).then(res => res.json())
            .then(response => {
                if (response.errors) {
                    alert(response.errors)
                } else {
                    dispatch({
                        type: "ADD_MEMORY_TO_MEMORIES",
                        payload: response
                    })
                  
                }
            })
        }
        }  
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadMemory)