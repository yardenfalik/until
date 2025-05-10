import "./NatureView.css"
import {getNumberOfDaysInBetween, getTodaysDate} from "../utils/dateUtils";

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

    return (
        <>
            <div className={`natureContainer ${isActive ? "active" : ""}`}>
            <div className="daysNature">
                {[...daysArray].map((date, index) => {
                    const isPast = date < today;
                    return (
                        <div key={index} className="natureWrapper">
                            <div className={"natureTooltip"}>
                                {date.toDateString()}
                            </div>
                            <div className={`dot ${isPast ? "past" : ""}`}>{isPast ? getRandomEmoji() : ""}</div>
                        </div>
                    );
                })}
            </div>

            </div>
        </>
    )
}