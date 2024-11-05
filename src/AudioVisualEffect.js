import CreateRoleAnimation, { createRoleAnimationInfo } from "./RoleAnimation.js";
import { explosionState } from "./constants/RoleState.js";

// const explosionCanvas = document.getElementById('enemy-canvas');
// const ctx = explosionCanvas.getContext('2d');
// const CANVAS_WIDTH = explosionCanvas.width = 100;
// const CANVAS_HEIGHT = explosionCanvas.height = 100;
// const canvasPosition = explosionCanvas.getBoundingClientRect()


const explosionAnimationInfo = createRoleAnimationInfo(explosionState, 64, 64)

const explosions = [];

class Explosion {
  constructor(positionX, positionY) {

    this.role = new CreateRoleAnimation(explosionAnimationInfo);
    this.explosionImage = new Image();
    this.explosionImage.src = '../assets/explosion.png';

    this.x = positionX - this.role.roleWidth / 2;
    this.y = positionY - this.role.roleHeight / 2;
    this.angle = Math.random() * 6.2;

    this.needToDelete = false;

    this.sound = new Audio();
    this.sound.src = './';

  }

  update () {
    // if (this.currentFrame === 0) this.sound.play();
    this.role.updateRoleFrameIndex('normal', this);

    if (this.currentFrame && this.currentFrame > 40) {
      this.needToDelete = true;
    }
  }

  draw(canvas) {
    // ctx.save();
    // ctx.translate(this.x, this.y);
    // ctx.rotate(this.angle);
    // this.role.drawRole(ctx, explosionImage, -(this.role.roleWidth / 2), -(this.role.roleHeight / 2));
    // ctx.restore();

    canvas && this.role.drawRole(canvas, this.explosionImage, this.x, this.y);

  }
}



// window.addEventListener('click', (e) => {
//   createAnimation(e)
// })

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
// animation()


export default Explosion;