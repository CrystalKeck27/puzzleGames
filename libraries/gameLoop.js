/*---- GAMELOOP LIBRARY ----*/

//  Stores variables needed by the gameloop
var _gl = {
    running: false,
    stopToken: null,
    lastRender: 0,
    events: []
};

//  Stops the current loop
function stopLoop() {
    window.cancelAnimationFrame(_gl.stopToken);
    _gl.running = false;
}

//  Schedules a function to be called (cps) times per second
//  Scheduled functions are called every render enough thimes to keep up with the requested calls per second
function schedule(callback, cps) {
    _gl.events.push({
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
            _gl.running = true;
            var delta = tframe - _gl.lastRender;
            _gl.lastRender = tframe;
            _gl.events.forEach(function(event) {
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
            _gl.stopToken = window.requestAnimationFrame(main);
        }

        _gl.lastRender = performance.now();
        _gl.events.forEach(function(event) {
            event.last = _gl.lastRender;
        });
        main(_gl.lastRender);
    })();
}

// depreciated DO NOT USE
function initializeBasicGameLoop(callback) {
    (function() {
        function main(tFrame) {
            _gl.running = true;
            callback(tFrame);
            _gl.stopToken = window.requestAnimationFrame(main);
        }
        main(0);
    })();
}

// depreciated DO NOT USE
function initializeDeltaGameLoop(callback) {
    (function() {
        function main(tFrame) {
            _gl.running = true;
            var delta = tFrame - _gl.lastRender;
            _gl.lastRender = tFrame;
            callback(delta);
            _gl.stopToken = window.requestAnimationFrame(main);
        }
        main(0);
    })();
}