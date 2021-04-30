import { update as updateSnake, draw as drawSnake, snakes_speed, getSnakeHead, snakeIntersect } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outOfGrid } from './grid.js'

let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('Game-Board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost the game. Press ok to restart.')) {
      window.location = '/'
    }
    return
  }


  window.requestAnimationFrame(main)
  const secSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secSinceLastRender < 1 / snakes_speed) return


  lastRenderTime = currentTime

  update()
  draw()
}

window.requestAnimationFrame(main)

function update() {
  updateSnake()
  updateFood()
  checkDeath()
}

function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}

function checkDeath() {
  gameOver = outOfGrid(getSnakeHead()) || snakeIntersect()
}
