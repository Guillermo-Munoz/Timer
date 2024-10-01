const stopwatch = document.getElementById('stopwatch');
const playPauseButton = document.getElementById('play-pause');
const secondsSphere = document.getElementById('seconds-sphere');
const alarmSound = document.getElementById("alarmSound");
const circleNeon = document.getElementById('circleNeon');

let stopwatchInterval;
let runningTime = 0;
let time_Down = true;
let duration = 0;
let durationDow = 0;
let countTime = false;

const playPause = () => {
  if (time_Down) {
    runningTime = 0;
  }
  const isPaused = !playPauseButton.classList.contains('running');
  if (isPaused) {
    playPauseButton.classList.add('running')
    start();
  } else {
    playPauseButton.classList.remove('running');
    pause();
  }
}
const pause = () => {
  secondsSphere.style.animationPlayState = 'paused';
  clearInterval(stopwatchInterval);

}
const stop = () => {
  secondsSphere.style.transform = 'rotate(-90deg) translateX(60px)';
  secondsSphere.style.animation = 'none';
  playPauseButton.classList.remove('running');
  runningTime = 0;
  clearInterval(stopwatchInterval);
  stopwatch.textContent = '00:00';
  durationDow = 0;
  time_Down = true;
  countTime = false;
}
const start = () => {
  if (stopwatch.textContent !== '00:00') {
    time_Down = false;
    secondsSphere.style.animation = 'rotacion 60s linear infinite';
    let metaTime = Date.now() + durationDow;
    secondsSphere.style.animationPlayState = 'running';
    stopwatchInterval = setInterval(() => {
      let remaingTime = metaTime - Date.now();
      if (remaingTime <= 0) {
        clearInterval(stopwatchInterval);
        runningTime = 0;
        stopwatch.textContent = '00:00';
        secondsSphere.style.animationPlayState = 'paused';
        stop();
        time_Down = true;
        alarmSound.play();
        neon();

      } else {
        runningTime = remaingTime;
        stopwatch.textContent = calculateTime(remaingTime);
      }
    }, 1000)
  } else {
    countTime = true;
    secondsSphere.style.animation = 'rotacion 60s linear infinite';
    let startTime = Date.now() - runningTime;
    secondsSphere.style.animationPlayState = 'running';
    stopwatchInterval = setInterval(() => {
      runningTime = Date.now() - startTime;
      stopwatch.textContent = calculateTime(runningTime);
    }, 1000)
  }

}
const calculateTime = runningTime => {
  const total_seconds = Math.floor(runningTime / 1000);
  const total_minutes = Math.floor(total_seconds / 60);

  const display_seconsd = (total_seconds % 60).toString().padStart(2, "0");
  const display_minutes = total_minutes.toString().padStart(2, "0");

  return `${display_minutes}:${display_seconsd}`
}
const timeUp = () => {

  if (!time_Down) {
    timeDown = true;

  }
  if (time_Down && !countTime) {
    durationDow += 10000;
    stopwatch.textContent = calculateTime(durationDow);
  }

}
const timeDown = () => {
  if (!time_Down) {
    timeDown = true;
  }
  if (time_Down && durationDow > 0 && !countTime) {
    durationDow -= 10000;
    stopwatch.textContent = calculateTime(durationDow);
  }

}
const neon = () => {
  let second = 1;
  const interval = setInterval(() => {
    if (second % 2 === 1) {
      circleNeon.className = 'circleNeon';
    } else {
      circleNeon.className = 'circle';
    }
    if (second === 10) {
      clearInterval(interval);
    }
    second++
  }, 500);

}
stop();