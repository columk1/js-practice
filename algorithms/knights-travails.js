/* 
Knights Travails
Project assignment for The Odin Project
*/

function KnightTravails() {
  let graph = new Map()
  let size = 8

  // Add Vertices. Creates a set of all possible chess positions. '0, 0' => []
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      graph.set(`${[i, j]}`, [])
    }
  }

  // Add Edges. Adds an adjacency list of all possible moves from each vertex. '0, 0' => ['1, 2', '2, 1']

  for (let [pos] of graph) {
    const x = parseInt(pos[0])
    const y = parseInt(pos[2])

    // Keys are hours on a clockface to help visualize the direction in which each operation leads
    const options = {
      1: [x + 1, y + 2],
      2: [x + 2, y + 1],
      4: [x + 2, y - 1],
      5: [x + 1, y - 2],
      7: [x - 1, y - 2],
      8: [x - 2, y - 1],
      10: [x - 2, y + 1],
      11: [x - 1, y + 2],
    }

    for (let option in options) {
      const move = options[option].toString()
      if (graph.has(move)) graph.get(pos).push(move)
    }
  }

  const printResult = (path) => {
    console.log(`=> You made it in ${path.length - 1} moves! Here's your path:`)
    path.forEach((move) => {
      console.log(`[${move}]`)
    })
  }

  return {
    board: graph,
    // Find the shortest path from start to end
    knightMoves(start, end) {
      const queue = []
      const paths = []
      const visited = new Set()

      queue.push([start, [start]])

      while (queue.length > 0) {
        let [currentPosition, path] = queue.shift()
        visited.add(currentPosition)

        if (currentPosition === end) {
          return printResult(path)
        }

        const possibleMoves = this.board.get(currentPosition) // moves -> ['4,2', '3,3', ...]

        for (let move of possibleMoves) {
          if (!visited.has(move)) queue.push([move, [...path, move]])
          // queue -> ['4,2', ['0,0', '2,1', '4,2']]
        }
      }
      return paths
    },
  }
}

let game = new KnightTravails()
console.time()
game.knightMoves('3,3', '4,3')
console.timeEnd()
