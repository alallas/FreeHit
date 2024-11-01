import { playerState } from "./constants/RoleState.js";

const mainCanvas = document.getElementById("main-canvas");
const ctx = mainCanvas.getContext("2d");
const CANVAS_WIDTH = mainCanvas.width = 100;
const CANVAS_HEIGHT = mainCanvas.height = 100;

const playerImage = new Image();
playerImage.src = "../assets/player.png";

export const createRoleAnimationInfo = function (roleState, roleWidth, roleHeight) {
  const roleAnimationsInfo = {};
  roleState.forEach((item, index) => {
    const frameLoc = [];
    for (let i = 0; i < item.frames; i++) {
      const positionX = i * roleWidth;
      const positionY = index * roleHeight;
      frameLoc.push({
        x: positionX,
        y: positionY
      })
    }
    roleAnimationsInfo[item.name] = {
      allFramesLocations: frameLoc,
    }
  })
  return {roleAnimationsInfo, roleWidth, roleHeight};
}

const playerAnimationInfo = createRoleAnimationInfo(playerState, 48, 48)

class CreateRoleAnimation {
  constructor({roleAnimationsInfo, roleWidth, roleHeight}) {
    this.roleAnimationsInfo = roleAnimationsInfo;
    this.roleWidth = roleWidth;
    this.roleHeight = roleHeight;
  }
  updateRoleFrameIndex(movementType, currentFrame, pauseFrame = 5) {
    let currentMovementLocations = this.roleAnimationsInfo[movementType].allFramesLocations

    // currentMovementIndex是从0-6的数，表明当前帧的索引
    // currentFrame / pauseFrame向下取整 输出5个0，5个1...（即5帧期间都是展示同一个画面，相当于等待5帧）
    // % 帧数量 输出0-5的真实索引(即循环)
    let currentMovementIndex = Math.floor(currentFrame / pauseFrame) % currentMovementLocations.length;
    let roleFrameXPos = currentMovementIndex * this.roleWidth;
    let roleFrameYPos = currentMovementLocations[currentMovementIndex].y;
    return [roleFrameXPos, roleFrameYPos]
  }

  drawRole(canvas, roleImage, roleFramePosXInImage, roleFramePosYInImage, rolePosXInCanvas = 0, rolePosYInCanvas = 0, roleChangedWidth = this.roleWidth, roleChangedHeight = this.roleHeight) {
    canvas.drawImage && canvas.drawImage(roleImage, roleFramePosXInImage, roleFramePosYInImage, this.roleWidth, this.roleHeight, rolePosXInCanvas, rolePosYInCanvas, roleChangedWidth, roleChangedHeight)
  }
}

const player1 = new CreateRoleAnimation(playerAnimationInfo)
let currentFrame = 0

function animation() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const [x, y] = player1.updateRoleFrameIndex('attack_f', currentFrame, 5)
  player1.drawRole(ctx, playerImage, x, y)
  currentFrame++;
  // if (currentFrame > currentMovementLocations.length * 10) currentFrame = 0;

  requestAnimationFrame(animation)
}
animation()

export default CreateRoleAnimation
