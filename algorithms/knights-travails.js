/* 
Knights Travails
Project assignment for The Odin Project
*/

function KnightTravails() {
  const SIZE = 8
  const chessboard = new Map()

  // Add Vertices. Creates a set of all possible chess positions. '0, 0' => []
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      chessboard.set(`${[i, j]}`, [])
    }
  }

  // Parse x, y coordinates of each vertex as integers for arithmetic
  for (let [square] of chessboard) {
    const x = parseInt(square[0]) // x
    const y = parseInt(square[2]) // y

    // A list of operations to simulate all moves
    const options = [
      [x + 1, y + 2],
      [x + 2, y + 1],
      [x + 2, y - 1],
      [x + 1, y - 2],
      [x - 1, y - 2],
      [x - 2, y - 1],
      [x - 2, y + 1],
      [x - 1, y + 2],
    ]

    // Add Edges. Adds an adjacency list of all possible moves from each vertex. '0, 0' => ['1, 2', '2, 1']
    options.forEach((option) => {
      const move = option.toString()
      if (chessboard.has(move)) chessboard.get(square).push(move)
    })
  }
  // Print result to console, called when the algorithm is finished
  const printResult = (path) => {
    console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`)
    path.forEach((move) => {
      console.log(`[${move}]`)
    })
  }

  // Find the shortest path from start to end. Time complexity: O(V+E)
  function knightMoves(start, end) {
    const queue = []
    const paths = []
    const visited = new Set()

    queue.push([start, [start]]) // -> ['x, y', ['x, y']]

    while (queue.length > 0) {
      let [currentPosition, path] = queue.shift()
      visited.add(currentPosition)

      // Terminal condition
      if (currentPosition === end) {
        return printResult(path)
      }

      const possibleMoves = chessboard.get(currentPosition) // -> ['4,2', '3,3', ...]

      for (let move of possibleMoves) {
        if (!visited.has(move)) queue.push([move, [...path, move]])
        console.log(queue)
        // queue -> ['4,2', ['0,0', '2,1', '4,2']]
      }
    }
    return paths
  }

  return {
    knightMoves,
  }
}

let game = new KnightTravails()
console.time()
game.knightMoves('3,3', '4,3')
console.timeEnd()
