import {useEffect, useState} from 'react';
import './App.css'
import { NotesView } from './components/NotesView'
import { setItem, getItem } from './utils/localStorage';
import { DotsAndNatureView } from './components/DotsAndNatureView';

type ViewMode = "nature" | "dots" | "pins";

function App() {
  const [startingDate, setStartingDate] = useState(() => {
    const saved = getItem('startingDate');
    const date = new Date(saved ? saved : '');
    return isNaN(date.getTime()) ? new Date("2025-05-05") : date;
  });
  
  const [endingDate, setEndingDate] = useState(() => {
    const saved = getItem('endingDate');
    const date = new Date(saved ? saved : '');
    return isNaN(date.getTime()) ? new Date("2025-12-12") : date;
  });

  const [currentView, setCurrentView] = useState<ViewMode>("dots");
  const handleViewChange = (view: ViewMode) => {
    setCurrentView(view);
  };

  const [datesMenuOpen, setDatesMenuOpen] = useState(false);
  const toggleDatesMenu = () => {
    setDatesMenuOpen(!datesMenuOpen);
  };

  useEffect(() => {
    setItem('startingDate', startingDate);
    setItem('endingDate', endingDate);
  }, [startingDate, endingDate]);

  return (
    <>

      <DotsAndNatureView startingDate={startingDate} endingDate={endingDate} isActive={currentView == "dots" || currentView == "nature"} mode={currentView}></DotsAndNatureView>

      <NotesView startingDate={startingDate} endingDate={endingDate} isActive={currentView == "pins" ? true : false}></NotesView>

      <div className='viewSwitcherContainer'>
        <div className='viewSwitcher'>
          <button className={currentView == "pins" ? "pressed" : ""} onClick={() => handleViewChange("pins")}>📌</button>
          <button className={currentView == "dots" ? "pressed" : ""} onClick={() => handleViewChange("dots")}>●</button>
          <button className={currentView == "nature" ? "pressed" : ""} onClick={() => handleViewChange("nature")}>🌱</button>
        </div>
      </div>

      <a className='editButton' onClick={toggleDatesMenu}>Edit</a>
      <div className={`changeDates ${datesMenuOpen ? "open" : ""}`}>
        <div className='dateInputs'>
          <p>from- </p>
          <input type="date" 
            value={startingDate.toISOString().split('T')[0]} 
            onChange={(e) => setStartingDate(new Date(e.target.value))} />
          <p>until- </p>
          <input type="date" 
            value={endingDate.toISOString().split('T')[0]} 
            onChange={(e) => setEndingDate(new Date(e.target.value))} />
        </div>
        <a onClick={toggleDatesMenu}>close</a>
      </div>
    </>
  )
}

export default App