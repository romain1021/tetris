const TETROMINOS = {
    I: { shape: [[1, 1, 1, 1]], color: '#D6AEE8' },
    J: { shape: [[1, 0, 0], [1, 1, 1]], color: '#A8D5BA' },
    L: { shape: [[0, 0, 1], [1, 1, 1]], color: '#F9E2AE' },
    O: { shape: [[1, 1], [1, 1]], color: '#F7B7A3' },
    S: { shape: [[0, 1, 1], [1, 1, 0]], color: '#A3C6E4' },
    T: { shape: [[0, 1, 0], [1, 1, 1]], color: '#F8C9B8' },
    Z: { shape: [[1, 1, 0], [0, 1, 1]], color: '#E3C6E6' }
};

class Piece {
    constructor(tetromino) {
        this.shape = tetromino.shape;
        this.color = tetromino.color;
        this.x = 4;  
        this.y = 0;  
        this.locked = false;
    }

    draw() {
        for (let r = 0; r < this.shape.length; r++) {
            for (let c = 0; c < this.shape[r].length; c++) {
                if (this.shape[r][c] === 1) {
                    fill(this.color);
                    stroke(0);
                    rect((this.x + c) * resolution, (this.y + r) * resolution, resolution, resolution);
                }
            }
        }
    }

    rotate() {
        let newShape = [];
        let rows = this.shape.length;
        let cols = this.shape[0].length;

        for (let c = 0; c < cols; c++) {
            let newRow = [];
            for (let r = rows - 1; r >= 0; r--) {
                newRow.push(this.shape[r][c]);
            }
            newShape.push(newRow);
        }

        // Check if the new shape collides before applying the rotation
        if (!this.collision(0, 0, newShape)) {
            this.shape = newShape;  
        }
    }

    moveDown() {
        if (!this.collision(0, 1)) {
            this.y++;
        } else {
            this.locked = true;  
        }
    }

    moveHorizontal(direction) {
        if (!this.collision(direction, 0)) {
            this.x += direction;
        }
    }

    collision(xOffset, yOffset, testShape = this.shape) {
        for (let r = 0; r < testShape.length; r++) {
            for (let c = 0; c < testShape[r].length; c++) {
                if (testShape[r][c] === 1) {
                    let newX = this.x + c + xOffset;
                    let newY = this.y + r + yOffset;

                    // Check for boundary collisions
                    if (newX < 0 || newX >= cols || newY >= rows) {
                        return true;
                    }
                    // Check for collisions with other pieces
                    if (newY >= 0 && grid[newY][newX] !== 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}
