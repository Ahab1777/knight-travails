//create board
//create representation of the board with only numbers
//Breadth-first
    //

class PositionNode{
    constructor(currentIndex, previousNode = null){
        this._currentIndex = currentIndex
        this._previousPositionNode = previousNode
    }

    set currentIndex(value){
        this._currentIndex = value
    }

    set previousNode(value){
        this._previousPositionNode = value
    }

    get currentIndex(){
        return this._currentIndex
    }

    get previousNode(){
        return this._previousPositionNode
    }
}

class Board{
    constructor(x,y){
        this._board = this.createBoardArray(x, y)
        this._adjacencyArray = this.populateAdjacencies(this._board)
        this.rows = y;
        this.cols = x;
    }

    get board() {
        return this._board;
    }
    
    get adjacencyArray() {
        return this._adjacencyArray;
    }
    
    knightMoves(startingPosition, targetPosition) {
        const startingIndex = this.positionToIndex(startingPosition);
        const targetIndex = this.positionToIndex(targetPosition);

        const finalNode = this.breadthFirstSearch(startingIndex, targetIndex);
        const path = this.buildPath(finalNode, startingIndex);

        console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`);
        path.forEach(step => console.log(step));
    }

    breadthFirstSearch(startingIndex, targetIndex) {
        const queue = [new PositionNode(startingIndex)];
        const setOfVisitedIndexes = new Set();

        while (queue.length) {
            const currentNode = queue.shift();
            if (setOfVisitedIndexes.has(currentNode.currentIndex)) continue;

            if (currentNode.currentIndex === targetIndex) return currentNode;

            setOfVisitedIndexes.add(currentNode.currentIndex);
            const neighbors = this._board[currentNode.currentIndex].paths.map(pos => this.positionToIndex(pos));
            neighbors.forEach(index => queue.push(new PositionNode(index, currentNode)));
        }

        return null; // No path found
    }

    buildPath(finalNode, startingIndex) {
        const path = [];
        let currentNode = finalNode;

        while (currentNode) {
            path.unshift(this._board[currentNode.currentIndex].position);
            if (currentNode.currentIndex === startingIndex) break;
            currentNode = currentNode.previousNode;
        }

        return path;
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
    
    positionToIndex(position) {
        if (position[0] < 0 || position[0] >= this.rows || position[1] < 0 || position[1] >= this.cols) {
            throw new Error(`Invalid position: ${position}`);
        }
        for (const square of this._board) {
            if (square.position[0] === position[0] && square.position[1] === position[1]) {
                return square.index;
            }
        }
        return null; // No match found
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
console.log(board.knightMoves([3,3], [4,3]))