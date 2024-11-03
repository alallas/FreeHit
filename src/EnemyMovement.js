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

let currentFrame = 0

class Enemy {
  constructor () {
    this.flyingSpeed = Math.random() - 0.8;
    this.flyingAngle = 0;
    this.flyingAngleSpeed = Math.random() * 2 + 0.5;
    this.curve = Math.random() * 100;

    this.role = new CreateRoleAnimation(enemyAnimationInfo);
    this.roleFrameXPos = 0;
    this.roleFrameYPos = 0;

    this.x = Math.random() * (CANVAS_WIDTH - this.role.roleWidth);
    this.y = Math.random() * (CANVAS_HEIGHT - this.role.roleHeight);

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
    this.x = this.curve * Math.cos(this.flyingAngle * Math.PI / 180) + (CANVAS_WIDTH / 2 - this.role.roleWidth / 2)
    this.y = this.curve * Math.sin(this.flyingAngle * Math.PI / 180) + (CANVAS_WIDTH / 2 - this.role.roleWidth / 2)
    this.flyingAngle += this.flyingAngleSpeed;


    const [roleFrameXPos, roleFrameYPos] = this.role.updateRoleFrameIndex('move_f', currentFrame);
    this.roleFrameXPos = roleFrameXPos;
    this.roleFrameYPos = roleFrameYPos;

  }
  draw() {
    this.role.drawRole(ctx, enemyImage, this.roleFrameXPos, this.roleFrameYPos, this.x, this.y)
  }
}

const enemiesCount = 10;
const enemies = [];


for (let i = 0; i < enemiesCount; i++) {
  enemies.push(new Enemy());
}

console.log(enemies)

function animation() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  enemies.forEach((item) => {
    item.update();
    item.draw();
  })
  currentFrame++;

  requestAnimationFrame(animation)
}
// animation()






