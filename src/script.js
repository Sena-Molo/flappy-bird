// Get canvas and context
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Game variables
let bird = { x: 50, y: 200, vy: 0 };
let pipes = [{ x: 400, y: 200, gap: 150 }];
let score = 0;
let gameOver = false;

// Draw game
function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = '#000';
	ctx.fillRect(bird.x, bird.y, 20, 20);
	pipes.forEach(pipe => {
		ctx.fillRect(pipe.x, 0, 50, pipe.y);
		ctx.fillRect(pipe.x, pipe.y + pipe.gap, 50, canvas.height - pipe.y - pipe.gap);
	});
	ctx.font = '24px Arial';
	ctx.textAlign = 'left';
	ctx.textBaseline = 'top';
	ctx.fillStyle = '#000';
	ctx.fillText(`Score: ${score}`, 10, 10);
}

// Update game
function update() {
	bird.y += bird.vy;
	bird.vy += 0.5;
	pipes.forEach(pipe => {
		pipe.x -= 2;
		if (pipe.x < -50) {
			pipe.x = 400;
			pipe.y = Math.random() * (canvas.height - pipe.gap);
		}
	});
	if (bird.y > canvas.height - 20 || bird.y < 0) {
		gameOver = true;
	}
	pipes.forEach(pipe => {
		if (bird.x + 20 > pipe.x && bird.x < pipe.x + 50 && (bird.y < pipe.y || bird.y + 20 > pipe.y + pipe.gap)) {
			gameOver = true;
		}
	});
}

// Handle user input
document.addEventListener('keydown', () => {
	bird.vy = -6;
});

// Main loop
setInterval(() => {
	if (!gameOver) {
		update();
		draw();
	} else {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.font = '48px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';
		ctx.fillStyle = '#000';
		ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
	}
}, 1000 / 60);