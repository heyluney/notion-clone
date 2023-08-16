import { useState } from 'react';

// this sets a locla state called "textArea"
// 1) update local state to the value e.target.value
// 2) save local state to localStorage
const QuickNote = () => {
    const [textarea, changeTextArea] = useState(localStorage.getItem('quicknote'));
    return (
        <div>
            <textarea 
                name="postContent" 
                value={textarea === null ? "" : textarea}
                onChange={(e) => {
                    changeTextArea(e.target.value);
                    localStorage.setItem('quicknote', e.target.value);
                }}/>
        </div>
    )
}

export default QuickNote;