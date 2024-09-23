let currentPiece;
let fallInterval = 1000;  // Time in ms before the piece moves down
let lastFallTime = 0;     // To track time

function setup() {
    createCanvas(cols * resolution, rows * resolution);
    createGrid();
    spawnNewPiece();  // Start with the first random piece
}

function draw() {
    background(220);
    drawGrid();  // Draw the grid

    let currentTime = millis();
    if (currentTime - lastFallTime > fallInterval) {
        if (!currentPiece.locked) {
            currentPiece.moveDown();  // Automatically move down
        } else {
            lockPiece();  // Lock the piece in place
            spawnNewPiece();  // Spawn a new piece
        }
        lastFallTime = currentTime;
    }

    currentPiece.draw();  // Draw the current piece
}

function keyPressed() {
    if (keyCode === UP_ARROW) {
        currentPiece.rotate();
    } else if (keyCode === LEFT_ARROW) {
        currentPiece.moveHorizontal(-1);  // Move left
    } else if (keyCode === RIGHT_ARROW) {
        currentPiece.moveHorizontal(1);  // Move right
    } else if (keyCode === DOWN_ARROW) {
        currentPiece.moveDown();  // Move down faster
    }
}

function lockPiece() {
    for (let r = 0; r < currentPiece.shape.length; r++) {
        for (let c = 0; c < currentPiece.shape[r].length; c++) {
            if (currentPiece.shape[r][c] === 1) {
                grid[currentPiece.y + r][currentPiece.x + c] = currentPiece.color;  // Lock the piece in place
            }
        }
    }
    checkForFullLines();  // Check for and clear full lines
}

function spawnNewPiece() {
    let shapes = Object.values(TETROMINOS);
    let randomTetromino = random(shapes);
    currentPiece = new Piece(randomTetromino);
}

function checkForFullLines() {
    for (let r = rows - 1; r >= 0; r--) {
        let isFull = true;
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] === 0) {
                isFull = false;
                break;
            }
        }
        if (isFull) {
            grid.splice(r, 1);  // Remove the full row
            grid.unshift(new Array(cols).fill(0));  // Add an empty row at the top
        }
    }
}
