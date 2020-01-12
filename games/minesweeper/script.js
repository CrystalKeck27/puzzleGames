setCanvasFromId("gameCanvas")
//class definitions
class cell {
    constructor()
}
//variable definitions

var rows = 8,
    cols = 8;
var grid = []
for (let y = 0; y < rows; y++) {
    grid[y] = []
    for (letx = 0; x < cols; x++) {
        grid[y][x] = 0
    }
}