class state {
    render() { }
    setup() { }
}

class bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 10;
    }

    move() {
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    render() {
        push();
        resetTransform();
        ellipse(this.x, this.y, 5);
        pop();
    }
}

const OPENING_STATE = 0;
const TESTING_STATE = 1;
const NUM_STATES = 2;

var states = [];
for (let i = 0; i < NUM_STATES; i++) {
    states[i] = new state();
}

states[OPENING_STATE].setup = async function(){
    let gradient = gfx.ctx.createRadialGradient(getWidth()/2, getHeight()/2, 0, getWidth()/2, getHeight()/2, 400);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
    gradient.addColorStop(1, 'black');
    background(255);
    await wait(3000);
    background(gradient);
    text("Welcome to the Game", getWidth()/2, getHeight()/2);
}

states[TESTING_STATE].render = function () {
    background(255, 255, 255, 0.25);
    push();
    fill();
    translate(mouseX, mouseY);
    rotate(Math.atan2(mouseY - this.lastY, mouseX - this.lastX));
    scale(0.25, 0.25);
    ellipse(-50, 50, 50);
    ellipse(-50, -50, 50);
    rect(-50, -50, 300, 100);
    ellipse(250, 0, 50, 50, 0, this.a, Math.PI * 2 - this.a);
    pop();
    if ((mouseX - this.lastX) ** 2 + (mouseY - this.lastY) ** 2 > 1) {
        this.lastX += (mouseX - this.lastX) / 5;
        this.lastY += (mouseY - this.lastY) / 5;
    }
    noFill();
    if (this.isEating && this.a < 0.6) {
        this.a += this.eatSpeed;
    } else if (this.isEating && this.a > 0.6) {
        this.isEating = false;
    } else if (this.a > 0) {
        this.a -= this.eatSpeed;
    } else if (this.a < 0) {
        this.a = 0;
    }
    if (!this.bullets) this.bullets = [];
    this.bullets.forEach(function (bullet) {
        bullet.move();
        bullet.render();
    });
}

states[TESTING_STATE].setup = function () {
    this.lastX = 0;
    this.lastY = 0;
    this.a = 0;
    this.isEating = false;
    this.eatSpeed = 0.07;
    this.bullets = [];
    document.onclick = async function () {
        states[TESTING_STATE].isEating = true;
        states[TESTING_STATE].fireBullet();
    }
}

states[TESTING_STATE].fireBullet = async function () {
    let ratio = (mouseY - this.lastY) / (mouseX - this.lastX);
    this.bullets.push(new bullet(mouseX, mouseY, Math.atan2((mouseY - this.lastY), (mouseX - this.lastX))));
    setTimeout(() => {
        states[TESTING_STATE].bullets.shift();
    }, 3500);
}