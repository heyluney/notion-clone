import { useEffect, useState } from 'react';
import { seedPages } from '../data/database/seeded_data'

// Synchronizes app's version of components with local storage. 
const useLocalStorage = () => {
    const [components, changeComponents] = useState(() => {
        // Seeds data into local storage when first loading app.
        const localComponents = JSON.parse(localStorage.getItem('components'));
        if (localComponents === null) seedPages();
        return localComponents;
    })

    useEffect(() => {
        localStorage.setItem('components', JSON.stringify(components))
      }, [components])

    return [components, changeComponents];
}

export default useLocalStorage;