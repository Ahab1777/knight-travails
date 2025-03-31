#Knight Travails project for Odin Project

knightMoves() shows the shortest possible way to get from one square to another by outputting all squares the knight will stop on along the way

Board is 8x8
    i and j goes from 0 to 7
    any position beyond 7 is invalid


Knight
    Can traverse (i+1 & j+2), (i+2 & j+1), (i-1 & j-2), (i-2 & j-1), (i+1 & j-2), (i-2 & j+1), (i-1 & j+2) or (i-2 & j+1)
    No operation can ends below zero or above 7
    
The Graph
    Vertices are the possible positions (represented by a pair of coordinates [x,y])
    Edges are the Knight moves (eg: [0,0] to [1,2])
    Each move is a connection between two points in the Graph(board)

The Function
    Receives destination
    Checks if within board bounds
    Iterate through all paths and find the smallest one
    Print path sequence

Vertices
    V = 64
    E = ?