import React from 'react'
import { connect } from 'react-redux'
import Memory from '../components/Memory'
import StackGrid from "react-stack-grid";
import { Button, Icon } from 'semantic-ui-react'
import '../assets/MemoryListContainer.css'
import UploadMemory from '../components/UploadMemory';

class MemoryListContainer extends React.Component {
   

    componentDidMount() {
        const token = localStorage.getItem("token")
        if (this.props.memories) {
            fetch('http://localhost:3001/api/v1/media', {
                headers: {
                    'Authorization': token
                }
            })
            .then(res =>res.json())
            .then(data => {
                console.log('memory list container',data)
                this.props.saveMemories(data)
            })  
        }
    }

    renderMemories = () => {
        if (this.props.currentBaby) {
            return this.props.memories.map(memory => {
                return (<Memory {...memory} key={memory.id} />)
            })
        } 
        // else {
        //     return <div>loading...</div>
        // }
    }


    handleUploadClick = (event) => {
            // this.setState(prevState => ({
            //     uploadButtonClicked: !prevState.uploadButtonClicked
            // }))
        this.props.clickUploader(!this.props.uploadButtonClicked)
    }
    

   


    render(){

        return (
            <div className="memory-list">
            {this.props.currentBaby ? 
            <div>
                <h3>Memories</h3>

               
                <Button 
                    size="small"
                    icon color='black'
                    id="add-memory-button"
                    onClick={this.handleUploadClick}>
                    {this.props.uploadButtonClicked ? <Icon name='minus'/> : <Icon name='plus'/>}
                </Button>
                
                {this.props.uploadButtonClicked ? <UploadMemory /> : null}


                <div className="stack-grid">
                <StackGrid columnWidth={450} monitorImagesLoaded={true}>

                    {this.renderMemories()}

                </StackGrid>
                </div> 
                
                </div>
                : null
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    // console.log('look here!!!!', state)
    return {
        currentUser: state.currentUser,
        currentBaby: state.currentBaby,
        selectedMemory: state.selectedMemory,
        uploadButtonClicked: state.uploadButtonClicked,
        memories: state.memories,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        selectMemory: (memory) => {
                return dispatch({
                    type: "SELECT_MEMORY",
                    payload: memory
                })
            },
        clickUploader: (boolean) => {
            return dispatch({
                type: "CLICK_UPLOAD",
                payload: boolean
            })
        }, 
        saveMemories: (memories) => {
            return dispatch({
                type: "SAVE_MEMORIES",
                payload: memories
            })
        }  
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MemoryListContainer)