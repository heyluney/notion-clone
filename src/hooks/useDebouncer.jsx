function useDebouncer (func, timeout = 100) {
    let timerId = null;
    return (...args) => {
        window.clearTimeout(timerId);
        timerId = window.setTimeout(() => { 
            func(...args); 
        }, timeout);
    };
}

export default useDebouncer;