import * as fs from "fs"

const lines = fs.readFileSync("test.txt", "utf-8").split("\n\n")

const seedsLine = lines.shift()!

const seeds = seedsLine
  .split(":")[1]
  .trim()
  .split(" ")
  .map(s => parseInt(s))

const intervals: number[][] = []
for (let i = 0; i < seeds.length; i += 2) {
  const [a, b] = [seeds[i], seeds[i + 1]]
  intervals.push([a, a + b])
}

console.log(intervals)

console.log(seeds)

const mappingFunctions: ((input: number) => number)[] = []

for (const line of lines.reverse()) {
  const [items, ranges] = line.split(":")

  //   const [a, _, b] = items.split(" ")[0].split("-")

  const rangeList = ranges.split("\n").filter(s => s !== "")

  const destinationSourceLengthList: number[][] = []
  for (const range of rangeList) {
    const [destination, source, length] = range.split(" ").map(s => parseInt(s))
    destinationSourceLengthList.push([destination, source, length])
  }

  const func = (input: number): number => {
    for (const [destination, source, length] of destinationSourceLengthList) {
      if (input >= destination && input < destination + length) {
        return input + (source - destination)
      }
    }
    return input
  }
  mappingFunctions.push(func)
}

let i = 0
let isFound = false
while (!isFound) {
  let result = i
  for (const func of mappingFunctions) {
    result = func(result)
  }
  for (const interval of intervals) {
    if (result >= interval[0] && result < interval[1]) {
      console.log(i)
      isFound = true
      break
    }
  }
  i += 1
}
