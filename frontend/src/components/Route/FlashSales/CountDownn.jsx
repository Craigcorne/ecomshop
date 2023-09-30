import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../../server";

const CountDownn = ({ data }) => {
  const { flashSale } = data;
  const { endDate, _id } = flashSale;

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      const updatedTimeLeft = calculateTimeLeft();
      if (updatedTimeLeft === null) {
        // Time's up, perform your action (e.g., delete)
        axios.delete(`${server}/flashsale/flash-sales/${_id}`);
        clearInterval(timer);
      } else {
        setTimeLeft(updatedTimeLeft);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

  function calculateTimeLeft() {
    const now = new Date();
    const endDateValue = new Date(endDate);

    if (endDateValue > now) {
      const endDateWithTimeZone = new Date(endDateValue + " UTC");
      const difference = endDateWithTimeZone - now;
      return {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / (1000 * 60)) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    } else {
      return null;
    }
  }

  return (
    <div className="countdown-container">
      {timeLeft === null ? (
        <span className="text-[red] text-[25px]">Time's Up</span>
      ) : (
        Object.keys(timeLeft).map((interval) => (
          <span key={interval} className="text-[25px] text-[#475ad2]">
            {timeLeft[interval]} {interval}{" "}
          </span>
        ))
      )}
    </div>
  );
};

export default CountDownn;
