const getTimeString = (stringified_date) => {
    const current = new Date().getTime();
    const old = new Date(JSON.parse(stringified_date)).getTime();
    const minutes = Math.floor((current - old)/(1000*60));
    if (minutes < 1) {
        return "Now";
    } else if (minutes > 60) {
        const hours = Math.floor(minutes / 60);
        return `${hours} hour${hours == 1 ? "": "s"} ago`;
    } else {
        return `${minutes} minute${minutes == 1 ? "": "s"} ago`;
    }
}

export default getTimeString;