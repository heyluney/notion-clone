import { useEffect } from 'react';
import { seedPages } from '../data/database/seeded_data'

// Synchronizes app's version of components with local storage. Seeds data when first loading app.
const useLocalStorage = () => {
    const components = JSON.parse(localStorage.getItem('components'));
    if (components === null) seedPages();

    useEffect(() => {
        localStorage.setItem('components', JSON.stringify(components))
    }, [components])

    return components;
}

export default useLocalStorage;