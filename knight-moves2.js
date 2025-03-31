//create board
//create representation of the board with only numbers
//Breadth-first
    //

class PositionNode{
    constructor(currentIndex, originIndex = null){
        this._currentIndex = currentIndex
        this._originIndex = originIndex
    }

    set currentIndex(value){
        this._currentIndex = value
    }

    set originIndex(value){
        this._originIndex = value
    }

    get currentIndex(){
        return this._currentIndex
    }

    get originIndex(){
        return this._originIndex
    }
}

class Board{
    constructor(x,y){
        this._board = this.createBoardArray(x, y)
        this._adjacencyArray = this.populateAdjacencies(this._board)
    }

    get board() {
        return this._board;
    }
    
    get adjacencyArray() {
        return this._adjacencyArray;
    }
    
    
    //Create only one step and apply it recursively 
        //Is this the target square?
            //True - return square
            //False - recursion with new targetPosition
    //Find shortest path
    //print shortest path
    knightMoves(currentPosition, targetPosition){
        const queue = [];
        const currentPositionIndex = this.positionToIndex(currentPosition)
        const targetPositionIndex = this.positionToIndex(targetPosition)
        let finalPosition;
        queue.push(new PositionNode(currentPositionIndex, targetPositionIndex))
        while(queue.length){
            if (queue[0].currentIndex === targetPositionIndex) {
                finalPosition = queue[0]
                break;
            } else {
                //find current position on board and loop through all pathsByIndex values
                const nextPossibleStepsArrayByIndex = this._board[queue[0].currentIndex].pathsByIndex
                nextPossibleStepsArrayByIndex.forEach(squareIndex => {
                    queue.push(new PositionNode(squareIndex, queue[0].currentIndex))
                })
            }
            
        }
        
        let steps = 0; //add them through each steps back from the final node
        //print number of steps
        //print path
      
    }
    
    createBoardArray(x, y) { // x and y for sides of the board
        const boardArray = [];
        let index = 0;
        for (let i = 0; i < y; i++) {
            for (let j = 0; j < x; j++) {
                const position = [j, i];
                const squareObject = {
                    index,
                    position,
                    paths: [],
                    pathsByIndex: []
                };
                boardArray.push(squareObject); // Add squareObject to the boardArray
                index++;
            }
        }
        return boardArray;
    }
    
    positionToIndex(position){
    for (const square of this._board) {
        if (square.position[0] === position[0] && square.position[1] === position[1]) {
            return square.index;
        }
    }
    return null; // Return null if no match is found
    }
    populateAdjacencies(boardArray){
        boardArray.forEach((square, index, array) => {
            for (let x = -2; x < 3; x++) {
                for (let y = -2; y < 3; y++) {
                    if (Math.abs(x) !== Math.abs(y) && x !== 0 && y !== 0) { // Ignore zeroes and equal numbers
                        const newX = square.position[0] + x;
                        const newY = square.position[1] + y;
                        if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
                            const destination = [newX, newY];
                            array[index].paths.push(destination)
                            array[index].pathsByIndex.push(this.positionToIndex(destination))
                            //square.paths.push(destination); // Push to the square's paths array
                        }
                    }
                }
            }
        });
    }
    
    printBoard() {
        const board = this._board
        const boardSize = 8; // Each row has 8 items
        for (let i = 0; i < board.length; i += boardSize) {
            const row = board.slice(i, i + boardSize);
            console.log(row.map(square => `[${square.position[0]},${square.position[1]}]`).join(' '));
        }
    }
}


// Example usage:
const board = new Board(8, 8);
board.printBoard();
console.log(board.positionToIndex([0,0]))
console.log('Full board array',board.board)