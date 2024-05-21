export const setCaret = (element, caretPos) => {
    if (!element) return;

    const range = document.createRange();
    const selection = window.getSelection();
    
    const node = element.childNodes[0];
    if (node === undefined) return;

    console.log('caretPos in here', caretPos)
    range.setStart(node, caretPos);
    range.collapse(true);
    
    selection.removeAllRanges();
    selection.addRange(range);
}
