const playBoard = document.querySelector(".play-board")
const scoreData = document.querySelector(".score")
const HighScoreData = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i")

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;
let score = 0;

let HighScore = localStorage.getItem("high-score") || 0;
HighScoreData.innerHTML = `High Score: ${HighScore}`;

const changeFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const showGameOver = () => {
    clearInterval(setIntervalId)
    alert("Game Over! Press OK to replay.")
    location.reload()
}

const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

controls.forEach((key) => {
    key.addEventListener("click", () => {
        changeDirection({ key: key.dataset.key })
    })
})

const initGame = () => {

    if (gameOver) return showGameOver()

    let htmlMarkup = `<div class = "food" style = "grid-area: ${foodY} / ${foodX}"></div>`

    if (snakeX === foodX && snakeY === foodY) {
        changeFoodPosition();
        snakeBody.push([foodX, foodY]);
        // console.log(snakeBody)

        score++;
        scoreData.innerHTML = `Score: ${score}`;

        // HighScore = score >= HighScore ? score : HighScore;

        // localStorage.setItem("high-score", HighScore);

        if (score >= HighScore) {
            HighScore = score;
            localStorage.setItem("high-score", HighScore);
            HighScoreData.innerHTML = `High Score: ${HighScore}`;
        }

    }


    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY];

    snakeX = snakeX + velocityX;
    snakeY = snakeY + velocityY;

    //game over
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }


    for (let i = 0; i < snakeBody.length; i++) {

        htmlMarkup += `<div class = "head" style = "grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`

        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }

    }

    playBoard.innerHTML = htmlMarkup;


}
changeFoodPosition();
setIntervalId = setInterval(initGame, 125)
document.addEventListener("keydown", changeDirection)
