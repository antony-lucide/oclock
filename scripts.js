document.addEventListener('DOMContentLoaded', function () {
    let sec = 0;
    let min = 5; // Default starting minutes
    let heure = 0;
    let timerInterval = null;

    // Select DOM elements
    const timerInput = document.querySelector('#timer-input');
    const timerDisplay = document.querySelector('#timer-display');
    const toggleTimerButton = document.querySelector('#toggle-timer');
    const increaseMinutesButton = document.querySelector('#increase-minutes');
    const decreaseMinutesButton = document.querySelector('#decrease-minutes');

    function updateTimerDisplay() {
        timerDisplay.textContent = `${String(heure).padStart(2, '0')}:${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
    }

    function toggleTimer() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            toggleTimerButton.textContent = "Démarrer";
        } else {
            toggleTimerButton.textContent = "Arrêter";
            timerInterval = setInterval(() => {
                sec--;
                if (sec < 0) {
                    sec = 59;
                    min--;
                    if (min < 0) {
                        min = 59;
                        heure--;
                        if (heure < 0) {
                            clearInterval(timerInterval);
                            timerInterval = null;
                            alert("Le temps est écoulé!");
                            toggleTimerButton.textContent = "Démarrer";
                            sec = min = heure = 0; // Reset the timer
                        }
                    }
                }
                updateTimerDisplay();
            }, 1000);
        }
    }

    function adjustMinutes(increment) {
        min = Math.max(0, Math.min(60, min + increment));
        timerInput.value = min;
        updateTimerDisplay();
    }

    timerInput.addEventListener('input', () => {
        min = Math.max(0, Math.min(60, parseInt(timerInput.value, 10) || 0));
        sec = 0;
        updateTimerDisplay();
    });

    increaseMinutesButton.addEventListener('click', () => adjustMinutes(1));
    decreaseMinutesButton.addEventListener('click', () => adjustMinutes(-1));
    toggleTimerButton.addEventListener('click', toggleTimer);

    updateTimerDisplay();
});
