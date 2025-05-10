export function getNumberOfDaysInBetween(startingDate: Date, endingDate: Date): number {
    const timeDifference = endingDate.getTime() - startingDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24));
}

export function getNumberOfMonthInBetween(startingDate: Date, endingDate: Date): number {
    const startMonth = startingDate.getFullYear() * 12 + startingDate.getMonth();
    const endMonth = endingDate.getFullYear() * 12 + endingDate.getMonth();
    return endMonth - startMonth;
}

export function getNumberOfWeeksInBetween(startingDate: Date, endingDate: Date): number {
    const timeDifference = endingDate.getTime() - startingDate.getTime();
    return Math.floor(timeDifference / (1000 * 3600 * 24 * 7));
}

export function getTodaysDate(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

export function getDaysLeft(endingDate: Date): number {
    const today = getTodaysDate();
    if (today > endingDate) {
        return 0;
    }
    return getNumberOfDaysInBetween(today, endingDate);
}