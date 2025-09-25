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

    const input = document.getElementById('timer-input').value;
    if (input.trim() === '') {
        alert('Please enter a value for minutes.');
        return;
    }
    if (!/^[0-9]+$/.test(input)) {
        alert('Please enter a valid positive integer for minutes.');
        return;
    }
    const minutes = parseInt(input, 10);
    if (isNaN(minutes) || minutes <= 0) {
        alert('Please enter a number greater than zero.');
        return;
    }
    if (minutes > 1440) { // 24 hours
        alert('Please enter a value less than 1440 minutes (24 hours).');
        return;
    }

    const endTime = Date.now() + minutes * 60000;
    const timerElement = document.getElementById('timer');
    timerElement.style.color = '';
    timerElement.style.fontSize = '';
    let warned = false;

    const updateTimer = () => {
        const remainingTime = endTime - Date.now();
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timerElement.textContent = 'Time\'s up!';
            timerElement.style.color = '';
            timerElement.style.fontSize = '';
            return;
        }

        const minutesLeft = Math.floor(remainingTime / 60000);
        const secondsLeft = Math.floor((remainingTime % 60000) / 1000);
        timerElement.textContent = `${minutesLeft}:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;
        if (minutesLeft === 0 && secondsLeft <= 10) {
            timerElement.style.color = 'red';
            timerElement.style.fontSize = '2em';
            if (!warned) {
                alert('Time is running out!');
                warned = true;
            }
        } else {
            timerElement.style.color = '';
            timerElement.style.fontSize = '';
        }
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
};

document.getElementById('start-timer').addEventListener('click', startTimer);