import * as fs from "fs"

let grid: number[][] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map(line => line.split("").map(char => parseInt(char)))

// DFS on 2d grid to find path of least resistance from top-left to bottom-right
// After finding a path, as DFS continues on other paths, if the path lenght is greater than the current shortest path, stop searching

type Coordinate = [number, number]
type Direction = "up" | "down" | "left" | "right"
const directions: Direction[] = ["up", "down", "left", "right"]
const directionOpposites: { [key in Direction]: Direction } = {
  up: "down",
  down: "up",
  left: "right",
  right: "left",
}
type Path = { coordinate: Coordinate; direction: Direction; directionStreak: number; length: number; visited: Set<string> }

const pathStack: Path[] = [
  { coordinate: [0, 1], direction: "right", directionStreak: 1, length: 0, visited: new Set<string>(["00"]) },
  { coordinate: [1, 0], direction: "down", directionStreak: 1, length: 0, visited: new Set<string>(["00"]) },
]

function getNewCoordinate(coordinate: Coordinate, direction: Direction): Coordinate {
  switch (direction) {
    case "up":
      return [coordinate[0] - 1, coordinate[1]]
    case "down":
      return [coordinate[0] + 1, coordinate[1]]
    case "left":
      return [coordinate[0], coordinate[1] - 1]
    case "right":
      return [coordinate[0], coordinate[1] + 1]
  }
}

let shortestPathLength = Infinity
let shortestPathVisisted: Set<string> = new Set()
let shortestDirectionStreak = 0
const allVisited: Map<string, number> = new Map() // don't do string concat, use object as key to be more efficient

while (pathStack.length > 0) {
  const { coordinate, direction, directionStreak, length, visited } = pathStack.pop()!

  if (visited.has(`${coordinate[0]}${coordinate[1]}`)) {
    continue
  } else {
    visited.add(`${coordinate[0]}${coordinate[1]}`)
  }

  // if we've already arrived at this point in any path (with same direction) and length is greater, don't continue
  if (allVisited.get(`${coordinate[0]}${coordinate[1]}${direction}`) < length) {
    continue
  } else {
    allVisited.set(`${coordinate[0]}${coordinate[1]}${direction}`, length)
  }

  const resistanceValue = grid[coordinate[0]][coordinate[1]]
  const newLength = length + resistanceValue
  if (newLength > shortestPathLength) {
    continue
  }

  // if reached end, do something...
  if (coordinate[0] === grid.length - 1 && coordinate[1] === grid[0].length - 1) {
    if (newLength < shortestPathLength) {
      console.log(`reached end with length ${newLength}`)
      shortestPathLength = newLength
      shortestPathVisisted = visited
      shortestDirectionStreak = directionStreak
    }
    continue
  }

  const oppositeDirection = directionOpposites[direction]
  for (const newDirection of directions) {
    if (newDirection !== oppositeDirection) {
      const newCoordinate = getNewCoordinate(coordinate, newDirection)

      if (newCoordinate[0] >= 0 && newCoordinate[0] < grid.length && newCoordinate[1] >= 0 && newCoordinate[1] < grid[0].length) {
        // don't naively add these three paths, add them such that the next shortest goes first
        if (newDirection !== direction) {
          pathStack.push({
            coordinate: newCoordinate,
            direction: newDirection,
            directionStreak: 1,
            length: newLength,
            visited: new Set(visited),
          })
        } else {
          if (directionStreak < 3) {
            pathStack.push({
              coordinate: newCoordinate,
              direction: newDirection,
              directionStreak: directionStreak + 1,
              length: newLength,
              visited: new Set(visited),
            })
          }
        }
      }
    }
  }
  pathStack.sort((a, b) => a.length - b.length)
}

console.log(`shortestPathLength: ${shortestPathLength}`)
shortestPathVisisted.forEach(coordinate => console.log(coordinate))

console.log(shortestDirectionStreak)
