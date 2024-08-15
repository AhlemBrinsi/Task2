// script.js

let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

// Get elements
const display = document.getElementById("display");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapsContainer = document.getElementById("laps");

// Event Listeners
startButton.addEventListener("click", startStopwatch);
pauseButton.addEventListener("click", pauseStopwatch);
resetButton.addEventListener("click", resetStopwatch);
lapButton.addEventListener("click", recordLap);

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime; // Adjust the start time
        intervalId = setInterval(updateDisplay, 10);
    }
}

function pauseStopwatch() {
    if (isRunning) {
        isRunning = false;
        elapsedTime = Date.now() - startTime;
        clearInterval(intervalId);
    }
}

function resetStopwatch() {
    isRunning = false; // Stop the stopwatch
    clearInterval(intervalId); // Clear the interval
    elapsedTime = 0; // Reset elapsed time
    startTime = 0; // Reset start time
    display.textContent = "00:00:00.00"; // Reset display
    lapsContainer.innerHTML = ''; // Clear lap times if needed
}
function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime; // Get current lap time
        const lapItem = document.createElement("li"); // Create a new list item
        lapItem.textContent = `Lap ${lapsContainer.childElementCount + 1}: ${formatTime(lapTime)}`; // Add formatted lap time
        lapsContainer.appendChild(lapItem); // Add lap time to the list
    }
}
function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    const time = formatTime(elapsedTime);
    display.textContent = time;
}

function pad(number) {
    return number < 10 ? `0${number}` : number;
}
