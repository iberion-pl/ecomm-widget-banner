//
let container = document.querySelector('.timer-digit-container');
let minutes_tens = container.querySelector('.minutes.tens');
let minutes_ones = container.querySelector('.minutes.ones');
let seconds_tens = container.querySelector('.seconds.tens');
let seconds_ones = container.querySelector('.seconds.ones');
let colon = container.querySelector('.timer-colon');
let quantitySelector = document.querySelector('.quantity-selector');

const TIME_TO_GO = 50 * 60; // eg. 50 minutes
const VISIBLE_CLASS = 'visible';
let currentTime = TIME_TO_GO;
setInterval(countdown, 1000);
setInterval(colonBlink, 500);

function colonBlink() {
    colon.classList.toggle(VISIBLE_CLASS)
}

function countdown() {
    if (currentTime > 0) displayTime(--currentTime);
    else displayTime(0);
}

function displayTime(time) {
    let minutes = Math.floor(time / 60);
    let min_10 = Math.floor(minutes / 10);
    let min = minutes - 10 * min_10;
    let seconds = (time - minutes * 60);
    let sec_10 = Math.floor(seconds / 10);
    let sec = seconds - 10 * sec_10;

    minutes_tens.innerHTML = min_10;
    minutes_ones.innerHTML = min;
    seconds_tens.innerHTML = sec_10;
    seconds_ones.innerHTML = sec;
}

function QuantitySelector(selector, limits) {
    const removeButton = selector.querySelector('.quantity-remove');
    const addButton = selector.querySelector('.quantity-add');
    const display = selector.querySelector('.quantity-number');

    removeButton.addEventListener('click', function() { change(-1) });
    addButton.addEventListener('click', function() { change(1) });

    function change(step) {
        let num = Number(display.innerHTML) || limits.min;
        num = Math.min(limits.max, Math.max(limits.min, num + step));
        display.innerHTML = num;
        selector.classList.remove('min', 'max')
        if (num === limits.min) selector.classList.add('min');
        if (num === limits.max) selector.classList.add('max');
    }
}
QuantitySelector(quantitySelector, { min: 1, max: 9 });