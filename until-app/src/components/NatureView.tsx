import "./NatureView.css"
import {getNumberOfDaysInBetween, getTodaysDate} from "../utils/dateUtils";
import { useState } from "react";

type NatureViewProp = {
    startingDate: Date,
    endingDate: Date,
    isActive?: boolean
}

function getRandomEmoji() {
    const plants: string[] = ["🌵", "🌲", "🌳", "🌴", "🪵", "🌱", "🌿", "☘", "🍀", "🪴", "🎋", "🍃", "🍂", "🍁", "🌾", "💐", "🌷", "🌹", "🪨", "🪷", "🌺", "🌻"];
    const randomIndex = Math.floor(Math.random() * plants.length);
    return plants[randomIndex];
}

export function NatureView({ startingDate, endingDate, isActive }: NatureViewProp) {
    const today = getTodaysDate();

    const numberOfDays = getNumberOfDaysInBetween(startingDate, endingDate);
    const daysArray = Array.from({ length: numberOfDays + 1 }, (_, i) => {
        const date = new Date(startingDate);
        date.setDate(date.getDate() + i);
        return date;
    });

    const [daysEmojiArray] = useState<string[]>(
        () => Array.from({ length: numberOfDays + 1 }, () => getRandomEmoji())
    );

    const [clickedDates, setClickedDates] = useState<string[]>([]);
    function handleClick(date: Date) {
        const dateStr = date.toDateString();
        if (!clickedDates.includes(dateStr)) {
            setClickedDates([...clickedDates, dateStr]);
        }
    }

    return (
        <>
            <div className={`natureContainer ${isActive ? "active" : ""}`}>
            <div className="daysNature">
                {[...daysArray].map((date, index) => {
                    const isPast = date < today || clickedDates.includes(date.toDateString());
                    return (
                        <div key={index} className="natureWrapper" onClick={() => handleClick(date)}>
                            <div className={"natureTooltip"}>
                                {date.toDateString()}
                            </div>
                            <div className={`dot ${isPast ? "past" : ""}`}>{isPast ? daysEmojiArray[index] : ""}</div>
                        </div>
                    );
                })}
            </div>

            </div>
        </>
    )
}