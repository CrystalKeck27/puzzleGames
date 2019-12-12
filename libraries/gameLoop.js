var _gameLoop = {
    running: false,
    stopToken: null,
    previousFrame: 0
}

    function initializeBasicGameLoop(callback) {
        (function() {
            function main(tFrame) {
                _gameLoop.running = true;
                callback(tFrame);
                _gameLoop.stopToken = window.requestAnimationFrame(main);
            }
            main(0);
        })();
    }

    function initializeDeltaGameLoop(callback) {
        (function() {
            function main(tFrame) {
                _gameLoop.running = true;
                var delta = tFrame - _gameLoop.previousFrame;
                _gameLoop.previousFrame = tFrame;
                callback(delta);
                _gameLoop.stopToken = window.requestAnimationFrame(main);
            }
            main(0);
        })();

    }

    function stopLoop() {
        window.cancelAnimationFrame(_gameLoop.stopToken);
        _gameLoop.running = false;
    }