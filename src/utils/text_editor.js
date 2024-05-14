// Buggy so need to fix.
export const setCaret = (element, caretPos) => {
    if (element === null || element === undefined) return;

    const range = document.createRange();
    const selection = window.getSelection();
    
    const node = element.childNodes[0];
    if (node === undefined) return;

    range.setStart(node, caretPos);
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