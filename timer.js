(function(TIME_TO_GO, quantityLimits, maxWidth) {
    var container = document.querySelector('.timer-digit-container');
    var orderButton = document.querySelector('.order-button');
    var priceValue = document.querySelector('.price .price-value');
    var quantity = document.querySelector('.quantity .quantity-number');

    var formDiv = document.querySelector('.form');
    var form = formDiv.querySelector('form');
    var submitButton = formDiv.querySelector('.submit');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        e.stopPropagation();

        showDisclaimer();
    });

    function showDisclaimer() {
        var layerId = 'iberion-widget-infolayer';
        var tdoc = top.document;
        var info = "<div style=\"width: 80%;height: 70%;margin:15vh auto;color:#000000;background-color: #cccccc;font-size:1rem;\
        text-align:center;padding:1rem;box-sizing:border-box;border-radius: 1em;overflow:hidden;opacity:0;transition: .5s opacity;font-family: sans-serif;\">\
        <span style=\"font-size:2em\">⚠️</span>\
        Z przyczyn technicznych podane dane, w tym dane osobowe, nie mogą zostać przetworzone. Złożenie zamówienia jest obecnie niemożliwe. Proszę spróbować później.\
        <div style=\"text-align:center;\"><button type=\"button\" style=\"\
        background-color: #EA335A;\
    color: #ffffff;\
    border-radius: 10px;\
    font-size: 31px;\
    font-size: 0.83783rem;\
    line-height: 1.323;\
    display: block;\
    border: none;\
    cursor: pointer;\
    margin: 62px auto 0;\
    margin-top: 7.21vw;\
    text-align: center;\
    width: auto;\
    padding: 1em 2em;\
        \">Rozumiem</button></div>\
        </div>";
        var infoLayer = tdoc.getElementById(layerId);
        if (!infoLayer) {
            infoLayer = tdoc.createElement('div');
            infoLayer.id = layerId;
            tdoc.body.appendChild(infoLayer);
        }
        infoLayer.setAttribute('style', 'position:fixed;z-index:9001;top:50%;left:50%;width:0;height:0;background-color:rgba(0,0,0,0.7);transition: .5s width, .5s height, .5s top, .5s left;');
        infoLayer.innerHTML = info;
        infoLayer.querySelector('button').onclick = function() {
            infoLayer.style.width = infoLayer.style.height = 0;
            infoLayer.style.top = infoLayer.style.left = '50%';
            infoLayer.firstChild.style.opacity = 0;
            setTimeout(function() {
                infoLayer.parentNode.removeChild(infoLayer);
            }, 500);
        }
        setTimeout(function() {
            infoLayer.style.width = infoLayer.style.height = '100%';
            infoLayer.style.top = infoLayer.style.left = 0;
            setTimeout(function() {
                infoLayer.firstChild.style.opacity = 1;
            }, 500);
        }, 250)
    }
    //submitButton.value = submitButton.value.replace(submitButton.getAttribute('data-update'), priceValue.innerHTML);
    //updateTotal();

    function updateTotal() {
        var quant = parseInt(quantity.innerHTML, 10);
        var price = parseFloat(priceValue.innerHTML.replace(',', '.'));
        var total = (price * quant).toFixed(2);
        var totalTemplate = submitButton.getAttribute('data-total');
        var valueTemplate = submitButton.getAttribute('data-value');
        submitButton.value = valueTemplate.replace(totalTemplate, total);
    }
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

            updateTotal();
        }

        change(0);
    }
    QuantitySelector(quantitySelector, quantityLimits);

    function adoptHeight() {
        var doc = document,
            docEl = doc.documentElement,
            device = window.top;
        var frame = window.frameElement;
        //console.log('adoptingHeight');
        if (!frame) return;
        //console.log('here');
        /*frame.style.left = 0;
        frame.style.position = 'absolute';*/

        frame.style.width = '100%';
        frame.style.height = '250px';
        frame.style.marginLeft = frame.style.marginRight = 'auto';

        var slotDivInner = frame.parentNode;
        var slotDiv = slotDivInner.parentNode;

        slotDivInner.style.width = slotDiv.style.width = '100%';
        slotDivInner.style.left = 0;
        slotDivInner.style.position = 'absolute';
        slotDivInner.style.textAlign = 'center';

        if (maxWidth === '100%') {
            slotDiv.style.position = '';
            device.addEventListener('resize', resize);
        } else {
            slotDiv.style.position = 'relative';
        }
        updateFrameMaxWidth();
        resize();

        window.addEventListener('resize', resize);
        window.addEventListener('load', resize);


        function updateFrameMaxWidth() {
            var width = Math.min(device.innerWidth, device.innerHeight)
            frame.style.maxWidth = (maxWidth === '100%' ? width : Math.min(width, maxWidth)) + 'px';
        }

        function setHeight(h) {
            slotDiv.style.height = frame.style.height = h + 'px';
            //console.log('setting height to', h);
        }

        function resize() {
            //console.log('resize');
            //if (docEl.offsetHeight != docEl.clientHeight) {
            setHeight(docEl.offsetHeight);
            updateFrameMaxWidth();
            //}

        }
        orderButton.addEventListener('click', function() {
            slotDiv.style.transition = frame.style.transition = 'height 1s cubic-bezier(0.9, 0, 0.55, 0.95) 0s';
            formDiv.classList.remove('hidden');
            resize();
        });
    }
    adoptHeight();


})(TIME_TO_GO, quantityLimits, maxWidth);