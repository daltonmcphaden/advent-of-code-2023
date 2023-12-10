import * as fs from "fs"

const lines = fs.readFileSync("test.txt", "utf-8").split("\n")

type Coord = [number, number]

const pipeMap = new Map<string, [Coord, Coord]>()
pipeMap.set("|", [
  [-1, 0], // North
  [1, 0], // South
])
pipeMap.set("-", [
  [0, 1], // East
  [0, -1], // West
])
pipeMap.set("L", [
  [-1, 0], // North
  [0, 1], // East
])
pipeMap.set("J", [
  [-1, 0], // North
  [0, -1], // West
])
pipeMap.set("7", [
  [1, 0], // South
  [0, -1], // West
])
pipeMap.set("F", [
  [1, 0], // South
  [0, 1], // East
])

let s: Coord | undefined = undefined
while (!s) {
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "S") {
        s = [i, j]
        break
      }
    }
  }
}

const getConnectedPipes = (coord: Coord): Coord[] => {
  const [x, y] = coord

  const adjacentSquares: Coord[] = [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ]

  let connectedPipes: Coord[] = []

  for (const [x, y] of adjacentSquares) {
    if (x < 0 || x >= lines.length || y < 0 || y >= lines[x].length) {
      continue
    }
    const pipe = lines[x][y]
    if (!pipeMap.has(pipe)) {
      continue
    }
    const [direction1, direction2] = pipeMap.get(pipe)!
    const newCoord1: Coord = [x + direction1[0], y + direction1[1]]
    const newCoord2: Coord = [x + direction2[0], y + direction2[1]]
    if (newCoord1[0] === coord[0] && newCoord1[1] === coord[1]) {
      connectedPipes.push([x, y])
    } else if (newCoord2[0] === coord[0] && newCoord2[1] === coord[1]) {
      connectedPipes.push([x, y])
    }
  }

  return connectedPipes
}

const connectedPipes = getConnectedPipes(s)
const visited: number[][] = lines.map(line => line.split("").map(() => 0))
visited[s[0]][s[1]] = 1
const queue = [connectedPipes[0]]
let pipeCount = 1
while (queue.length > 0) {
  const coord = queue.shift()!
  if (visited[coord[0]][coord[1]] === 1) {
    continue
  }
  visited[coord[0]][coord[1]] = 1
  pipeCount += 1

  const [x, y] = coord
  if (!pipeMap.has(lines[x][y])) {
    continue
  }
  const [direction1, direction2] = pipeMap.get(lines[x][y])!
  const newCoord1: Coord = [x + direction1[0], y + direction1[1]]
  const newCoord2: Coord = [x + direction2[0], y + direction2[1]]
  if (!visited[newCoord1[0]][newCoord1[1]]) {
    queue.push(newCoord1)
  }
  if (!visited[newCoord2[0]][newCoord2[1]]) {
    queue.push(newCoord2)
  }
}

const flooded: number[][] = lines.map(line => line.split("").map(() => 0))

for (let i = 0; i < visited.length; i++) {
  for (let j = 0; j < visited[i].length; j++) {
    if (flooded[i][j] !== 0 || visited[i][j] === 1) {
      continue
    }
    console.log(`starting flood at ${i}, ${j}`)
    let isFloodContained = true
    const currentFlood: Coord[] = []
    // add coords to list because we don't know yet what their final value will be
    const currentFloodQueue: Coord[] = [[i, j]]
    while (currentFloodQueue.length > 0) {
      const currentFloodLocation = currentFloodQueue.shift()!
      const [x, y] = currentFloodLocation

      if (flooded[x][y] !== 0) {
        continue
      }
      if (visited[x][y] === 1) {
        continue
      }

      flooded[x][y] = 1
      currentFlood.push(currentFloodLocation)

      const adjacentSquares: Coord[] = [
        [x + 1, y],
        [x - 1, y],
        [x, y + 1],
        [x, y - 1],
      ]
      for (const [a, b] of adjacentSquares) {
        if (a < 0 || a >= lines.length || b < 0 || b >= lines[a].length) {
          isFloodContained = false
        } else {
          currentFloodQueue.push([a, b])
        }
      }
    }
    if (isFloodContained) {
      console.log(currentFlood)
      for (const [x, y] of currentFlood) {
        flooded[x][y] = 2
      }
    }
  }
}

let floodedCount = 0
for (let i = 0; i < flooded.length; i++) {
  for (let j = 0; j < flooded[i].length; j++) {
    if (flooded[i][j] === 2) {
      floodedCount += 1
    }
  }
}

console.log(floodedCount)
