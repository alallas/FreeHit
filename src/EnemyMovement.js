import CreateRoleAnimation, { createRoleAnimationInfo } from './RoleAnimation.js'
import { enemyState } from "./constants/RoleState.js";

const enemyCanvas = document.getElementById('enemy-canvas');
const ctx = enemyCanvas.getContext('2d');
const CANVAS_WIDTH = enemyCanvas.width = 500;
const CANVAS_HEIGHT = enemyCanvas.height = 400;


const enemyImage = new Image();
enemyImage.src = '../assets/enemy.png'

const enemyAnimationInfo = createRoleAnimationInfo(enemyState, 32, 32)
console.log('enemyAnimationInfo',enemyAnimationInfo)



class Enemy {
  constructor () {
    this.flyingSpeed = Math.random() - 0.8;
    this.flyingAngle = 0;
    this.flyingAngleSpeed = Math.random() * 2 + 0.5;
    this.curve = Math.random() * 100;

    this.role = new CreateRoleAnimation(enemyAnimationInfo);

    // this.x = Math.random() * (CANVAS_WIDTH - this.role.roleWidth);
    // this.y = Math.random() * (CANVAS_HEIGHT - this.role.roleHeight);
    this.x = CANVAS_WIDTH;
    this.y = Math.random() * (CANVAS_HEIGHT - this.role.roleHeight);

    this.directionX = Math.random() * 1 + 0;
    this.directionY = Math.random() * 1 - 0.5;

    this.isOutsideOfCanvas = false;

    this.changedRatio = Math.random() + 0.5
    this.changedWidth = this.role.roleWidth * this.changedRatio;
    this.changedHeight = this.role.roleHeight * this.changedRatio;

  }
  update() {
    // 第一种：短暂地原地运动
    // this.x += this.flyingSpeed;
    // this.y += this.flyingSpeed;

    // 第二种：从右往左飞行，且上下做sin函数的飞行
    // this.x += this.flyingSpeed;
    // if (this.x + this.role.roleWidth < 0) {
    //   this.x = CANVAS_WIDTH;
    // }
    // this.y = this.curve * (Math.sin(this.flyingAngle) * 10);
    // this.flyingAngle += this.flyingAngleSpeed;


    // 第三种：旋转飞行，pi除以的数决定运动轨迹
    // this.x = this.curve * Math.cos(this.flyingAngle * Math.PI / 180) + (CANVAS_WIDTH / 2 - this.role.roleWidth / 2)
    // this.y = this.curve * Math.sin(this.flyingAngle * Math.PI / 180) + (CANVAS_WIDTH / 2 - this.role.roleWidth / 2)
    // this.flyingAngle += this.flyingAngleSpeed;


    // 从右到左发射
    this.x -= this.directionX;
    this.y += this.directionY;

    if (this.x + this.role.roleWidth < 0) {
      this.isOutsideOfCanvas = true;
    }
    if (this.y < 0 || this.y + this.role.roleHeight > CANVAS_HEIGHT) {
      this.directionY = this.directionY * -1;
    }


    
    this.role.updateRoleFrameIndex('move_f', this);

  }
  draw() {
    this.role.drawRole(ctx, enemyImage, this.x, this.y, this.changedWidth, this.changedHeight)
  }
}

let score = 0

function drawScore() {
  ctx.fillStyle = 'black';
  ctx.fillText('Score: ' + score, 50, 80);
}




window.addEventListener('click', (e) => {
  const clickColor = ctx.getImageData(e.x, e.y, 1, 1)
})






const enemiesCount = 5;
const enemies = [];

for (let i = 0; i < enemiesCount; i++) {
  enemies.push(new Enemy());
}



// 固定数量的敌人的动画
// function animation() {
//   ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//   enemies.forEach((item) => {
//     item.update();
//     item.draw();
//   })

//   requestAnimationFrame(animation)
// }
// animation()






// 不固定数量的敌人的动画
let accumTime = 0;
const roleShoewInterval = 500;
let lastTime = 0;

let roles = []


function animate(timeTamp) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const intervalTime = timeTamp - lastTime;
  lastTime = timeTamp;

  accumTime += intervalTime;
  if (accumTime > roleShoewInterval) {
    roles.push(new Enemy());
    accumTime = 0;
    roles.sort((a, b) => a.changedWidth - b.changedHeight)
  }
  [...roles].forEach(i => {
    i.update();
    i.draw();
  })
  roles = roles.filter(i => !i.isOutsideOfCanvas);

  drawScore();

  requestAnimationFrame(animate);
}

animate(0)






