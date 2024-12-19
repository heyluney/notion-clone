import { useEffect, useState } from 'react';
import { seedComponents, seedStyles } from '../data/database/seeded_data'

// useDevelopmentLocalStorage stores the same initial seeded data as useLocalStorage, the only difference is that upon refreshing the browser, the application is reset back to initial state (changes are not persisted to local storage upon refresh). Useful for debugging purposes. 
export const useDevelopmentLocalStorage = () => {
    const [globalStyles, changeGlobalStyles] = useState(() => {
        localStorage.removeItem('global_styles');
        seedStyles();
        return JSON.parse(localStorage.getItem('global_styles'));
    })

    const [components, changeComponents] = useState(() => {
        // Seeds data into local storage when first loading app.
        localStorage.removeItem('components');
        seedComponents();
        return JSON.parse(localStorage.getItem('components'));
    })

    useEffect(() => {
        localStorage.setItem('components', JSON.stringify(components));
        localStorage.setItem('global_styles', JSON.stringify(globalStyles));
    }, [components, globalStyles])

    return [components, changeComponents, globalStyles, changeGlobalStyles];
}
export const useLocalStorage = () => {
    const [globalStyles, changeGlobalStyles] = useState(() => {
        const globalStyles = 
            JSON.parse(localStorage.getItem('global_styles'))
        if (globalStyles === null) seedStyles();
        return globalStyles;
    })

    const [components, changeComponents] = useState(() => {
        // Seeds data into local storage when first loading app.
        const localComponents = JSON.parse(localStorage.getItem('components'));
        if (localComponents === null) seedComponents();
        return localComponents;
    })

    useEffect(() => {
        localStorage.setItem('components', JSON.stringify(components));
        localStorage.setItem('global_styles', JSON.stringify(globalStyles));
    }, [components, globalStyles])


    return [components, changeComponents, globalStyles, changeGlobalStyles];
}