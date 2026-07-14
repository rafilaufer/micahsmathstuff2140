const size = 16;
let board = Array(size).fill().map(() => Array(size).fill(0));

function initBoard() {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = ''; // Clear
    for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
            let tile = document.createElement('div');
            tile.className = 'tile';
            tile.id = `tile-${r}-${c}`;
            tile.innerText = board[r][c] || '';
            boardElement.appendChild(tile);
        }
    }
}

// Logic to process a row (slide left)
function slide(row) {
    let arr = row.filter(val => val !== 0);
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1]) {
            arr[i] *= 2;
            arr.splice(i + 1, 1);
        }
    }
    while (arr.length < size) arr.push(0);
    return arr;
}

// Example: Move Left
function moveLeft() {
    for (let r = 0; r < size; r++) {
        board[r] = slide(board[r]);
    }
    initBoard();
}

// Initial Random Spawn
function spawn() {
    let empty = [];
    board.forEach((r, ri) => r.forEach((v, ci) => { if(v === 0) empty.push([ri, ci]) }));
    if (empty.length > 0) {
        let [r, c] = empty[Math.floor(Math.random() * empty.length)];
        board[r][c] = 2;
    }
    initBoard();
}

spawn();
initBoard();
