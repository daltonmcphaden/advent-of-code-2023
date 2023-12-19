import * as fs from "fs"

let moves = fs.readFileSync("input.txt", "utf-8").split("\n")

console.log(moves)

let ups = 0
let downs = 0
let lefts = 0
let rights = 0
for (const move of moves) {
  const [direction, amount] = move.split(" ")
  switch (direction) {
    case "U":
      ups += parseInt(amount)
      break
    case "D":
      downs += parseInt(amount)
      break
    case "L":
      lefts += parseInt(amount)
      break
    case "R":
      rights += parseInt(amount)
      break
  }
}

const directionMap = {
  U: [0, -1],
  D: [0, 1],
  L: [-1, 0],
  R: [1, 0],
}

const m = ups + downs
const n = lefts + rights

const grid = new Array(m).fill(0).map(() => new Array(n).fill(0))

type Coordinate = [number, number]

const startingLocation: Coordinate = [m / 2, n / 2]
console.log(startingLocation)

for (const move of moves) {
  const [direction, amount] = move.split(" ")
  for (let i = 0; i < parseInt(amount); i++) {
    const [x, y] = startingLocation
    const [dx, dy] = directionMap[direction]
    const newX = x + dx
    const newY = y + dy
    grid[newX][newY] = 1
    startingLocation[0] = newX
    startingLocation[1] = newY
  }
}

// 0 = not touched yet
// 1 = included
// 2 = visited but not sure yet
// 3 = visited and not included
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] !== 0) {
      continue
    }
    console.log(`starting flood at ${i}, ${j}`)
    let isFloodContained = true
    const currentFlood: Coordinate[] = []
    // add coords to list because we don't know yet what their final value will be
    const currentFloodQueue: Coordinate[] = [[i, j]]
    while (currentFloodQueue.length > 0) {
      const currentFloodLocation = currentFloodQueue.shift()!
      const [x, y] = currentFloodLocation

      if (grid[x][y] !== 0) {
        continue
      }

      grid[x][y] = 2
      currentFlood.push(currentFloodLocation)

      const adjacentSquares: Coordinate[] = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]
      for (const [a, b] of adjacentSquares) {
        if (a < 0 || a >= grid.length || b < 0 || b >= grid[0].length) {
          isFloodContained = false
        } else {
          currentFloodQueue.push([a, b])
        }
      }
    }
    for (const [x, y] of currentFlood) {
      grid[x][y] = isFloodContained ? 1 : 3
    }
  }
}

let count = 0
for (const row of grid) {
  for (const col of row) {
    if (col === 1) {
      count += 1
    }
  }
}

console.log(count)
