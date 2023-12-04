import * as fs from "fs"

const lines = fs.readFileSync("input.txt", "utf-8").split("\n")

const matrix = lines.map(line => line.split(""))

interface Direction {
  direction: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
  rowShift: number
  colShift: number
}

const directions: Direction[] = [
  { direction: "N", rowShift: -1, colShift: 0 },
  { direction: "NE", rowShift: -1, colShift: 1 },
  { direction: "E", rowShift: 0, colShift: 1 },
  { direction: "SE", rowShift: 1, colShift: 1 },
  { direction: "S", rowShift: 1, colShift: 0 },
  { direction: "SW", rowShift: 1, colShift: -1 },
  { direction: "W", rowShift: 0, colShift: -1 },
  { direction: "NW", rowShift: -1, colShift: -1 },
]

const digits = new Set<string>(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])

const m = matrix.length
const n = matrix[0].length

let sum = 0

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    const current = matrix[i][j]
    if (current === "*") {
      const adjacentNumbers = getAdjacentNumbers(i, j)
      console.log(adjacentNumbers)
      if (adjacentNumbers.length === 2) {
        const gearRatio = adjacentNumbers[0] * adjacentNumbers[1]
        sum += gearRatio
      }
    }
  }
}

console.log(sum)

function isInArray(tuple: number[], allTuples: number[][]) {
  for (const tup of allTuples) {
    if (tuple[0] === tup[0] && tuple[1] === tup[1]) {
      return true
    }
  }
  return false
}

function getAdjacentNumbers(i, j) {
  const adjacentNumbers: number[] = []

  const visited: number[][] = []

  for (const direction of directions) {
    const newRow = i + direction.rowShift
    const newCol = j + direction.colShift
    console.log(direction)
    console.log(newRow, newCol)

    console.log(visited)
    if (isInArray([newRow, newCol], visited)) {
      continue
    }

    if (newRow >= 0 && newCol >= 0 && newRow < m && newCol < n) {
      const newPoint = matrix[newRow][newCol]
      console.log(newPoint)
      if (digits.has(newPoint)) {
        visited.push([newRow, newCol])
        let num = newPoint
        let newColLeft = newCol - 1
        while (newColLeft >= 0 && digits.has(matrix[newRow][newColLeft])) {
          num = matrix[newRow][newColLeft] + num
          visited.push([newRow, newColLeft])
          newColLeft -= 1
        }
        let newColRight = newCol + 1
        while (newColRight < n && digits.has(matrix[newRow][newColRight])) {
          num = num + matrix[newRow][newColRight]
          visited.push([newRow, newColRight])
          newColRight += 1
        }
        adjacentNumbers.push(parseInt(num))
      }
    }
  }

  return adjacentNumbers
}
