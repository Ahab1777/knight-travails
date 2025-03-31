
//Possible traversals
//always 1 or 2
//every edge weights 1


//Graph representation - Edge list


function createBoardArray(x, y){ // x and y for sides of the board
    const boardArray = []
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            
            boardArray.push([j, i, []])//the array index will be the square's ID. Empty array to add possible paths from this position     
        }        
    }
    return boardArray
}


function createAdjacency(boardArray) {
    // let adjacencyList = Array.from({ length: boardArray.length }, () => []); // Create array of arrays
    boardArray.forEach((square, currentIndex) => {
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
    });
    // return adjacencyList;
    return boardArray
    }

//Create only one step and apply it recursively 
    //Is this the target square?
        //True - return square
        //False - recursion with new targetPosition
//Find shortest path
//print shortest path
function knightMoves(currentPosition, targetPosition){
    const adjacencyArray = createAdjacency(createBoardArray(8, 8))
    if (matchArrays(currentPosition, targetPosition)) {
        return false
    }
    //search for current position on adjacencyArray
    adjacencyArray.forEach(position => {
        if (currentPosition[0] === position[0] && currentPosition[1] === position[1] ) {
            //recursion
            knightMoves(position, targetPosition)
        }
    })

 }

function printBoard(board){
    const boardSize = 8; // Each row has 8 items
    for (let i = 0; i < board.length; i += boardSize) {
        const row = board.slice(i, i + boardSize);
        console.log(row.map(pos => `[${pos[0]},${pos[1]}]`).join(' '));
    }
}


printBoard(createBoardArray(8,8))

console.log(createAdjacency(createBoardArray(8,8)))
