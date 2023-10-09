const num_to_month_mapping = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
}


export const getFullTimeString = (stringified_date) => {
    const date = new Date(JSON.parse(stringified_date));
    const hours = date.getHours();
    const suffix = hours > 12 ? 'pm' : 'am';
    return num_to_month_mapping[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
        + ' ' + hours % 12 + ':' + date.getMinutes() + ' ' + suffix;
}

export const getTimeString = (stringified_date) => {
    const currentDate = new Date();
    const oldDate = new Date(JSON.parse(stringified_date));
    const minutes = Math.floor((currentDate.getTime() - oldDate.getTime())/(1000*60));
    const hours = Math.floor(minutes / 60);

    if (hours >= 12) {
        return num_to_month_mapping[oldDate.getMonth()].slice(0, 3) + " " + oldDate.getDate();
    } else if (minutes >= 60) {
        return `${hours} hour${hours == 1 ? "": "s"} ago`;
    } else if (minutes > 1) {
        return `${minutes} minute${minutes == 1 ? "": "s"} ago`;
    } else {
        return "Now";
    }
}

