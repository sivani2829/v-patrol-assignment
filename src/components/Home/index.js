import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { LeftArrow, RightArrow } from "../../projectIcons/icons";

const sectionBar = ["week", "Day", "Month", "year"];
const weekdays = [
  { id: 1, day: "Sun" },
  { id: 2, day: "Mon" },
  { id: 3, day: "Tue" },
  { id: 4, day: "Wed" },
  { id: 5, day: "Thr" },
  { id: 6, day: "Fri" },
  { id: 7, day: "Sat" },
];
let time = [];
for (let i = 0; i < 24; i++) {
  if (i < 12) {
    time = [...time, `${i}.30 AM`];
  } else {
    time = [...time, `${i}.30 PM`];
  }
}
let gridList = [];
const bgColors = [
  "bg-primary",
  "bg-info",
  "bg-success",
  "bg-light",
  "bg-warning",
];

const Home = () => {
  const [currentId, setCurrentId] = useState();
  const [currentInput, setCurrentInput] = useState("");
  const [eventList, setEventList] = useState(gridList);
  const [startDate, setStartDate] = useState(1);
  const [endDate, setEndDate] = useState(7);
  const [color, setColor] = useState(bgColors[0]);

  for (let i = 1; i < 24; i++) {
    for (let j = 1; j < 8; j++) {
      gridList = [
        ...gridList,
        {
          id: uuidv4(),
          content: "",
          slot: time[i - 1] + "-" + time[i],
          date: startDate + j - 1,
          serialNo: j - 1,
        },
      ];
    }
  }
  console.log("gggggggggggggggggggg", gridList);

  const update = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      const updatedList = eventList.map((e) => {
        if (e.id === currentId) {
          return { ...e, content: currentInput };
        }
        return e;
      });

      setEventList(updatedList);
      setCurrentInput("");
      setCurrentId();
      let random = Math.floor(Math.random() * 5);
      setColor(bgColors[random]);
    } else {
      setCurrentInput(e.target.value);
    }
  };
  console.log("event-list", eventList);

  const renderTime = () => {
    return (
      <ul className="d-flex flex-column align-items-end  list-unstyled">
        {time.map((e, i) => (
          <li
            key={i}
            className="box-1 align-items-end"
            style={{ position: "relative" }}
          >
            <p style={{ position: "absolute", top: "-13px", left: "-70px" }}>
              {e}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  const renderGrid = () => {
    return (
      <div className="d-flex flex-wrap">
        {eventList.map((e) => (
          <div
            className="box"
            key={e.id}
            onClick={() => {
              setCurrentId(e.id);
              setCurrentInput(e.content);
            }}
          >
            {currentId === e.id ? (
              <textarea
                className={`box ${color}`}
                type="text"
                placeholder="Add Event"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyDown={update}
                // style={{ backgroundColor: color }}
              />
            ) : (
              <div className="box d-flex flex-column justify-content-center align-items-center">
                <p>{e.content}</p>
                <p>{e.content !== "" && e.date}</p>
                <p>{e.content !== "" && e.slot}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const handleLeftArrow = () => {
    if (startDate === 1) {
      return;
    } else {
      let g2 = [];
      for (let i = 1; i < 24; i++) {
        for (let j = startDate - 7; j < endDate - 6; j++) {
          g2 = [
            ...g2,
            {
              id: uuidv4(),
              content: "",
              slot: time[i - 1] + "-" + time[i],
              date: j,
              serialNo: j - 1,
            },
          ];
        }
      }
      setEventList(g2);

      setStartDate((prev) => prev - 7);
      setEndDate((prev) => prev - 7);

      console.log("g222222222222222", g2);
    }
  };

  const handleRightArrow = () => {
    if (endDate === 28) {
      return;
    } else {
      let gridList1 = [];
      for (let i = 1; i < 24; i++) {
        for (let j = endDate + 1; j < endDate + 8; j++) {
          gridList1 = [
            ...gridList1,
            {
              id: uuidv4(),
              content: "",
              slot: time[i - 1] + "-" + time[i],
              date: j,
              serialNo: j - 1,
            },
          ];
        }
      }
      setEventList(gridList1);
      setStartDate((prev) => prev + 7);
      setEndDate((prev) => prev + 7);
      console.log("g1", gridList1);
    }
  };
  console.log(startDate, endDate, "nnnn");

  return (
    <>
      <div className="d-flex justify-content-between p-3">
        <h3 className="m-2">Timeline</h3>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <div>
            <select className="p-0 m-0">
              {sectionBar.map((e, i) => (
                <option key={i}>{e}</option>
              ))}
            </select>
          </div>
          <p className="p-0">{`${startDate}-${endDate} `}December,2019</p>
          <div className="d-flex">
            <button className="" onClick={handleLeftArrow}>
              <LeftArrow />
            </button>
            <button onClick={handleRightArrow}>
              <RightArrow />
            </button>
          </div>
        </div>
      </div>
      <div className="">
        <ul className=" list-unstyled border border-primary d-flex ">
          <div className="col-2"></div>
          <div className="col-10 d-flex pl-0">
            {weekdays.map((e) => (
              <li
                key={e.id}
                className="day-box d-flex justify-content-center align-items-center"
              >
                <p className="hover-class">{`${e.day} ${
                  startDate + e.id - 1
                }`}</p>
              </li>
            ))}
          </div>
        </ul>
      </div>
      <div className="d-flex flex-row">
        <div className=" col-2">{renderTime()}</div>
        <div className="container col-10 pl-0 ">{renderGrid()}</div>
      </div>
    </>
  );
};

export default Home;
