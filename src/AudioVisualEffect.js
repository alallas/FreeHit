import CreateRoleAnimation, { createRoleAnimationInfo } from "./RoleAnimation.js";
import { explosionState } from "./constants/RoleState.js";

const explosionCanvas = document.getElementById('enemy-canvas');
const ctx = explosionCanvas.getContext('2d');
const CANVAS_WIDTH = explosionCanvas.width = 500;
const CANVAS_HEIGHT = explosionCanvas.height = 400;
const canvasPosition = explosionCanvas.getBoundingClientRect()

const explosionAnimationInfo = createRoleAnimationInfo(explosionState, 64, 64)

const explosionImage = new Image();
explosionImage.src = '../assets/explosion.png';
console.log('explosionImage', explosionImage)


const explosions = [];

class Explosion {
  constructor(positionX, positionY) {

    this.role = new CreateRoleAnimation(explosionAnimationInfo);
    this.roleFrameXPos = 0;
    this.roleFrameYPos = 0;
    this.currentFrame = 0;

    // this.x = positionX - this.role.roleWidth / 2;
    // this.y = positionY - this.role.roleHeight / 2;
    this.x = positionX;
    this.y = positionY;
    this.angle = Math.random() * 6.2;

    this.sound = new Audio();
    this.sound.src = './'

  }

  update () {
    // if (this.currentFrame === 0) this.sound.play();
    const [roleFrameXPos, roleFrameYPos] = this.role.updateRoleFrameIndex('normal', this.currentFrame)
    this.roleFrameXPos = roleFrameXPos;
    this.roleFrameYPos = roleFrameYPos;
    this.currentFrame ++;
  }

  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);

    this.role.drawRole(ctx, explosionImage, this.roleFrameXPos, this.roleFrameYPos, -(this.role.roleWidth / 2), -(this.role.roleHeight / 2));

    ctx.restore();
  }
}



window.addEventListener('click', (e) => {
  createAnimation(e)
})

function createAnimation(e) {
  const positionX = e.x - canvasPosition.left;
  const positionY = e.y - canvasPosition.top;
  explosions.push(new Explosion(positionX, positionY))
}



function animation() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].update();
    explosions[i].draw();
    if (explosions[i].currentFrame > 50) {
      explosions.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animation);
}
animation()


