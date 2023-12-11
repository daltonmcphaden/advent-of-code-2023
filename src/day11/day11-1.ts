import * as fs from "fs"

let universe = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map(line => line.split(""))

for (let i = 0; i < universe.length; i++) {
  const currentLine = universe[i]
  if (!currentLine.includes("#")) {
    universe = [...universe.slice(0, i + 1), Array(universe.length).fill("."), ...universe.slice(i + 1)]
    i += 1
  }
}
for (let j = 0; j < universe[0].length; j++) {
  const column = universe.map(line => line[j])
  if (!column.includes("#")) {
    universe = universe.map(line => [...line.slice(0, j + 1), ".", ...line.slice(j + 1)])
    j += 1
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

console.log(num)

let res = 0
for (let n = 1; n <= num; n++) {
  for (let k = n + 1; k <= num; k++) {
    console.log(n, k)
    const [i1, j1] = coordMap.get(n)!
    const [i2, j2] = coordMap.get(k)!
    res += Math.abs(i1 - i2) + Math.abs(j1 - j2)
  }
}

console.log(res)
