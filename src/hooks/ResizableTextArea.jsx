const resizableTextArea = e => {
    if (e) {
        e.style.height = `0px`;
        e.style.height = `${e.scrollHeight}px`;
    }
}

export default resizableTextArea;