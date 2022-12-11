TweenLite.defaultEase = Expo.easeOut;
let select = document.querySelector("select");
let btnStart = document.querySelector(".btn-start");
let btnRes = document.querySelector(".btn-restart");
let count1 = document.querySelector(".count-title1");
let count2 = document.querySelector(".count-title2");
let decrementBtn1 = document.querySelector(".btn-decrement1");
let decrementBtn2 = document.querySelector(".btn-decrement2");
let input1 = document.querySelector(".input-1")
let input2 = document.querySelector(".input-2")
let div1 = document.querySelector(".input1")
let div2 = document.querySelector(".input2")
let title1 = document.querySelector(".title-team-1")
let title2 = document.querySelector(".title-team-2")
let btnSave1 = document.querySelector(".btn-save1")
let btnSave2 = document.querySelector(".btn-save2")
let minute = 0;
let countNumber1 = 0;
let countNumber2 = 0;

btnSave1.onclick = function(){
  let value = input1.value.trim()
  title1.innerHTML = value
  title1.style.display = "block"
  div1.style.display = "none"
}
btnSave2.onclick = function(){
  let value = input2.value.trim()
  title2.innerHTML = value
  title2.style.display = "block"
  div2.style.display = "none" 
}

select.onchange = function (event) {
  return (minute = Number(event.target.value));
};
btnStart.onclick = function () {
  initTimer(`0${minute}:00`); // other ways --> "0:15" "03:5" "5:2"
};
btnRes.onclick = function(){
  window.location.reload()
}
decrementBtn1.onclick = function () {
  decrement1();
};
decrementBtn2.onclick = function () {
  decrement2();
};
function decrement1() {
  countNumber1--;
  count1.innerHTML = countNumber1;
  if (countNumber1 < 0) {
    countNumber1 = 0;
    count1.innerHTML = countNumber1;
  }
}
function decrement2() {
  countNumber2--;
  count2.innerHTML = countNumber2;
  if(countNumber2 < 0){
    countNumber2 = 0
    count2.innerHTML = countNumber2
  }
}
count1.onclick = function () {
  increment1();
};
count2.onclick = function () {
  increment2();
};
function increment1() {
  countNumber1++;
  count1.innerHTML = countNumber1;
}
function increment2() {
  countNumber2++;
  count2.innerHTML = countNumber2;
}

var reloadBtn = document.querySelector(".reload");
var timerEl = document.querySelector(".timer");

function initTimer(t) {
  var self = this,
    timerEl = document.querySelector(".timer"),
    minutesGroupEl = timerEl.querySelector(".minutes-group"),
    secondsGroupEl = timerEl.querySelector(".seconds-group"),
    minutesGroup = {
      firstNum: minutesGroupEl.querySelector(".first"),
      secondNum: minutesGroupEl.querySelector(".second"),
    },
    secondsGroup = {
      firstNum: secondsGroupEl.querySelector(".first"),
      secondNum: secondsGroupEl.querySelector(".second"),
    };

  var time = {
    min: t.split(":")[0],
    sec: t.split(":")[1],
  };

  var timeNumbers;

  function updateTimer() {
    var timestr;
    var date = new Date();

    date.setHours(0);
    date.setMinutes(time.min);
    date.setSeconds(time.sec);

    var newDate = new Date(date.valueOf() - 1000);
    var temp = newDate.toTimeString().split(" ");
    var tempsplit = temp[0].split(":");

    time.min = tempsplit[1];
    time.sec = tempsplit[2];

    timestr = time.min + time.sec;
    timeNumbers = timestr.split("");
    updateTimerDisplay(timeNumbers);

    if (timestr === "0000") countdownFinished();

    if (timestr != "0000") setTimeout(updateTimer, 1000);
  }

  function updateTimerDisplay(arr) {
    animateNum(minutesGroup.firstNum, arr[0]);
    animateNum(minutesGroup.secondNum, arr[1]);
    animateNum(secondsGroup.firstNum, arr[2]);
    animateNum(secondsGroup.secondNum, arr[3]);
  }

  function animateNum(group, arrayValue) {
    TweenMax.killTweensOf(group.querySelector(".number-grp-wrp"));
    TweenMax.to(group.querySelector(".number-grp-wrp"), 1, {
      y: -group.querySelector(".num-" + arrayValue).offsetTop,
    });
  }

  setTimeout(updateTimer, 1000);
}

function countdownFinished() {
  setTimeout(function () {
    TweenMax.set(reloadBtn, { scale: 0.8, display: "block" });
    TweenMax.to(timerEl, 1, { opacity: 0.2 });
    TweenMax.to(reloadBtn, 0.5, { scale: 1, opacity: 1 });
  }, 1000);
}

reloadBtn.addEventListener("click", function () {
  TweenMax.to(this, 0.5, {
    opacity: 0,
    onComplete: function () {
      reloadBtn.style.display = "none";
    },
  });
  TweenMax.to(timerEl, 1, { opacity: 1 });
  initTimer("12:35");
});
