import * as fs from "fs"

let grid: string[][] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map(line => line.split(""))

const numberOfRows = grid.length
const numberOfColumns = grid[0].length

const energized: boolean[][] = Array(grid.length)
  .fill(null)
  .map(() => Array(grid[0].length).fill(false))

function getTrueCount(matrix: boolean[][]): number {
  let count = 0
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      if (matrix[i][j] === true) {
        count += 1
      }
    }
  }

  return count
}

type Direction = "right" | "left" | "up" | "down"

const beamDirections = new Map<string, [number, number]>([
  ["right", [0, 1]],
  ["left", [0, -1]],
  ["up", [-1, 0]],
  ["down", [1, 0]],
])

type Beam = {
  direction: Direction
  position: [number, number]
}

let startingPoints: Beam[] = []
for (let i = 0; i < grid.length; i++) {
  startingPoints.push({ direction: "right", position: [i, 0] })
  startingPoints.push({ direction: "left", position: [i, grid[0].length - 1] })
}
for (let j = 0; j < grid[0].length; j++) {
  startingPoints.push({ direction: "down", position: [0, j] })
  startingPoints.push({ direction: "up", position: [grid.length - 1, j] })
}
console.log(startingPoints)

let maxEnergized = 0
for (const startingPoint of startingPoints) {
  const energized: boolean[][] = Array(grid.length)
    .fill(null)
    .map(() => Array(grid[0].length).fill(false))
  const beamHistory = new Set<string>()
  const beams: Beam[] = [startingPoint]
  while (beams.length > 0) {
    const currentBeam = beams.shift()!
    if (beamHistory.has(`${currentBeam.direction}${currentBeam.position[0]},${currentBeam.position[1]}`)) {
      // we've already been here, so skip it
      console.log("we've already been here, so skip it")
      continue
    }
    beamHistory.add(`${currentBeam.direction}${currentBeam.position[0]},${currentBeam.position[1]}`)

    const [currentRow, currentCol] = currentBeam.position
    //   console.log("currentRow:", currentRow, "currentCol:", currentCol, "energized", getTrueCount(energized))

    if (currentRow < 0 || currentRow >= numberOfRows || currentCol < 0 || currentCol >= numberOfColumns) {
      // beam has moved off the grid, so it's done
      continue
    }

    energized[currentRow][currentCol] = true

    let nextRow = 0
    let nextCol = 0
    const currentSymbol = grid[currentRow][currentCol]
    if (currentSymbol === ".") {
      const [moveRow, moveCol] = beamDirections.get(currentBeam.direction)
      nextRow = currentRow + moveRow
      nextCol = currentCol + moveCol
      beams.push({ direction: currentBeam.direction, position: [nextRow, nextCol] })
    } else if (currentSymbol === "/") {
      if (currentBeam.direction === "right") {
        nextRow = currentRow - 1
        nextCol = currentCol
        beams.push({ direction: "up", position: [nextRow, nextCol] })
      } else if (currentBeam.direction === "left") {
        nextRow = currentRow + 1
        nextCol = currentCol
        beams.push({ direction: "down", position: [nextRow, nextCol] })
      } else if (currentBeam.direction === "down") {
        nextRow = currentRow
        nextCol = currentCol - 1
        beams.push({ direction: "left", position: [nextRow, nextCol] })
      } else if (currentBeam.direction === "up") {
        nextRow = currentRow
        nextCol = currentCol + 1
        beams.push({ direction: "right", position: [nextRow, nextCol] })
      }
    } else if (currentSymbol === "\\") {
      if (currentBeam.direction === "right") {
        nextRow = currentRow + 1
        nextCol = currentCol
        beams.push({ direction: "down", position: [nextRow, nextCol] })
      } else if (currentBeam.direction === "left") {
        nextRow = currentRow - 1
        nextCol = currentCol
        beams.push({ direction: "up", position: [nextRow, nextCol] })
      } else if (currentBeam.direction === "down") {
        nextRow = currentRow
        nextCol = currentCol + 1
        beams.push({ direction: "right", position: [nextRow, nextCol] })
      } else if (currentBeam.direction === "up") {
        nextRow = currentRow
        nextCol = currentCol - 1
        beams.push({ direction: "left", position: [nextRow, nextCol] })
      }
    } else if (currentSymbol === "|") {
      if (currentBeam.direction === "up" || currentBeam.direction === "down") {
        const [moveRow, moveCol] = beamDirections.get(currentBeam.direction)
        nextRow = currentRow + moveRow
        nextCol = currentCol + moveCol
        beams.push({ direction: currentBeam.direction, position: [nextRow, nextCol] })
      } else {
        beams.push({ direction: "up", position: [currentRow - 1, currentCol] })
        beams.push({ direction: "down", position: [currentRow + 1, currentCol] })
      }
    } else if (currentSymbol === "-") {
      if (currentBeam.direction === "left" || currentBeam.direction === "right") {
        const [moveRow, moveCol] = beamDirections.get(currentBeam.direction)
        nextRow = currentRow + moveRow
        nextCol = currentCol + moveCol
        beams.push({ direction: currentBeam.direction, position: [nextRow, nextCol] })
      } else {
        beams.push({ direction: "left", position: [currentRow, currentCol - 1] })
        beams.push({ direction: "right", position: [currentRow, currentCol + 1] })
      }
    }
  }

  // start with beam entering [0,0] from the left
  // make beam bounce around or split depending on what it hits
  // set visited to true everywhere a beam travels

  // sum up and log the number of energized squares
  maxEnergized = Math.max(maxEnergized, getTrueCount(energized))
}

console.log("maxEnergized:", maxEnergized)
