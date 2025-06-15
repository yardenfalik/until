import "./NatureView.css";
import "./DotsView.css";
import { addDaysToDate, getNumberOfDaysInBetween, getTodaysDate } from "../utils/dateUtils";
import { useEffect, useState } from "react";
import { Details } from "./Details";

type ViewMode = "nature" | "dots" | "pins";

type DotsAndNatureViewProps = {
  startingDate: Date;
  endingDate: Date;
  isActive?: boolean;
  mode: ViewMode;
};

function getRandomEmoji() {
  const plants: string[] = ["🌵", "🌲", "🌳", "🌴", "🪵", "🌱", "🌿", "☘", "🍀", "🪴", "🎋", "🍃", "🍂", "🍁", "🌾", "💐", "🌷", "🌹", "🪨", "🪷", "🌺", "🌻"];
  const randomIndex = Math.floor(Math.random() * plants.length);
  return plants[randomIndex];
}

export function DotsAndNatureView({ startingDate, endingDate, isActive, mode }: DotsAndNatureViewProps) {
  const today = getTodaysDate();

  const numberOfDays = getNumberOfDaysInBetween(startingDate, endingDate);
  const daysArray = Array.from({ length: numberOfDays + 1 }, (_, i) => {
    const date = new Date(startingDate);
    date.setDate(date.getDate() + i);
    return date;
  });

  const [currentStartingDate, setCurrentStartingDate] = useState(startingDate);
  const [clickedDates, setClickedDates] = useState<string[]>([]);
  const [clickedDate, setClickedDate] = useState<string>();
  const [daysEmojiArray] = useState<string[]>(
    () => Array.from({ length: numberOfDays + 1 }, () => getRandomEmoji())
  );

  const [tooltipX, setTooltipX] = useState(0);
  const [tooltipY, setTooltipY] = useState(0);
  const [tooltipText, setTooltipText] = useState<string | null>(null);

  function handleClick(date: Date, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) {
    const dateStr = date.toDateString();

    e.stopPropagation();

    let clientX = 0;
    let clientY = 0;

    if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
    }

    setTooltipX(clientX);
    setTooltipY(clientY - 10);

    const daysNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    setTooltipText(daysNames[date.getDay()] + ", " + date.getDate() + "." + (date.getMonth() + 1));
 
    if (mode === "nature") {
      if (!clickedDates.includes(dateStr)) {
        setClickedDates([...clickedDates, dateStr]);
        setCurrentStartingDate(addDaysToDate(currentStartingDate, 1));
      }
    } else {
      if (date > today) {
        setClickedDate(dateStr);
        setCurrentStartingDate(date);
      } else {
        setClickedDate(today.toDateString());
        setCurrentStartingDate(date);
      }
    }
  }

  useEffect(() => {
    if (mode) {
      setCurrentStartingDate(today);
      setTooltipText(null);
      if (mode === "nature") {
        setClickedDates([today.toDateString()]);
      } else {
        setClickedDate(today.toDateString());
      }
    }
  }, [mode]);

  const [isDragging, setIsDragging] = useState(false);
  function handleStartDrag(date: Date, e: React.MouseEvent | React.TouchEvent) {
    setIsDragging(true);
    handleClick(date, e as any);
  }
  
  function handleDragOver(date: Date, e: React.MouseEvent | React.TouchEvent) {
    if (isDragging) {
        handleClick(date, e as any);
    }
  }

  useEffect(() => {
    const stopDragging = () => setIsDragging(false);
    window.addEventListener("mouseup", stopDragging);
    window.addEventListener("touchend", stopDragging);
    return () => {
      window.removeEventListener("mouseup", stopDragging);
      window.removeEventListener("touchend", stopDragging);
    };
  }, []);

  return (
    <>
      <Details startingDate={currentStartingDate} endingDate={endingDate} currentView={mode} />
      <div className={`${mode === "nature" ? "natureContainer" : "dotsContainer"} ${isActive ? "active" : ""}`}>
        <div className={mode === "nature" ? "daysNature" : "daysDots"}>
          {daysArray.map((date, index) => {
            const dateStr = date.toDateString();
            const isPast =
              mode === "nature"
                ? date < today || clickedDates.includes(dateStr)
                : date < today || date < new Date(clickedDate || "") || dateStr === clickedDate;
            
            return (
              <div
                key={index}
                className={mode === "nature" ? "natureWrapper" : "dotWrapper"}

                onMouseDown={(e) => handleStartDrag(date, e)}
                onTouchStart={(e) => handleStartDrag(date, e)}
                onMouseEnter={(e) => handleDragOver(date, e)}

                onTouchMove={(e) => {
                    const touch = e.touches[0];
                    const element = document.elementFromPoint(touch.clientX, touch.clientY);
                    if (element?.closest(".dotWrapper, .natureWrapper")) {
                      const index = Number(element.getAttribute("data-index"));
                      if (!isNaN(index)) {
                        handleClick(daysArray[index], e as any);
                      }
                    }
                  }}
                  data-index={index}
              >
                <div className={`dot ${(mode === "dots" && !isPast ? "past" : "") || 
                (mode === "nature" && isPast ? "past" : "")}`}>
                  {mode === "nature" && isPast ? daysEmojiArray[index] : ""}
                </div>
              </div>
            );
          })}
           {tooltipText && <div style={{left: tooltipX, top: tooltipY}} className={`tooltip ${mode == "nature" ? "nature" : ""}`}>{tooltipText}</div>}
        </div>
      </div>
    </>
  );
}