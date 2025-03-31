//create board
//create representation of the board with only numbers

function createBoardArray(x, y) { // x and y for sides of the board
    const boardArray = [];
    let index = 0;
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            const position = [j, i];
            const squareObject = {
                index,
                position,
                paths: [],
            };
            boardArray.push(squareObject); // Add squareObject to the boardArray
            index++;
        }
    }
    return boardArray;
}

function createAdjacencyArray(boardArray){
    boardArray.forEach(square => {
        for (let x = -2; x < 3; x++) {
            for (let y = -2; y < 3; y++) {
                if (Math.abs(x) !== Math.abs(y) && x !== 0 && y !== 0) { // Ignore zeroes and equal numbers
                    if (square[0] + x >= 0 && square[0] + x < 8 && square[1] + y >= 0 && square[1] + y < 8) {
                        const destination = [square[0] + x, square[1] + y];
                        // adjacencyList[currentIndex].push(destination);
                        boardArray[currentIndex][2].push(destination)
                    }
                }
            }
        }
    })
}




function printBoard(board) {
    const boardSize = 8; // Each row has 8 items
    for (let i = 0; i < board.length; i += boardSize) {
        const row = board.slice(i, i + boardSize);
        console.log(row.map(square => `[${square.position[0]},${square.position[1]}]`).join(' '));
    }
}

// Example usage:
const board = createBoardArray(8, 8);
printBoard(board);
console.log(board)