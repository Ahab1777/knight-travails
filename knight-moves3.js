//Knight only steps in the following directions added to their current x & y location
    // [1, 2], [2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2]
//The destination cannot be lower than 0 nor higher than 7 for a 8x8 grid
//A square/node/vertex will be an object with the it position and a check to verify that it was traversed already
//hashmap to represent possible moves, where each bucket is a vertex linked toa linked list with possible destinations form that vertex/square

//loop over possible steps that I knight may take and check if matches target destination
    //if true, return

class Square{
    constructor(x,y) {
        this._x = x
        this._y = y
        this._wayBack = null
    }

    set setWayBack(square){
        this._wayBack = square;
    }
}

class Knight{
    constructor(){

    }

    
}