(function(TIME_TO_GO, quantityLimits) {
    var container = document.querySelector('.timer-digit-container');
    var ribbon = document.querySelector('.timer-ribbon');
    var minutes_tens = container.querySelector('.minutes.tens');
    var minutes_ones = container.querySelector('.minutes.ones');
    var seconds_tens = container.querySelector('.seconds.tens');
    var seconds_ones = container.querySelector('.seconds.ones');
    var colon = container.querySelector('.timer-colon');
    var quantitySelector = document.querySelector('.quantity-selector');

    var VISIBLE_CLASS = 'visible';
    var currentTime = TIME_TO_GO;
    if (currentTime > 0) {
        ribbon.classList.add(VISIBLE_CLASS);
        setInterval(countdown, 1000);
        setInterval(colonBlink, 500);
    }

    function colonBlink() {
        colon.classList.toggle(VISIBLE_CLASS)
    }

    function countdown() {
        if (currentTime > 0) displayTime(--currentTime);
        else displayTime(0);
    }

    function displayTime(time) {
        var minutes = Math.floor(time / 60);
        var min_10 = Math.floor(minutes / 10);
        var min = minutes - 10 * min_10;
        var seconds = (time - minutes * 60);
        var sec_10 = Math.floor(seconds / 10);
        var sec = seconds - 10 * sec_10;

        minutes_tens.innerHTML = min_10;
        minutes_ones.innerHTML = min;
        seconds_tens.innerHTML = sec_10;
        seconds_ones.innerHTML = sec;
    }

    function QuantitySelector(selector, limits) {
        var removeButton = selector.querySelector('.quantity-remove');
        var addButton = selector.querySelector('.quantity-add');
        var display = selector.querySelector('.quantity-number');

        removeButton.addEventListener('click', function() { change(-1) });
        addButton.addEventListener('click', function() { change(1) });

        function change(step) {
            var num = Number(display.innerHTML) || limits.min;
            num = Math.min(limits.max, Math.max(limits.min, num + step));
            display.innerHTML = num;
            selector.classList.remove('min', 'max')
            if (num === limits.min) selector.classList.add('min');
            if (num === limits.max) selector.classList.add('max');
        }
    }
    QuantitySelector(quantitySelector, quantityLimits);

    function adoptHeight() {
        var doc = document,
            docEl = doc.documentElement;
        var frame = window.frameElement;
        if (!frame) return;
        if (docEl.offsetHeight != docEl.clientHeight) {
            frame.style.height = docEl.offsetHeight + 'px';
        }
    }
    adoptHeight();
})(TIME_TO_GO, quantityLimits);