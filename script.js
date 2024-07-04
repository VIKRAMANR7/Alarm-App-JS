let clockTimer = document.querySelector(".clock-timer");
let alarmBtn = document.querySelector(".alarm-Btn");
let deleteBtn = document.querySelector(".deleteBtn");
let hourInput = document.getElementById("hourTime");
let minuteInput = document.getElementById("minuteTime");
let meridiemInput = document.getElementById("meridiemTime");
let audioElement = new Audio("./chiptune-alarm-clock.mp3");

function hourInputChange() {
  if (hourInput.value >= 24 || hourInput.value < 0) {
    hourInput.value = "00";
  } else if (hourInput.value < 10) {
    hourInput.value = hourInput.value.padStart(2, "0");
  }
  return hourInput.value;
}

hourInput.addEventListener("change", hourInputChange);

function minuteInputChange() {
  if (minuteInput.value > 59 || minuteInput.value < 0) {
    minuteInput.value = "00";
  } else if (minuteInput.value < 10) {
    minuteInput.value = minuteInput.value.padStart(2, "0");
  }
  return minuteInput.value;
}
minuteInput.addEventListener("change", minuteInputChange);

alarmBtn.addEventListener("click", () => {
  addAlarmTab();
});

function addAlarmTab() {
  let hourInp = hourInputChange();
  let minuteInp = minuteInputChange();
  let addAlarm = `  <div
          class="flex justify-between items-center py-[15px] border-b-[1.6px] border-[#9E9E9E]"
        >
          <p class="text-bold text-[20px]">${hourInp}:${minuteInp}</p>
          <div class="flex gap-x-5 items-center">
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" value="" class="sr-only peer" onclick="toggleSwitch(event)" />
              <div
                class="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
              <span
                class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"
              ></span>
            </label>
            <div class="deleteBtn" onclick="deleteAlarm(event)">
              <i class="fa-solid fa-trash cursor-pointer text-[18px]"></i>
            </div>
          </div>
        </div>`;
  alarmBtn.insertAdjacentHTML("afterend", addAlarm);
}

function deleteAlarm(e) {
  return e.target.parentElement.parentElement.parentElement.remove();
}

function toggleSwitch(e) {
  if (e.target.checked) {
    startAlarm();
  } else {
    stopAlarm();
  }
}

function startAlarm() {
  //today's current time
  const timerId = setInterval(() => {
    let currentTime = formatTime();
    let str1 = currentTime.split(":");
    let currentTimeString = str1[2].substring(0, 2);
    let currentTimeMeridien = currentTime.slice(-2);
    let currentTimeInHrPM = Number(str1[0]) + 12;
    let currentTimeInSecs;
    if (currentTimeMeridien === "PM") {
      currentTimeInSecs =
        currentTimeInHrPM * 3600 +
        Number(str1[1] * 60) +
        Number(currentTimeString);
    } else if (currentTimeMeridien === "AM") {
      currentTimeInSecs =
        Number(str1[0] * 3600) +
        Number(str1[1] * 60) +
        Number(currentTimeString);
    }

    //alarm set time
    let hourInp = hourInputChange();
    let minuteInp = minuteInputChange();
    let alarmTimeFormat = `${Number(hourInp)}:${minuteInp}:00`;
    let str2 = alarmTimeFormat.split(":");
    let alarmTimeInSecs =
      Number(str2[0]) * 3600 + Number(str2[1]) * 60 + Number(str2[2]);
    let differenceInSecs = alarmTimeInSecs - currentTimeInSecs;
    if (differenceInSecs == 0) {
      audioElement.play();
      audioElement.loop = true;
    }
  }, 1000);
  return timerId;
}

function stopAlarm() {
  let timeVal = startAlarm();
  audioElement.pause();
  clearInterval(timeVal);
}

function formatTime() {
  const time = new Date();
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const meridiem = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  return (clockTimer.innerHTML = `${padZero(hours)}:${padZero(
    minutes
  )}:${padZero(seconds)} ${meridiem}`);
}

function padZero(number) {
  return (number < 10 ? "0" : "") + number;
}

window.addEventListener("load", () => {
  setInterval(() => {
    formatTime();
  }, 1000);
});

// let hourAlarm =
//   hourInp > 12 ? String(hourInp % 12).padStart(2, "0") : hourInp;
// let meridiem = hourInp >= 12 ? "PM" : "AM";
// let alarmSetTimeInMerdien = `${Number(hourInp)}:${minuteInp}:00`;
// console.log(alarmSetTimeInMerdien);
