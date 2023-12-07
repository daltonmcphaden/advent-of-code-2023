import * as fs from "fs"

const lines = fs.readFileSync("test.txt", "utf-8").split("\n\n")

const seedsLine = lines.shift()!

const seeds = seedsLine
  .split(":")[1]
  .trim()
  .split(" ")
  .map(s => parseInt(s))

const mappingFunctions: ((input: number) => number)[] = []

for (const line of lines) {
  const [items, ranges] = line.split(":")

  const [a, _, b] = items.split(" ")[0].split("-")
  console.log(a)
  console.log(b)

  const rangeList = ranges.split("\n").filter(s => s !== "")

  const destinationSourceLengthList: number[][] = []
  for (const range of rangeList) {
    const [destination, source, length] = range.split(" ").map(s => parseInt(s))
    destinationSourceLengthList.push([destination, source, length])
  }

  const func = (input: number): number => {
    for (const [destination, source, length] of destinationSourceLengthList) {
      if (input >= source && input < source + length) {
        return input + (destination - source)
      }
    }
    return input
  }
  mappingFunctions.push(func)
}

let result = 13
for (const func of mappingFunctions) {
  result = func(result)
}
console.log(result)

// let lowestResult
// for (const seed of seeds) {
//   let result = seed
//   for (const func of mappingFunctions) {
//     result = func(result)
//   }
//   if (!lowestResult || result < lowestResult) {
//     console.log(seed)
//     lowestResult = result
//   }
// }

// console.log(lowestResult)
