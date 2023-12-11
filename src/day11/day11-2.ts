import * as fs from "fs"

let universe = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map(line => line.split(""))

const emptyRows: number[] = []
for (let i = 0; i < universe.length; i++) {
  const currentLine = universe[i]
  if (!currentLine.includes("#")) {
    emptyRows.push(i)
  }
}

const emptyCols: number[] = []
for (let j = 0; j < universe[0].length; j++) {
  const column = universe.map(line => line[j])
  if (!column.includes("#")) {
    emptyCols.push(j)
  }
}

type Coord = [number, number]

const coordMap = new Map<number, Coord>()

let num = 0
for (let i = 0; i < universe.length; i++) {
  for (let j = 0; j < universe[0].length; j++) {
    if (universe[i][j] === "#") {
      num += 1
      universe[i][j] = num.toString()
      coordMap.set(num, [i, j])
    }
  }
}

let res = 0
for (let n = 1; n <= num; n++) {
  for (let k = n + 1; k <= num; k++) {
    const [i1, j1] = coordMap.get(n)!
    const [i2, j2] = coordMap.get(k)!

    const [iMin, iMax] = [i1, i2].sort((a, b) => a - b)
    const [jMin, jMax] = [j1, j2].sort((a, b) => a - b)

    let emptyRowsPassed = 0
    for (const emptyRow of emptyRows) {
      if (emptyRow > iMin && emptyRow < iMax) {
        emptyRowsPassed += 1
      }
    }

    let emptyColsPassed = 0
    for (const emptyCol of emptyCols) {
      if (emptyCol > jMin && emptyCol < jMax) {
        console.log(`empty col ${emptyCol} passed when traversing from ${n} to ${k}`)

        emptyColsPassed += 1
      }
    }
    const factor = 1_000_000
    const distanceX = iMax - iMin + emptyRowsPassed * factor + emptyRowsPassed * -1 // + number of times an empty row is passed x factor
    const distanceY = jMax - jMin + emptyColsPassed * factor + emptyColsPassed * -1 // + number of times an empty col is passed x factor
    res += distanceX + distanceY
  }
}

console.log(res)
