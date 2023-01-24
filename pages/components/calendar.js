import React from "react";

const Calendar = () => {
  const date = new Date();
  const currentDay = date.getDate();

  return (
      <div className="calendar-container">
          <div className="calendar-header">
              <div className="month-year">January 2022</div>
          </div>
          <div className="calendar-body">
              <div className="weekday-row">
                  <div className="weekday">Sun</div>
                  <div className="weekday">Mon</div>
                  <div className="weekday">Tue</div>
                  <div className="weekday">Wed</div>
                  <div className="weekday">Thu</div>
                  <div className="weekday">Fri</div>
                  <div className="weekday">Sat</div>
              </div>
              <div className="date-row">
                  <div className="date">25</div>
                  <div className="date">26</div>
                  <div className="date">27</div>
                  <div className="date">28</div>
                  <div className="date">29</div>
                  <div className="date">30</div>
                  <div className="date">31</div>
              </div>
              <div className="date-row">
                  <div className="date">1</div>
                  <div className="date">2</div>
                  <div className="date">3</div>
                  <div className="date">4</div>
                  <div className="date">5</div>
                  <div className="date">6</div>
                  <div className="date">7</div>
              </div>
              <div className="date-row">
                  <div className="date">8</div>
                  <div className="date">9</div>
                  <div className="date">10</div>
                  <div className="date">11</div>
                  <div className="date">12</div>
                  <div className="date">13</div>
                  <div className="date">14</div>
              </div>
              // ... additional date rows
          </div>
          <div className={`current-date ${currentDay === 11 ? "pulse" : ""}`}>
              11
          </div>
      </div>
  );
};

export default Calendar;
