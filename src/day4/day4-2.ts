import * as fs from "fs"

const cards = fs.readFileSync("input.txt", "utf-8").split("\n")

let res = 0

const cardCount: number[] = []
for (let i = 0; i < cards.length; i++) {
  console.log(cardCount)
  if (cardCount[i]) {
    cardCount[i] += 1
  } else {
    cardCount.push(1)
  }

  let [winningNumbers, yourNumbers] = cards[i].split("|")

  winningNumbers = winningNumbers.trim()
  winningNumbers = winningNumbers.split(":")[1].trim()
  yourNumbers = yourNumbers.trim()

  const winningNumbersSet = new Set<number>()
  winningNumbers
    .split(" ")
    .filter(num => num.length > 0)
    .forEach(num => winningNumbersSet.add(parseInt(num)))

  // loop somewhere here for number of cards, not just once

  let winCount = 0
  yourNumbers
    .split(" ")
    .filter(num => num.length > 0)
    .forEach(num => {
      if (winningNumbersSet.has(parseInt(num))) {
        winCount += 1
      }
    })

  for (let k = 0; k < cardCount[i]; k++) {
    for (let j = 1; j <= winCount; j++) {
      if (cardCount[i + j]) {
        cardCount[i + j] += 1
      } else {
        cardCount.push(1)
      }
    }
  }

  res += cardCount[i]
}

console.log(res)
