import * as fs from "fs"

const lines = fs.readFileSync("input.txt", "utf-8").split("\n")

const matrix = lines.map(line => line.split(""))

const digits = new Set<string>(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])

const m = matrix.length
const n = matrix[0].length

let sum = 0

for (let i = 0; i < m; i++) {
  for (let j = 0; j < n; j++) {
    const current = matrix[i][j]
    if (digits.has(current)) {
      const start = j
      while (digits.has(matrix[i][j])) {
        j += 1
      }
      const end = j

      console.log(matrix[i].slice(start, end))
      if (isNumberAdjacentToSymbol(start, end, i)) {
        sum += parseInt(matrix[i].slice(start, end).join(""))
      }
    }
  }
}

console.log(sum)

interface Direction {
  direction: "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW"
  rowShift: number
  colShift: number
}

function isNumberAdjacentToSymbol(start: number, end: number, row: number): boolean {
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
  let isAdjacent = false
  for (let x = start; x < end; x++) {
    for (const direction of directions) {
      const newRow = row + direction.rowShift
      const newCol = x + direction.colShift
      console.log(newRow)
      console.log(newCol)

      if (newRow > 0 && newCol > 0 && newRow < m && newCol < n) {
        const newPoint = matrix[newRow][newCol]
        if (newPoint !== "." && !digits.has(newPoint)) {
          return true
        }
      }
    }
    console.log(matrix[row][x])
  }

  return isAdjacent
}
