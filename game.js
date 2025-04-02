// Get the canvas element and set up the context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define colors and game parameters
const snakeColor = '#00FF00';
const foodColor = '#FFFF66';
const backgroundColor = '#3298dc';
const borderWidth = 10;

const snakeSize = 10;
let snakeSpeed = 100;
let score = 0;

// Initialize snake
let snake = [
    {x: 250, y: 200},
    {x: 240, y: 200},
    {x: 230, y: 200}
];

// Initialize food
let food = generateFood();

// Direction variables
let dx = snakeSize;
let dy = 0;

// Handle key press events
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -snakeSize;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = snakeSize;
        dy = 0;
    } else if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -snakeSize;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = snakeSize;
    }
}

// Generate food at random location
function generateFood() {
    let foodX = Math.floor(Math.random() * (canvas.width - snakeSize) / snakeSize) * snakeSize;
    let foodY = Math.floor(Math.random() * (canvas.height - snakeSize) / snakeSize) * snakeSize;
    return {x: foodX, y: foodY};
}

// Draw snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
        ctx.strokeStyle = "#000"; // Add a black border for visibility
        ctx.strokeRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

// Draw food
function drawFood() {
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
}

// Update snake position
function updateSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head); // Add new head to the snake

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById('score').textContent = score;
        food = generateFood(); // Generate new food
    } else {
        snake.pop(); // Remove last part of snake if no food was eaten
    }
}

// Check for collisions
function checkCollisions() {
    const head = snake[0];

    // Check if snake hits the walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
    }

    // Check if snake collides with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

// Display game over message

function clearCanvas() {
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

let gameInterval; // Store the interval globally

function gameOver() {
    clearInterval(gameInterval); // Stop the game loop
    setTimeout(() => {
        alert("Game Over! Your score was: " + score);
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank"); // Open Rickroll in new tab
        restartGame(); // Restart the game after opening the link
    }, 10);
}


function restartGame() {
    // Reset game variables
    snake = [
        {x: 250, y: 200},
        {x: 240, y: 200},
        {x: 230, y: 200}
    ];
    dx = snakeSize;
    dy = 0;
    score = 0;
    document.getElementById('score').textContent = score;
    food = generateFood();

    // Restart game loop
    gameInterval = setInterval(gameLoop, 100);
}

// Start the game


// Game loop function
function gameLoop() {
    console.log("test")

    clearCanvas()
    updateSnake(); // Update snake's position
    drawSnake(); // Draw snake on the canvas
    drawFood(); // Draw food on the canvas
    checkCollisions(); // Check for collisions with walls or itself
}

// Start the game
gameInterval = setInterval(gameLoop, 100);
