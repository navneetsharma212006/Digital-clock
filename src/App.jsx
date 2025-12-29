import { useEffect, useRef, useState } from "react";

export default function App() {
  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmSet, setAlarmSet] = useState(false);

  const alarmTriggered = useRef(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!alarmSet || !alarmTime || alarmTriggered.current) return;

    const currentTime = time.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (currentTime === alarmTime) {
      alarmTriggered.current = true;
      alert("⏰ Alarm Ringing!");
      setAlarmSet(false);
    }
  }, [time, alarmTime, alarmSet]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 px-4 sm:px-6">
      
      {/* Card */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg 
                      bg-white/95 backdrop-blur-md 
                      rounded-2xl shadow-2xl 
                      p-5 sm:p-6 md:p-8 text-center">

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl 
                       font-bold text-gray-800 mb-4">
          Digital Clock ⏰
        </h1>

        {/* Clock */}
        <div className="font-mono font-bold text-indigo-600 
                        text-4xl sm:text-5xl md:text-6xl 
                        mb-6 tracking-widest">
          {time.toLocaleTimeString()}
        </div>

        {/* Alarm Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            type="time"
            value={alarmTime}
            onChange={(e) => {
              setAlarmTime(e.target.value);
              alarmTriggered.current = false;
            }}
            className="flex-1 border border-gray-300 rounded-lg 
                       p-3 text-lg focus:outline-none 
                       focus:ring-2 focus:ring-indigo-500"
          />

          <button
            onClick={() => {
              if (!alarmTime) return alert("Set alarm time first");
              alarmTriggered.current = false;
              setAlarmSet(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 
                       active:scale-95 transition 
                       text-white text-lg 
                       px-5 py-3 rounded-lg shadow-md"
          >
            Set
          </button>
        </div>

        {/* Status */}
        {alarmSet && (
          <p className="text-green-600 text-base sm:text-lg font-semibold">
            Alarm set for {alarmTime}
          </p>
        )}

      </div>
    </div>
  );
}
