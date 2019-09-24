// import { updateExpression } from "@babel/types";

const defaultState = {
    currentUser: null,
    currentBaby: null,
    selectedMemory: null,
    selectedFile: null,
    uploadButtonClicked: false,
    memories: [],
    babyMilestones: [],
    letters: [],
    editedMemory: null,
    selectedMilestone: null,
    newLetterButtonClicked: false,
    isInEditMode: false,
}

const reducer = (state=defaultState, action) => {
    switch(action.type) {

        case "SET_CURRENT_USER": 
            return {...state, currentUser: action.payload}

        case "ADD_BABY_TO_USER":
            let babies = [...state.currentUser.babies, action.payload]
            return {...state, currentUser: {...state.currentUser, babies}}   

        case "SET_CURRENT_BABY": 
            let baby = [...state.currentUser.babies].find(baby => baby.first_name === action.payload)
            return {...state, currentBaby: baby}
            
        case "REMOVE_CURRENT_USER": 
            return {...state, currentUser: null }   
                

        case "SAVE_BABY_MILESTONES":
            return {
                ...state,
                babyMilestones: action.payload.slice().sort((a, b) => a.id - b.id)
            }

        case "SET_SELECTED_MILESTONE": 
            return {...state, selectedMilestone: action.payload}  

        case "EDIT_SELECTED_MILESTONE": 
            let editedMilestones = state.babyMilestones.map(milestone => {
                if (milestone.id === action.payload.id) {
                    return action.payload
                } else 
                    return milestone
            })
            // editedMilestones = editedMilestones.slice.sort((a,b) => a.id < b.id)
            return {...state, babyMilestones: editedMilestones}

        case "EDIT_MODE_TOGGLED": 
            return {...state, isInEditMode: !state.isInEditMode}

        case "CHECK_LETTERS":
            if (state.letters.length === 0){
                return {...state, newLetterButtonClicked: true}
            } else return {...state}
            
        
        case "SAVE_LOVE_LETTERS":
            return {...state, letters: action.payload}

        case "ADD_LETTER_TO_LETTERS": 
            let addedLetter = [...state.letters, action.payload]
            return {...state, letters: addedLetter, newLetterButtonClicked: false, isInEditMode: false}

        case "EDIT_SELECTED_LETTER": 
            let editedLetters = state.letters.map(letter => {
                if (letter.id === action.payload.id) {
                    return action.payload
                } else 
                    return letter
            })
            return {...state, letters: editedLetters, isInEditMode: false}

        case "REMOVE_SELECTED_LETTER":  
            let letters = state.letters.filter(letter => letter.id !== action.payload)
            return {...state, letters}

        case "NEW_LETTER_BUTTON_CLICKED": 
            return {...state, newLetterButtonClicked: action.payload}
          

        case "SAVE_MEMORIES": 
            return {
                ...state,
                memories: action.payload
            }

        case "ADD_MEMORY_TO_MEMORIES": 
            let newMemories = [action.payload, ...state.memories]
            return {
                ...state,
                memories: newMemories.slice().sort((a, b) => b.created_at - a.created_at),
                uploadButtonClicked: false
            }
        
        case "SELECT_MEMORY":  
            let memory = [...state.memories].find(memory => memory.id === action.payload)  
            return {...state, selectedMemory: memory}

        case "REMOVE_SELECTED_MEMORY":  
            let memories = state.memories.filter(memory => memory.id !== action.payload)
            return {...state, memories}  

        case "EDIT_SELECTED_MEMORY": 
            let editedMemories = state.memories.map(memory => {
                if (memory.id === action.payload.id) {
                    return action.payload
                } else 
                    return memory
            })
            return {...state, memories: editedMemories}

        case "CLICK_UPLOAD": 
            return {...state, uploadButtonClicked: action.payload}

        case "SELECT_FILE" :
            return {...state, selectedFile: action.payload}    

        default: 
        return state
    }
} 
export default reducer    