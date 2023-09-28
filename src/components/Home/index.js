import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./index.css";
import { LeftArrow, RightArrow, Calender } from "../../projectIcons/icons";

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
let random;
let time = [];
for (let i = 0; i < 24; i++) {
  if (i < 12) {
    time = [...time, `${i}.30 AM`];
  } else {
    time = [...time, `${i}.30 PM`];
  }
}
const bgColors = [
  "bg-primary",
  "bg-info",
  "bg-success",
  "bg-secondary",
  "bg-warning",
  "bg-dark",
  "bg-danger",
];

const Home = () => {
  const [currentId, setCurrentId] = useState();
  const [currentInput, setCurrentInput] = useState("");
  const [startDate, setStartDate] = useState(1);
  const [endDate, setEndDate] = useState(7);
  const [color, setColor] = useState(bgColors[0]);
  const [gridObj, setGridObj] = useState(() => {
    const initialGridObj = {};
    for (let m = 0; m < 4; m++) {
      const gridList = [];
      for (let i = 1; i < 24; i++) {
        for (let j = 1; j < 8; j++) {
          gridList.push({
            id: uuidv4(),
            content: "",
            slot: time[i - 1] + "-" + time[i],
            date: startDate + j - 1,
            serialNo: j - 1,
          });
        }
      }
      initialGridObj[m] = gridList;
    }
    return initialGridObj;
  });

  // for (let m = 0; m < 4; m++) {
  //   gridList = [];
  //   for (let i = 1; i < 24; i++) {
  //     for (let j = 1; j < 8; j++) {
  //       gridList = [
  //         ...gridList,
  //         {
  //           id: uuidv4(),
  //           content: "",
  //           slot: time[i - 1] + "-" + time[i],
  //           date: startDate + j - 1,
  //           serialNo: j - 1,
  //         },
  //       ];
  //     }
  //   }
  //   // setGridObj({ ...gridObj, [m]: gridList });
  //   setGridObj((prev) => ({ ...prev, [m]: gridList }));
  // }
  console.log("grid object----------", gridObj);
  console.log("ssssss----------", startDate);
  const decideGrid = {
    1: 0,
    8: 1,
    15: 2,
    22: 3,
  };
  const update = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      random = Math.floor(Math.random() * 7);
      setColor(bgColors[random]);
      const updatedList = gridObj[decideGrid[startDate]].map((e) => {
        if (e.id === currentId) {
          return { ...e, content: currentInput, color };
        }
        return e;
      });
      setGridObj((prev) => ({ ...prev, [decideGrid[startDate]]: updatedList }));
      setCurrentId();
    } else {
      setCurrentInput(e.target.value);
    }
  };

  const renderTime = () => {
    return (
      <ul className="d-flex flex-column align-items-end  list-unstyled">
        {time.map((e, i) => (
          <li
            key={i}
            className="box-1 align-items-end text-dark font-weight-bold"
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
    let g1 = gridObj[decideGrid[startDate]];
    if (!g1) {
      return;
    } else {
      return (
        <div className="d-flex flex-wrap">
          {gridObj[decideGrid[startDate]].map((e) => (
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
                  className="box "
                  type="text"
                  placeholder="Add Event"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={update}
                />
              ) : (
                <div
                  className={`box d-flex flex-column justify-content-center align-items-center text-light ${
                    e.content !== "" && e.color
                  }`}
                >
                  <p className="text-light font-weight-bold">{e.content}</p>
                  <p className="text-light font-weight-bold">
                    {e.content !== "" && e.slot}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  const handleLeftArrow = () => {
    if (startDate === 1) {
      return;
    } else {
      setStartDate((prev) => prev - 7);
      setEndDate((prev) => prev - 7);
    }
  };

  const handleRightArrow = () => {
    if (endDate === 28) {
      return;
    } else {
      setStartDate((prev) => prev + 7);
      setEndDate((prev) => prev + 7);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex justify-content-between  align-items-center  p-3 nav-cont ">
          <h3 className="m-2">Timeline</h3>
          <div className="d-flex flex-row justify-content-center align-items-center ">
            <div className="border border-secondary p-2 mr-3">
              <Calender />
              <select className="p-0 m-0 select-box">
                {sectionBar.map((e, i) => (
                  <option key={i}>{e}</option>
                ))}
              </select>
            </div>
            <p className="p-0  mr-3 align-self-center m-0 text-dark font-weight-bold ">
              {`${startDate}-${endDate} `} December,2019
            </p>
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
      </div>
      <div className="">
        <div className="  d-flex ">
          <div className="col-2"></div>
          <ul className=" d-flex  list-unstyled">
            {weekdays.map((e) => (
              <li
                key={e.id}
                className="day-box d-flex justify-content-center align-items-center text-dark font-weight-bold "
              >
                <p className="hover-class">{`${e.day} ${
                  startDate + e.id - 1
                }`}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="d-flex flex-row">
        <div className=" col-2">{renderTime()}</div>
        <div className="container col-10 pl-0 ">{renderGrid()}</div>
      </div>
    </>
  );
};

export default Home;
