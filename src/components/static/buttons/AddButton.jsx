const AddButton = () => {
    return (
        <button onClick={
            () => {
                const updatedComponents = createComponent(
                    components,
                    'page',
                    0);
                changeComponents(updatedComponents);
            
            }}>
                
            </button>
    )
}

export default AddButton;