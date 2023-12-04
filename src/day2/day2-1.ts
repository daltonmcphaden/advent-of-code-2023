import * as fs from "fs"

const games = fs.readFileSync("input.txt", "utf-8").split("\n")
console.log(games)

const colorToMaxMap = new Map<string, number>()
colorToMaxMap.set("red", 12)
colorToMaxMap.set("green", 13)
colorToMaxMap.set("blue", 14)

let gameIdSum = 0

for (const game of games) {
  const [gameIdString, rest] = game.split(":")
  const gameId = parseInt(gameIdString.split(" ")[1])

  let isWithinMax = true

  const pulls = rest.trim().split(";")
  for (const pull of pulls) {
    const colorPulls = pull.split(",")
    for (const colorPull of colorPulls) {
      const [amount, color] = colorPull.trim().split(" ")
      if (colorToMaxMap.get(color)! < parseInt(amount)) {
        isWithinMax = false
      }
    }
  }

  if (isWithinMax) {
    gameIdSum += gameId
  }
}

console.log(gameIdSum)

// only 12 red cubes, 13 green cubes, and 14 blue cubes
