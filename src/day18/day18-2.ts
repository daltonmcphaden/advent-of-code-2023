import * as fs from "fs"

let moves = fs.readFileSync("test.txt", "utf-8").split("\n")

console.log(moves)

// 0 means R, 1 means D, 2 means L, and 3 means U.
function getDirection(direction: string): string {
  switch (direction) {
    case "0":
      return "R"
    case "1":
      return "D"
    case "2":
      return "L"
    case "3":
      return "U"
  }
}

function getDirectionAndAmount(move: string): [string, number] {
  const hex = move.split(" ")[2].slice(1, -1)
  const direction = getDirection(hex[hex.length - 1])
  const amount = parseInt(hex.slice(1, -1), 16)

  return [direction, amount]
}

let ups = 0
let downs = 0
let lefts = 0
let rights = 0
for (const move of moves) {
  const [direction, amount] = getDirectionAndAmount(move)
  switch (direction) {
    case "U":
      ups += amount
      break
    case "D":
      downs += amount
      break
    case "L":
      lefts += amount
      break
    case "R":
      rights += amount
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
console.log(m, n)

const grid = [[]]

type Coordinate = [number, number]

const startingLocation: Coordinate = [0, 0]
console.log(startingLocation)

for (const move of moves) {
  console.log(grid.length, grid[0].length)
  const [direction, amount] = getDirectionAndAmount(move)
  console.log(direction, amount)
  for (let i = 0; i < amount; i++) {
    const [x, y] = startingLocation
    const [dx, dy] = directionMap[direction]
    const newX = x + dx
    const newY = y + dy
    if (newX > grid.length - 1) {
      grid.push(Array(grid[0].length).fill(0))
      startingLocation[0] -= 1
    }
    if (newY > grid[0].length - 1) {
      for (const row of grid) {
        row.push(0)
      }
      startingLocation[1] -= 1
    }
    if (newX < 0) {
      grid.unshift(Array(grid[0].length).fill(0))
      startingLocation[0] += 1
    }
    if (newY < 0) {
      for (const row of grid) {
        row.unshift(0)
      }
      startingLocation[1] += 1
    }

    grid[newX][newY] = 1

    startingLocation[0] = newX
    startingLocation[1] = newY
  }
}

// // 0 = not touched yet
// // 1 = included
// // 2 = visited but not sure yet
// // 3 = visited and not included
// for (let i = 0; i < grid.length; i++) {
//   for (let j = 0; j < grid[i].length; j++) {
//     if (grid[i][j] !== 0) {
//       continue
//     }
//     console.log(`starting flood at ${i}, ${j}`)
//     let isFloodContained = true
//     const currentFlood: Coordinate[] = []
//     // add coords to list because we don't know yet what their final value will be
//     const currentFloodQueue: Coordinate[] = [[i, j]]
//     while (currentFloodQueue.length > 0) {
//       const currentFloodLocation = currentFloodQueue.shift()!
//       const [x, y] = currentFloodLocation

//       if (grid[x][y] !== 0) {
//         continue
//       }

//       grid[x][y] = 2
//       currentFlood.push(currentFloodLocation)

//       const adjacentSquares: Coordinate[] = [
//         [x + 1, y],
//         [x - 1, y],
//         [x, y + 1],
//         [x, y - 1],
//       ]
//       for (const [a, b] of adjacentSquares) {
//         if (a < 0 || a >= grid.length || b < 0 || b >= grid[0].length) {
//           isFloodContained = false
//         } else {
//           currentFloodQueue.push([a, b])
//         }
//       }
//     }
//     for (const [x, y] of currentFlood) {
//       grid[x][y] = isFloodContained ? 1 : 3
//     }
//   }
// }

let count = 0
for (const row of grid) {
  for (const col of row) {
    if (col === 1) {
      count += 1
    }
  }
}

console.log(count)
