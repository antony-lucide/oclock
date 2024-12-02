document.addEventListener('DOMContentLoaded', function () {
    // Mode Sections
    const timerSection = document.getElementById('timer-section');
    const stopwatchSection = document.getElementById('stopwatch-section');
    const clockSection = document.getElementById('clock-section');
    const alarmSection = document.getElementById('alarm-section');
    const sections = document.querySelectorAll('.section');

    // Timer Elements
    const timerInput = document.getElementById('timer-input');
    const timerDisplay = document.getElementById('timer-display');
    const toggleTimer = document.getElementById('toggle-timer');
    let timerInterval = null;

    // Stopwatch Elements
    const stopwatchDisplay = document.getElementById('stopwatch-display');
    const startStopwatch = document.getElementById('start-stopwatch');
    const lapStopwatch = document.getElementById('lap-stopwatch');
    const resetStopwatch = document.getElementById('reset-stopwatch');
    const lapList = document.getElementById('lap-list');
    let stopwatchTime = 0;
    let stopwatchRunning = false;
    let stopwatchInterval = null;

    // Clock Elements
    const clockDisplay = document.getElementById('clock-display');

    // Alarm Elements
    const alarmTimeInput = document.getElementById('alarm-time');
    const alarmMessageInput = document.getElementById('alarm-message');
    const addAlarmButton = document.getElementById('add-alarm');
    const alarmList = document.getElementById('alarm-list');
    const alarms = [];

    // Mode Switching
    function switchMode(mode) {
        sections.forEach(section => section.classList.remove('active'));
        if (mode === 'timer') timerSection.classList.add('active');
        if (mode === 'stopwatch') stopwatchSection.classList.add('active');
        if (mode === 'clock') clockSection.classList.add('active');
        if (mode === 'alarm') alarmSection.classList.add('active');
    }

    document.getElementById('mode-timer').addEventListener('click', () => switchMode('timer'));
    document.getElementById('mode-stopwatch').addEventListener('click', () => switchMode('stopwatch'));
    document.getElementById('mode-clock').addEventListener('click', () => switchMode('clock'));
    document.getElementById('mode-alarm').addEventListener('click', () => switchMode('alarm'));

    // Timer Logic
    toggleTimer.addEventListener('click', () => {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            toggleTimer.textContent = 'Démarrer';
        } else {
            let time = parseInt(timerInput.value) * 60;
            timerInterval = setInterval(() => {
                if (time > 0) {
                    time--;
                    const minutes = Math.floor(time / 60);
                    const seconds = time % 60;
                    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                } else {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert('Temps écoulé!');
                }
            }, 1000);
            toggleTimer.textContent = 'Arrêter';
        }
    });

    // Stopwatch Logic
    startStopwatch.addEventListener('click', () => {
        if (stopwatchRunning) {
            clearInterval(stopwatchInterval);
            stopwatchRunning = false;
            startStopwatch.textContent = 'Démarrer';
        } else {
            stopwatchRunning = true;
            startStopwatch.textContent = 'Arrêter';
            stopwatchInterval = setInterval(() => {
                stopwatchTime++;
                const hours = Math.floor(stopwatchTime / 3600);
                const minutes = Math.floor((stopwatchTime % 3600) / 60);
                const seconds = stopwatchTime % 60;
                stopwatchDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            }, 1000);
        }
    });

    lapStopwatch.addEventListener('click', () => {
        const li = document.createElement('li');
        li.textContent = stopwatchDisplay.textContent;
        lapList.appendChild(li);
    });

    resetStopwatch.addEventListener('click', () => {
        clearInterval(stopwatchInterval);
        stopwatchTime = 0;
        stopwatchDisplay.textContent = '00:00:00';
        stopwatchRunning = false;
        startStopwatch.textContent = 'Démarrer';
        lapList.innerHTML = '';
    });

    // Clock Logic
    function updateClock() {
        const now = new Date();
        now.setHours(now.getHours() + 1); // UTC+1
        clockDisplay.textContent = now.toLocaleTimeString('fr-FR');
    }
    setInterval(updateClock, 1000);
    updateClock();

    // Alarm Logic
    addAlarmButton.addEventListener('click', () => {
        const alarmTime = alarmTimeInput.value;
        const alarmMessage = alarmMessageInput.value;

        if (alarmTime) {
            alarms.push({ time: alarmTime, message: alarmMessage });
            const li = document.createElement('li');
            li.textContent = `${alarmTime} - ${alarmMessage || 'Aucun message'}`;
            alarmList.appendChild(li);
        }
    });

    setInterval(() => {
        const now = new Date().toTimeString().slice(0, 5);
        alarms.forEach(alarm => {
            if (alarm.time === now) {
                alert(`Alarme : ${alarm.message}`);
                alarm.passed = true;
            }
        });
    }, 1000);
});
