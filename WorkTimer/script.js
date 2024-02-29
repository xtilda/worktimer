let timer;
let timerRunning = false;

function startTimer(duration, display, subject) {
  let start = Date.now(),
      diff,
      minutes,
      seconds;

  timerRunning = true;

  function timerTick() {
    if (timerRunning) {
      diff = duration - (((Date.now() - start) / 1000) | 0);

      minutes = (diff / 60) | 0;
      seconds = (diff % 60) | 0;

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (diff <= 0) {
        timerRunning = false;
        clearInterval(timer);
        display.textContent = subject + " çalıştınız!";
      }
    }
  }

  timerTick();
  timer = setInterval(timerTick, 1000);
}

window.onload = function () {
  let startBtn = document.getElementById('start-btn');
  let pauseBtn = document.getElementById('pause-btn');
  let resetBtn = document.getElementById('reset-btn');
  let timerLabel = document.getElementById('timer-label');
  let display = document.getElementById('time-left');
  let timerForm = document.getElementById('timer-form');
  let duration;
  let subject;

  startBtn.addEventListener('click', function () {
    if (!timerRunning) {
      duration = parseInt(timerForm.querySelector('input[name="duration"]:checked').value) * 60;
      subject = document.getElementById('subject').value;
      timerLabel.textContent = subject; // Konuyu zamanlayıcı etiketine yaz
      startTimer(duration, display, subject);
    }
  });

  pauseBtn.addEventListener('click', function () {
    timerRunning = false;
  });

  resetBtn.addEventListener('click', function () {
    clearInterval(timer);
    timerRunning = false;
    display.textContent = timerLabel.textContent === 'Çalışma Süresi' ? "25:00" : "05:00";
    timerLabel.textContent = 'Çalışma Süresi'; // Zamanlayıcı etiketini varsayılan değere geri döndür
  });
};
