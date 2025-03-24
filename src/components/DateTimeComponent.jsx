import { useState, useEffect } from "react";

function DateTimeComponent() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="date-time">
      <p className="date">{time.toLocaleDateString()}</p>
      <p className="time">{time.toLocaleTimeString()}</p>
    </div>
  );
}

export default DateTimeComponent;
