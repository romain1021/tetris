let rows = 20;
let cols = 10;
let resolution = 30;
let grid = [];


function createGrid() {
    for (let r = 0; r < rows; r++) {
        grid[r] = new Array(cols).fill(0);
    }
}


function drawGrid() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (grid[r][c] !== 0) {
                fill(grid[r][c]);  
            } else {
                fill(255);  
            }
            stroke(0);
            rect(c * resolution, r * resolution, resolution, resolution);
        }
    }
}
