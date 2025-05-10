import {useState} from 'react';
import './App.css'
import { DotView } from './components/DotsView';
import { NotesView } from './components/NotesView'
import { getDaysLeft } from './utils/dateUtils';
import { NatureView } from './components/NatureView';

function App() {
  const [startingDate, setStartingDate] = useState(new Date("2025-05-05"));
  const [endingDate, setEndingDate] = useState(new Date("2025-09-30"));

  const [currentView, setCurrentView] = useState('pins');
  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const [datesMenuOpen, setDatesMenuOpen] = useState(false);
  const toggleDatesMenu = () => {
    setDatesMenuOpen(!datesMenuOpen);
  };

  return (
    <>
      <div className={`details ${currentView}`}>
        <p className="number">{getDaysLeft(endingDate)}</p>
        <p className="daysLeftText">days left</p>
      </div>

      <NotesView startingDate={startingDate} endingDate={endingDate} isActive={currentView == "pins" ? true : false}></NotesView>
      <DotView startingDate={startingDate} endingDate={endingDate} isActive={currentView == "dots" ? true : false}></DotView>
      <NatureView startingDate={startingDate} endingDate={endingDate} isActive={currentView == "nature" ? true : false}></NatureView>

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
          <input type="date" value={startingDate.toISOString().split('T')[0]} onChange={(e) => setStartingDate(new Date(e.target.value))} />
          <p>until- </p>
          <input type="date" value={endingDate.toISOString().split('T')[0]} onChange={(e) => setEndingDate(new Date(e.target.value))} />
        </div>
        <a onClick={toggleDatesMenu}>close</a>
      </div>
    </>
  )
}

export default App