var minutesLeft;
var step = 1;
var currentSpeaker = 0;     //default alarm sound
var intervalBetween = 45;   //default interval, minutes
var mini = 30;              //mini exercise, seconds
var midi = 45;              //medium exercise, seconds
var maxi = 60;              //long exercise, seconds
var notificationsOn = false;
var currentLang = "en";

function load() {
    if(!localStorage.getItem('interval_time')) {
        populateStorage();
    } else {
        setSettings();
        intervalBetween = localStorage.getItem('interval_time')
    }
    minutesLeft = intervalBetween;
    setInterval('updateCountdown()', 1000 * 60 );
    currentLang = document.documentElement.lang;
    document.getElementById('countdown').innerHTML = minutesLeft;
    document.getElementById('settings').style.display = "none";
    document.getElementById('eyexercise').style.display = "none";
    document.getElementById('ready').style.display = "none";
}

function populateStorage() {
  localStorage.setItem('interval_time', document.getElementById('intervalBetween').value);
  localStorage.setItem('volume', document.getElementById('volumeSlider').value);
  localStorage.setItem('sound', currentSpeaker);
  localStorage.setItem('notificationsOn', document.getElementById('notify').checked);
}

function setSettings() {
  var intervalSet = localStorage.getItem('interval_time');
  var volumeSet = localStorage.getItem('volume');
  var soundSet = localStorage.getItem('sound');
  var notifySet = localStorage.getItem('notificationsOn');

  document.getElementById('intervalBetween').value = intervalSet;
  document.getElementById('volumeSlider').value = volumeSet;
  currentSpeaker = soundSet;
  document.getElementById('notify').checked = notifySet;
}

function updateCountdown() {
    var cd = document.getElementById('countdown');
    minutesLeft--;
    cd.innerHTML = minutesLeft;
    if (minutesLeft == 0) {
        clearInterval();
        toggleExerciseView();
    }
}

function toggleExerciseView() {
    eyeOfHorus = document.getElementById('eyehorus');
    eyExercise = document.getElementById('eyexercise');
    readyBlock = document.getElementById('ready');
    text = document.getElementById('text');
    start = document.getElementById('start');
    settings_toggle = document.getElementById('settings-toggle');
    settings = document.getElementById('settings');
    favicon = document.getElementById('favicon');
    notificationsOn = document.getElementById('notify').checked;

    if(eyeOfHorus.style.display == "none") {
        eyeOfHorus.style.display = "block";
        eyExercise.style.display = "none";
        readyBlock.style.display = "none";
        text.style.display = "block";
        favicon.setAttribute('href', favicon.href.replace("eye_red", "eye"));
    }
    else {
        favicon.setAttribute('href', favicon.href.replace("eye", "eye_red"));
        eyeOfHorus.style.display = "none";
        text.style.display = "none";
        start.style.display = "none";
        settings_toggle.style.display = "none";
        settings.style.display = "none";
        clearInterval();
        playSound();
        if (notificationsOn) {
            notifyMe();
        }
        document.bgColor = "#ecf0f1";
        readyBlock.style.display = "block";
    }
}

function readyToGo() {
    readyBlock.style.display = "none";
    eyExercise.style.display = "block";
    instructions = document.getElementById('instructions');
    timer = document.getElementById('timer');
    document.bgColor = "#FFF176";
    instructions.innerHTML = tr.ex01[currentLang];
    timer.innerHTML = mini;
    // tick timer each sec
    setInterval('tickMainTimer()', 1000);
}

function tickMainTimer() {
    var cur = parseInt (document.getElementById('timer').innerHTML);
    cur--;
    if (cur != 0) {
        document.getElementById('timer').innerHTML = cur;
    } else {

        switch (step) {
            case 1:
                playSound();
                document.bgColor = "#FFD54F";
                instructions.innerHTML = tr.ex02[currentLang];
                timer.innerHTML = mini;
                break;
            case 2:
                playSound();
                document.bgColor = "#FFB74D";
                instructions.innerHTML = tr.ex03[currentLang];
                timer.innerHTML = midi;
                break;
            case 3:
                playSound();
                document.bgColor = "#FF8A65";
                instructions.innerHTML = tr.ex04[currentLang];
                timer.innerHTML = midi;
                break;
            case 4:
                playSound();
                document.bgColor = "#e57373";
                instructions.innerHTML = tr.ex05[currentLang];
                timer.innerHTML = midi;
                break;
            case 5:
                playSound();
                document.bgColor = "#F06292";
                instructions.innerHTML = tr.ex06[currentLang];
                timer.innerHTML = midi;
                break;
            case 6:
                playSound();
                document.bgColor = "#BA68C8";
                instructions.innerHTML = tr.ex07[currentLang];
                timer.innerHTML = maxi;
                break;
            case 7:
                playSound();
                document.bgColor = "#9575CD";
                instructions.innerHTML = tr.congrats[currentLang];
                timer.innerHTML = "3";
                break;
            case 8:
                window.location.reload();
                break;
        }
        step++;
    }

}

function playSound() {
    switch (currentSpeaker) {
        case 0:
            document.getElementById('speaker_alert').play();
            break;
        case 1:
            document.getElementById('speaker_flute').play();
            break;
        case 2:
            document.getElementById('speaker_athmo').play();
            break;
        case 3:
            document.getElementById('speaker_harp').play();
            break;
        case 4:
            document.getElementById('speaker_evilaugh').play();
            break;
        default:
            document.getElementById('speaker_alert').play();
            break;
    }

}

function toggleSettings() {
    settings = document.getElementById('settings');

    if(settings.style.display == "none") {
        settings.style.display = "block";
    }
    else {
        settings.style.display = "none";
    }
}

function setAudio(num) {
    if (num >= 0 && num <= 4) currentSpeaker = num;
    playSound();
    populateStorage();

    document.getElementById('sound0').className = "button button-outline";
    document.getElementById('sound1').className = "button button-outline";
    document.getElementById('sound2').className = "button button-outline";
    document.getElementById('sound3').className = "button button-outline";
    document.getElementById('sound4').className = "button button-outline";
    switch (num) {
        case 0:
            document.getElementById('sound0').className = "button button-filled";
            break;
        case 1:
            document.getElementById('sound1').className = "button button-filled";
            break;
        case 2:
            document.getElementById('sound2').className = "button button-filled";
            break;
        case 3:
            document.getElementById('sound3').className = "button button-filled";
            break;
        case 4:
            document.getElementById('sound4').className = "button button-filled";
            break;
    }
}

function volumeChange (slider) {
    document.getElementById('speaker_alert').volume = slider.value/10;
    document.getElementById('speaker_flute').volume = slider.value/10;
    document.getElementById('speaker_athmo').volume = slider.value/10;
    document.getElementById('speaker_harp').volume = slider.value/10;
    document.getElementById('speaker_evilaugh').volume = slider.value/10;
    populateStorage();
}

function intervalChange (interval) {
    intervalBetween = interval.value;
    minutesLeft = intervalBetween;
    setInterval('updateCountdown()', 1000 * 60 );
    document.getElementById('countdown').innerHTML = minutesLeft;
    populateStorage();
}

function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    spawnNotification();
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        spawnNotification();
      }
    });
  }

  // Finally, if the user has denied notifications and you
  // want to be respectful there is no need to bother them any more.
}

function spawnNotification() {
  var options = {
      body: "",
      icon: "./css/eye_red.png"
  }
  var n = new Notification(tr.notification_title[currentLang], options);
  setTimeout(n.close.bind(n), 5000);
}


function storageAvailable(type) {
    try {
        var storage = window[type],
            x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}


var tr = {
    notification_title: {
        en: "It's time for a break!",
        ru: "Пора делать зарядку!"
    },
    ex01: {
        en: "1/7. Blink rapidly",
        ru: "1/7. Моргайте быстро-быстро"
    },
    ex02: {
        en: "2/7. Close eyes tightly for few seconds, open them for few seconds",
        ru: "2/7. Крепко зажмурьтесь на пару секунд, а потом откройте глаза на пару секунд"
    },
    ex03: {
        en: "3/7. Roll your eyes clockwise, then counter-clockwise",
        ru: "3/7. Вращайте глазные яблоки, один оборот – по часовой стрелке, другой – против"
    },
    ex04: {
        en: "4/7. Move your eyes up-down, left-right",
        ru: "4/7. Двигайте глазные яблоки вверх-вниз, влево-вправо"
    },
    ex05: {
        en: "5/7. Lightly press three fingers of each hand against your upper eyelids, hold for few seconds, release",
        ru: "5/7. Легко нажмите на верхнее веко тремя пальцами на пару секунд, потом отпустите на пару секунд"
    },
    ex06: {
        en: "6/7. Focus on a distant object for few seconds. Then, slowly refocus on a nearby object",
        ru: "6/7. Сфокусируйте взгляд на отдаленном предмете, потом медленно сфокусируйте на близком предмете"
    },
    ex07: {
        en: "7/7. Sit for a while with your eyes closed",
        ru: "7/7. Посидите спокойно с закрытыми глазами"
    },
    congrats: {
        en: "You are awesome!",
        ru: "Вы молодец!"
    }
};