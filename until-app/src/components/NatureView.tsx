import "./NatureView.css"
import {addDaysToDate, getNumberOfDaysInBetween, getTodaysDate} from "../utils/dateUtils";
import { useEffect, useState } from "react";
import { Details } from "./Details";

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

    const [currentStartingDate, setCurrentStartingDate] = useState(startingDate);
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
            setCurrentStartingDate(addDaysToDate(currentStartingDate, 1));
        }
    }

    useEffect(() => {
        if (!isActive) {
            setCurrentStartingDate(today);
            setClickedDates([today.toDateString()]);
        }
    }, [isActive]);

    return (
        <>
            <Details startingDate={currentStartingDate} endingDate={endingDate} currentView="dots"></Details>
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