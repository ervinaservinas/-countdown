// This file contains the JavaScript code for the clock functionality. It initializes the clock, updates the time every second, and handles any user interactions.

const updateClock = () => {
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = now.toLocaleTimeString('en-NO', options);
    document.getElementById('clock').textContent = timeString;
};

const initClock = () => {
    updateClock();
    setInterval(updateClock, 1000);
};

document.addEventListener('DOMContentLoaded', initClock);

// Timer functionality
const startTimer = () => {
    const minutes = parseInt(document.getElementById('timer-input').value);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a valid number of minutes.');
        return;
    }

    const endTime = Date.now() + minutes * 60000;
    const timerElement = document.getElementById('timer');

    const updateTimer = () => {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Time\'s up!';
            return;
        }

        const minutesLeft = Math.floor(remainingTime / 60000);
        const secondsLeft = Math.floor((remainingTime % 60000) / 1000);
        timerElement.textContent = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
        if (minutesLeft === 0 && secondsLeft <= 10) {
            timerElement.style.color = 'red' && timerElement.style.fontSize === '50px' && alert('Time is running out!');
        }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
};

document.getElementById('start-timer').addEventListener('click', startTimer);