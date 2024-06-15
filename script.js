let cryptoCount = 0;
let autoClickers = 0;
let clickValue = 1;
let clickLimit = 1000;
let clickBoostLevel = 1;
let autoClickerLevel = 1;
let doubleClickLevel = 1;

const cryptoCounter = document.getElementById('crypto-counter');
const clickerBtn = document.getElementById('clicker-btn');
const autoClickBtn = document.getElementById('auto-click');
const doubleClickBtn = document.getElementById('double-click');
const boostLimitBtn = document.getElementById('boost-limit');

clickerBtn.addEventListener('click', () => {
    if (clickLimit > 0) {
        cryptoCount += clickValue;
        clickLimit--;
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
    }
});

autoClickBtn.addEventListener('click', () => {
    let cost = 10 * autoClickerLevel;
    if (cryptoCount >= cost) {
        cryptoCount -= cost;
        autoClickers++;
        autoClickerLevel++;
        autoClickBtn.innerText = `Buy Auto Clicker (Cost: ${100 * autoClickerLevel}) (Level: ${autoClickerLevel})`;
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
        if (autoClickers === 1) {
            startAutoClicker();
        }
    }
});

doubleClickBtn.addEventListener('click', () => {
    let cost = 50 * doubleClickLevel;
    if (cryptoCount >= cost) {
        cryptoCount -= cost;
        clickValue *= 2;
        doubleClickLevel++;
        doubleClickBtn.innerText = `Buy Double Click (Cost: ${500 * doubleClickLevel}) (Level: ${doubleClickLevel})`;
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
    }
});

boostLimitBtn.addEventListener('click', () => {
    let cost = 100 * clickBoostLevel;
    if (cryptoCount >= cost) {
        cryptoCount -= cost;
        clickLimit += 1000;
        clickBoostLevel++;
        boostLimitBtn.innerText = `Boost Click Limit (Cost: ${150 * clickBoostLevel}) (Level: ${clickBoostLevel})`;
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
    }
});

function startAutoClicker() {
    setInterval(() => {
        cryptoCount += autoClickers;
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
    }, 1000);
}

function saveProgress() {
    localStorage.setItem('cryptoCount', cryptoCount);
    localStorage.setItem('autoClickers', autoClickers);
    localStorage.setItem('clickValue', clickValue);
    localStorage.setItem('clickLimit', clickLimit);
    localStorage.setItem('clickBoostLevel', clickBoostLevel);
    localStorage.setItem('autoClickerLevel', autoClickerLevel);
    localStorage.setItem('doubleClickLevel', doubleClickLevel);
}

function loadProgress() {
    if (localStorage.getItem('cryptoCount')) {
        cryptoCount = parseInt(localStorage.getItem('cryptoCount')) || 0;
        autoClickers = parseInt(localStorage.getItem('autoClickers')) || 0;
        clickValue = parseInt(localStorage.getItem('clickValue')) || 1;
        clickLimit = parseInt(localStorage.getItem('clickLimit')) || 1000;
        clickBoostLevel = parseInt(localStorage.getItem('clickBoostLevel')) || 1;
        autoClickerLevel = parseInt(localStorage.getItem('autoClickerLevel')) || 1;
        doubleClickLevel = parseInt(localStorage.getItem('doubleClickLevel')) || 1;
        autoClickBtn.innerText = `Buy Auto Clicker (Cost: ${100 * autoClickerLevel}) (Level: ${autoClickerLevel})`;
        doubleClickBtn.innerText = `Buy Double Click (Cost: ${500 * doubleClickLevel}) (Level: ${doubleClickLevel})`;
        boostLimitBtn.innerText = `Boost Click Limit (Cost: ${150 * clickBoostLevel}) (Level: ${clickBoostLevel})`;
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
        if (autoClickers > 0) {
            startAutoClicker();
        }
    }
}

window.addEventListener('beforeunload', saveProgress);
window.addEventListener('load', loadProgress);

// بازسازی کردن محدودیت کلیک در هر ثانیه
setInterval(() => {
    if (clickLimit < 1000) {
        clickLimit++;
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
    }
}, 1000); // قسمتی از کد JavaScript
clickerBtn.addEventListener('click', () => {
    if (clickLimit > 0) {
        cryptoCount += clickValue;
        clickLimit -= 4; // کاهش لیمیت به ازای هر کلیک به اندازه 4
        if (clickLimit < 0) clickLimit = 0; // اطمینان از عدم اعمال مقدار منفی برای لیمیت
        cryptoCounter.innerText = `${cryptoCount} (Limit: ${clickLimit})`;
    }
}); // script.js

// script.js

// تابعی برای افزودن کاما به اعداد

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}