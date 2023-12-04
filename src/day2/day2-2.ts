import * as fs from "fs"

const games = fs.readFileSync("input.txt", "utf-8").split("\n")
console.log(games)

let powerSum = 0

for (const game of games) {
  const [_, rest] = game.split(":")
  const colorToMaxMap = new Map<string, number>()

  const pulls = rest.trim().split(";")
  for (const pull of pulls) {
    const colorPulls = pull.split(",")
    for (const colorPull of colorPulls) {
      const [amount, color] = colorPull.trim().split(" ")
      if (!colorToMaxMap.get(color)) {
        colorToMaxMap.set(color, parseInt(amount))
      } else {
        colorToMaxMap.set(color, Math.max(colorToMaxMap.get(color)!, parseInt(amount)))
      }
    }
  }

  let power = 1
  for (const amount of colorToMaxMap.values()) {
    power *= amount
  }

  powerSum += power
}

console.log(powerSum)
