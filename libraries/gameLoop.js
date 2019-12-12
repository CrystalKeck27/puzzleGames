var gameLoop = {
    stopToken: null,
    previousFrame: 0,
    count: 0
}
console.log('yes');
(function() {
    function main(tFrame) {
        //console.log(tFrame-gameLoop.previousFrame);
        //gameLoop.previousFrame = tFrame;
        while (tFrame > count * 10000) {
            console.log(tFrame);
            count += 1;
        }
        gameLoop.stopToken = window.requestAnimationFrame(main);
    }
    main(0);
})();