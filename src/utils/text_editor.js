export const setCaret = (caretPos) => {
    const el = document.getElementById('editable');
    const range = document.createRange();
    const selection = window.getSelection();
    
    range.setStart(el.childNodes[0], caretPos);
    range.collapse(true);
    
    selection.removeAllRanges();
    selection.addRange(range);
}

   
   
   // const boldText = () => {
    //     const selection = document.getSelection().getRangeAt(0);

    //     let parent = selection.commonAncestorContainer.parentElement;

    //     const span = document.createElement("span");
    //     span.style.fontWeight = 700;
    //     span.appendChild(selection.extractContents());
    //     selection.insertNode(span);
    // }