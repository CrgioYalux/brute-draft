const isIncludedIn = <T, >(list: T[] = []) => (v: T): boolean => list.includes(v);

function getCurrentDateTimeToJSON(): string {
    const current = new Date(Date.now());
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const day = current.getDate();
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const seconds = current.getSeconds();

    const formattedMonth = month < 10 ? `0${month}` : `${day}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    const result = `${year}-${formattedMonth}-${formattedDay}T${formattedHours}:${formattedMinutes}:${formattedSeconds}.000Z`;

    return result;
}

function getCurrentDateToJSON(): string {
    const current = new Date(Date.now());
    const year = current.getFullYear();
    const month = current.getMonth() + 1;
    const day = current.getDate();

    const formattedMonth = month < 10 ? `0${month}` : `${day}`;
    const formattedDay = day < 10 ? `0${day}` : `${day}`;

    const result = `${year}-${formattedMonth}-${formattedDay}`;

    return result;
}

function getCurrentTimeToJSON(includeSeconds: boolean = true): string {
    const current = new Date(Date.now());
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const seconds = current.getSeconds();
    
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    
    const result = includeSeconds
        ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
        : `${formattedHours}:${formattedMinutes}`;
    
    return result;
}

function formatDateToUseAsPropValue(date: Date | string): string {
    return (new Date(date)).toJSON().substring(0, 10);
}

function formatDateTimeToUseAsPropValue(date: Date | string): string {
    return (new Date(date)).toJSON().substring(0, 16);
}

export {
    isIncludedIn,
    getCurrentDateTimeToJSON,
    getCurrentDateToJSON,
    getCurrentTimeToJSON,
    formatDateToUseAsPropValue,
    formatDateTimeToUseAsPropValue,
};
