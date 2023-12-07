import * as fs from "fs"

const input = fs.readFileSync("input.txt", "utf-8").split("\n\n")
const seeds = [...input[0].matchAll(/\d+/g)].map(Number)
type NumFunc = (a: number) => number
const compose1 = (f: NumFunc, g: NumFunc) => (n: number) => {
  const r = f(n)
  return r === n ? g(n) : r
}
const compose2 = (f: NumFunc, g: NumFunc) => (n: number) => g(f(n))

const M = input.slice(1).map(s =>
  s
    .split("\n")
    .slice(1)
    .map(m => m.split(" ").map(Number))
)

const findLoc = M.map(ranges =>
  ranges
    .map(([dest, src, len]) => (n: number) => {
      if (n >= src && n <= src + len - 1) {
        return dest + (n - src)
      }
      return n
    })
    .reduce(compose1)
).reduce(compose2)

console.log("A", Math.min(...seeds.map(findLoc)))

const findSeed = [...M]
  .reverse()
  .map(ranges =>
    ranges
      .map(([dest, src, len]) => (n: number) => {
        if (n >= dest && n <= dest + len - 1) {
          return src + (n - dest)
        }
        return n
      })
      .reduce(compose1)
  )
  .reduce(compose2)

const seedsRange = seeds
  .map((n, i) => {
    if (i % 2 == 0) return []
    return [seeds[i - 1], seeds[i - 1] + n - 1]
  })
  .filter(a => a.length)

const t = performance.now()
let loc = 0
while (true) {
  const seed = findSeed(loc)
  if (seedsRange.some(([from, to]) => seed >= from && seed <= to)) {
    console.log("B", loc)
    console.log(`took ${performance.now() - t} ms`)
    break
  }
  loc++
}
