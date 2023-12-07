import * as fs from "fs"

const cards = fs.readFileSync("input.txt", "utf-8").split("\n")

let cardScore = 0

for (const card of cards) {
  let [winningNumbers, yourNumbers] = card.split("|")

  winningNumbers = winningNumbers.trim()
  winningNumbers = winningNumbers.split(":")[1].trim()
  yourNumbers = yourNumbers.trim()

  let rowScore = 0
  const winningNumbersSet = new Set<number>()
  let winningNumbersArray = winningNumbers
    .split(" ")
    .filter(num => num.length > 0)
    .forEach(num => winningNumbersSet.add(parseInt(num)))

  let yourNumbersArray = yourNumbers
    .split(" ")
    .filter(num => num.length > 0)
    .forEach(num => {
      if (winningNumbersSet.has(parseInt(num))) {
        rowScore = rowScore ? rowScore * 2 : 1
      }
    })

  cardScore += rowScore
}
console.log(cardScore)
