document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const startPauseBtn = document.getElementById("startPauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const lapBtn = document.getElementById("lapBtn");
    const laps = document.getElementById("laps");

    let startTime = 0;
    let elapsedTime = 0;
    let timerInterval = null;
    let isRunning = false;

    const formatTime = (time) => {
        const totalSeconds = Math.floor(time / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    const updateDisplay = () => {
        const currentTime = Date.now();
        elapsedTime = isRunning ? currentTime - startTime : elapsedTime;
        display.textContent = formatTime(elapsedTime);
    };

    const startTimer = () => {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateDisplay, 100);
            isRunning = true;
            startPauseBtn.textContent = "Pause";
            resetBtn.disabled = false;
            lapBtn.disabled = false;
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            startPauseBtn.textContent = "Start";
        }
    };

    const resetTimer = () => {
        clearInterval(timerInterval);
        elapsedTime = 0;
        isRunning = false;
        display.textContent = "00:00:00";
        startPauseBtn.textContent = "Start";
        resetBtn.disabled = true;
        lapBtn.disabled = true;
        laps.innerHTML = "";
    };

    const addLap = () => {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${laps.childElementCount + 1}: ${lapTime}`;
        laps.appendChild(lapItem);
    };

    startPauseBtn.addEventListener("click", startTimer);
    resetBtn.addEventListener("click", resetTimer);
    lapBtn.addEventListener("click", addLap);
});
