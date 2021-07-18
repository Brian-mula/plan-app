import { makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import AccessAlarmsIcon from "@material-ui/icons/AccessAlarms";
import { useState } from "react";
import { useRef } from "react";
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  timerContainer: {
    backgroundImage: "url(assets/timer.jpeg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "#fff",
    width: `calc(100% - ${drawerWidth}px)`,
  },
  timer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "7em",
    paddingTop: "2em",
    width: "100%",
  },
  timerOuter: {
    textAlign: "center",
  },
  timeIcon: {
    fontSize: "8em",
  },
  h2: {
    marginBottom: "0.5em",
  },
  timerInner: {
    border: "1px solid #fff ",
    borderRadius: "3px",
    display: "grid",
    gridTemplateColumns: "repeat(7,1fr)",
    marginTop: "3em",
    padding: "3em",
    textAlign: "center",
  },
  span: {
    fontSize: "2em",
  },
}));

function Home() {
  const classes = useStyles();

  const [days, setDays] = useState("00");
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");

  let interval = useRef();
  const startTimer = () => {
    const countDownDate = new Date("May 30, 2020 00:00:00").getTime();
    interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(interval.current);
      } else {
        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    }, 1000);
  };
  useEffect(() => {
    startTimer();

    return () => {
      clearInterval(interval.current);
    };
  });
  return (
    <div>
      <section className={classes.timerContainer}>
        <section className={classes.timer}>
          <div className={classes.timerOuter}>
            <span className={classes.timeIcon}>
              <AccessAlarmsIcon />
            </span>
            <h2>Countdown timer</h2>
          </div>
          <div className={classes.timerInner}>
            <section>
              <p className={classes.span}>{days}</p>
              <p className={classes.span}>
                <small>Days</small>
              </p>
            </section>
            <span className={classes.span}>:</span>
            <section>
              <p className={classes.span}>{hours}</p>
              <p className={classes.span}>
                <small>Hours</small>
              </p>
            </section>
            <span className={classes.span}>:</span>
            <section>
              <p className={classes.span}>{minutes}</p>
              <p className={classes.span}>
                <small>Minutes</small>
              </p>
            </section>
            <span className={classes.span}>:</span>
            <section>
              <p className={classes.span}>{seconds}</p>
              <p className={classes.span}>
                <small>Seconds</small>
              </p>
            </section>
          </div>
        </section>
      </section>
    </div>
  );
}

export default Home;
