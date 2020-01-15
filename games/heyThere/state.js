class state {
    render();
    setup();
}

const OPENING_STATE = 0;
const NUM_STATES = 1;

var states = [];
for(let i = 0; i < NUM_STATES; i++){
    states[i] = new state();
}

states[OPENING_STATE].render = function(){
    
}