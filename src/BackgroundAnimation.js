const bgCanvas = document.getElementById('bg-canvas');
const ctx = bgCanvas.getContext('2d');
const CANVAS_WIDTH = bgCanvas.width = 500;
const CANVAS_HEIGHT = bgCanvas.height = 400;

const bgPics = new Array(6).fill(null);


for (let i = 0; i < bgPics.length; i++) {
  const img = new Image();
  img.src = `../assets/bg/bg0${i + 1}.png`
  bgPics[i] = img
}


window.onload = function () {
  class BgLayer {
    constructor(image, speed) {
      this.x = 0;
      this.bgWidth = 512;
      this.image = image;
      this.bgMoveSpeed = speed;
    }
    update() {
  
      if (this.x <= -this.bgWidth) {
        this.x = 0;
      } else {
        this.x -= this.bgMoveSpeed;
      }
  
      // 让两个图像稍微重叠一下（防止闪白边），同时保证输出为整数
      this.x = Math.floor(this.x - this.bgMoveSpeed);
  
    }
    draw() {
      ctx.drawImage(this.image, this.x, 0);

      // 让真实的图片 无缝后面 永远跟着一个窗口（注意是窗口噢！）
      ctx.drawImage(this.image, this.x + this.bgWidth, 0);
    }
  }
  
  const layer1 = new BgLayer(bgPics[0], 0.1);
  const layer2 = new BgLayer(bgPics[1], 0.2);
  const layer3 = new BgLayer(bgPics[2], 0.4);
  const layer4 = new BgLayer(bgPics[3], 0.6);
  const layer5 = new BgLayer(bgPics[4], 0.8);
  const layer6 = new BgLayer(bgPics[5], 1);
  
  const bgLayerList = [layer1, layer2, layer3, layer4, layer5, layer6]
  
  
  function animation () {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bgLayerList.forEach((item) => {
      item.update();
      item.draw();
    })
  
    requestAnimationFrame(animation);
  }
  
  animation();

}




