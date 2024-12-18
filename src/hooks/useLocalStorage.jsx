import { useEffect, useState } from 'react';
import { seedPages, seedStyles } from '../data/database/seeded_data'

// Synchronizes app's version of components with local storage. 
const useLocalStorage = () => {
    const [globalStyles, changeGlobalStyles] = useState(() => {
        const styles = JSON.parse(localStorage.getItem('global_styles'))
        if (styles === null) seedStyles();
        return styles;
    })

    const [components, changeComponents] = useState(() => {
        // Seeds data into local storage when first loading app.
        const localComponents = JSON.parse(localStorage.getItem('components'));
        if (localComponents === null) 
            seedPages();
        return localComponents;
    })

    useEffect(() => {
        localStorage.setItem('components', JSON.stringify(components));
        localStorage.setItem('global_styles', JSON.stringify(globalStyles))
      }, [components, globalStyles])

    return [components, changeComponents, globalStyles, changeGlobalStyles];
}

export default useLocalStorage;