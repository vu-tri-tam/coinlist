import React from "react";
import Countdown from "react-countdown";
import { useState, useEffect } from "react";

// Random component
const Completionist = () => <span>Đã kết thúc sự kiện!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed && localStorage.getItem('max_supply') === 0) {
        // Render a complete state
        return <Completionist />;
    } else {
        // Render a countdown
        return (
            <div className="coundown mt-3">

                <div className="time">
                    <div>
                        <span className="day">{days}</span><span>Ngày</span>
                    </div>
                    <div>
                        <span className="hour">{hours}</span><span>Giờ</span>
                    </div>
                    <div>
                        <span className="minutes">{minutes}</span><span>Phút</span>
                    </div>
                    <div>
                        <span className="seconds">{seconds}</span><span>Giây</span>
                    </div>
                </div>
            </div>
        );
    }
};

const getLocalStorageValue = (s) => localStorage.getItem(s);

const CoundownEvent = () => {
    const [data, setData] = useState(
        {
            date: Date.now(),
            delay: 6000000000
        } //11 seconds
    );
    const wantedDelay = 6000000000; //10 ms

    //[START] componentDidMount
    //Code runs only one time after each reloading
    useEffect(() => {
        const savedDate = getLocalStorageValue("end_date");
        if (savedDate != null && !isNaN(savedDate)) {
            const currentTime = Date.now();
            const delta = parseInt(savedDate, 10) - currentTime;

            //Do you reach the end?
            if (delta > wantedDelay) {
                //Yes we clear uour saved end date
                if (localStorage.getItem("end_date").length > 0)
                    localStorage.removeItem("end_date");
            } else {
                //No update the end date with the current date
                setData({ date: currentTime, delay: delta });
            }
        }
    }, []);
    //[END] componentDidMount

    return (
        <div>
            <Countdown
                date={data.date + data.delay}
                renderer={renderer}
                onStart={(delta) => {
                    //Save the end date
                    if (localStorage.getItem("end_date") == null)
                        localStorage.setItem(
                            "end_date",
                            JSON.stringify(data.date + data.delay)
                        );
                }}
                onComplete={() => {
                    if (localStorage.getItem("end_date") != null)
                        localStorage.removeItem("end_date");
                }}
            />
        </div>
    );
};
export default CoundownEvent


