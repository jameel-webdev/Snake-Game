let canvas, ctx;
window.onload = function () {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  // render X times per second
  let x = 8;
  setInterval(draw, 1000 / x);
};
// game world variables
const gridSize = (tileSize = 21); // 20 x 20 = 400
let nextX = (nextY = 0);
// snake
let defaultTailSize = 3;
let tailSize = defaultTailSize;
let snakeTrail = [];
let snakeX = (snakeY = 10);
// apple
let appleX = (appleY = 15);
// draw
function draw() {
  // move snake in next pos
  snakeX += nextX;
  snakeY += nextY;
  // snake over game world?
  if (snakeX < 0) {
    snakeX = gridSize - 1;
  }
  if (snakeX > gridSize - 1) {
    snakeX = 0;
  }
  if (snakeY < 0) {
    snakeY = gridSize - 1;
  }
  if (snakeY > gridSize - 1) {
    snakeY = 0;
  }
  //Generate apple
  if (snakeX == appleX && snakeY == appleY) {
    tailSize++;
    appleX = Math.floor(Math.random() * gridSize);
    appleY = Math.floor(Math.random() * gridSize);
  }
  //paint background
  ctx.fillStyle = "#1C1D24";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw grid lines
  ctx.strokeStyle = "#71717173"; // color of grid lines
  for (let i = 0; i <= gridSize; i++) {
    ctx.beginPath();
    ctx.moveTo(i * tileSize, 0);
    ctx.lineTo(i * tileSize, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i * tileSize);
    ctx.lineTo(canvas.width, i * tileSize);
    ctx.stroke();
  }
  // paint snake
  // Create gradient
  grd = ctx.createLinearGradient(0.0, 150.0, 300.0, 150.0);

  // Add colors
  grd.addColorStop(0.0, "rgba(247, 149, 51, 1.000)");
  grd.addColorStop(0.151, "rgba(243, 112, 85, 1.000)");
  grd.addColorStop(0.311, "rgba(239, 78, 123, 1.000)");
  grd.addColorStop(0.462, "rgba(161, 102, 171, 1.000)");
  grd.addColorStop(0.621, "rgba(80, 115, 184, 1.000)");
  grd.addColorStop(0.748, "rgba(16, 152, 173, 1.000)");
  grd.addColorStop(0.875, "rgba(7, 179, 155, 1.000)");
  grd.addColorStop(1.0, "rgba(111, 186, 130, 1.000)");

  ctx.fillStyle = grd;
  for (let i = 0; i < snakeTrail.length; i++) {
    ctx.fillRect(
      snakeTrail[i].x * tileSize,
      snakeTrail[i].y * tileSize,
      tileSize,
      tileSize
    );
    //snake bites it's tail?
    if (snakeTrail[i].x == snakeX && snakeTrail[i].y == snakeY) {
      tailSize = defaultTailSize;
    }
  }
  // paint apple
  ctx.fillStyle = grd;
  ctx.fillRect(appleX * tileSize, appleY * tileSize, tileSize, tileSize);
  //set snake trail
  snakeTrail.push({ x: snakeX, y: snakeY });
  while (snakeTrail.length > tailSize) {
    snakeTrail.shift();
  }
}
// input
function keyDownEvent(e) {
  switch (e.keyCode) {
    case 37: // left arrow key
      if (nextX !== 1 || snakeTrail.length === 0) {
        // Check if the snake is not moving right or if it's the first move
        nextX = -1;
        nextY = 0;
      }
      break;
    case 38: // up arrow key
      if (nextY !== 1 || snakeTrail.length === 0) {
        // Check if the snake is not moving down or if it's the first move
        nextX = 0;
        nextY = -1;
      }
      break;
    case 39: // right arrow key
      if (nextX !== -1 || snakeTrail.length === 0) {
        // Check if the snake is not moving left or if it's the first move
        nextX = 1;
        nextY = 0;
      }
      break;
    case 40: // down arrow key
      if (nextY !== -1 || snakeTrail.length === 0) {
        // Check if the snake is not moving up or if it's the first move
        nextX = 0;
        nextY = 1;
      }
      break;
  }
}
