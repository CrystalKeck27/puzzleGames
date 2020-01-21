/*---- GAMELOOP LIBRARY ----*/

//  Variables
var running = false;
var stopToken = null;
var lastRender = 0;
var events = [];

//  Stops the current loop
function stopLoop() {
    window.cancelAnimationFrame(stopToken);
    running = false;
}

//  Schedules a function to be called (cps) times per second
//  Scheduled functions are called every render enough thimes to keep up with the requested calls per second
function schedule(callback, cps) {
    events.push({
        fn: callback,
        rate: cps,
        len: 1000 / cps,
        last: 0,
        calls: 0
    })
}

// Initializes the game loop and is passed the render function
// Render function is passed delta and a timestamp
function initializeGameLoop(renderCallback) {
    (function() {
        function main(tframe) {
            running = true;
            var delta = tframe - lastRender;
            lastRender = tframe;
            events.forEach(function(event) {
                //calculate the next call timestamp
                var nextTick = event.last + event.len;
                //declare numTicks with default
                var numTicks = 0;
                //init numTicks
                //x=tframe;
                if (tframe > nextTick) {
                    numTicks = Math.floor((tframe - nextTick) / event.len);
                }
                //call the event numTicks times and update last in th process
                for (var i = 0; i < numTicks; i++) {
                    event.last += event.len;
                    event.fn(event.last);
                }
            });
            renderCallback(delta, tframe);
            stopToken = window.requestAnimationFrame(main);
        }

        lastRender = performance.now();
        events.forEach(function(event) {
            event.last = lastRender;
        });
        main(lastRender);
    })();
}

export{stopLoop, schedule, initializeGameLoop};