import * as fs from "fs"

const hands = fs.readFileSync("input.txt", "utf-8").split("\n")

const handTypes = new Map<string, number>()
handTypes.set("five of a kind", 7)
handTypes.set("four of a kind", 6)
handTypes.set("full house", 5)
handTypes.set("three of a kind", 4)
handTypes.set("two pair", 3)
handTypes.set("one pair", 2)
handTypes.set("high card", 1)

const allCardMap = new Map<string, number>()
allCardMap.set("J", 1)
allCardMap.set("2", 2)
allCardMap.set("3", 3)
allCardMap.set("4", 4)
allCardMap.set("5", 5)
allCardMap.set("6", 6)
allCardMap.set("7", 7)
allCardMap.set("8", 8)
allCardMap.set("9", 9)
allCardMap.set("T", 10)
allCardMap.set("Q", 12)
allCardMap.set("K", 13)
allCardMap.set("A", 14)

const getHandType = (hand: string) => {
  if (hand.includes("J")) {
    let currentHandType = "high card"

    allCardMap.forEach((value, key) => {
      if (key === "J") {
        return
      }
      const newHand = hand.replace("J", key)
      const handType = getHandType(newHand)
      if (handTypes.get(handType)! > handTypes.get(currentHandType)!) {
        currentHandType = handType
      }
    })

    return currentHandType
  }

  const cardMap = new Map<string, number>()
  for (const card of hand) {
    if (cardMap.has(card)) {
      cardMap.set(card, cardMap.get(card)! + 1)
    } else {
      cardMap.set(card, 1)
    }
  }

  if (cardMap.size === 1) {
    return "five of a kind"
  }
  if (cardMap.size === 2) {
    if (cardMap.get(hand[0]) === 2 || cardMap.get(hand[0]) === 3) {
      return "full house"
    }
    return "four of a kind"
  }
  if (cardMap.size === 3) {
    if (cardMap.get(hand[0]) === 3 || cardMap.get(hand[1]) === 3 || cardMap.get(hand[2]) === 3) {
      return "three of a kind"
    }
    return "two pair"
  }
  if (cardMap.size === 4) {
    return "one pair"
  }
  return "high card"
}

const sortingFunction = (handA: string, handB: string) => {
  const handAType = handTypes.get(getHandType(handA.split(" ")[0]))!
  const handBType = handTypes.get(getHandType(handB.split(" ")[0]))!

  if (handAType === handBType) {
    for (let i = 0; i < handA.length; i++) {
      if (handA[i] === handB[i]) {
        continue
      }
      return allCardMap.get(handA[i])! - allCardMap.get(handB[i])!
    }
  }

  return handAType - handBType
}

const sortedHands = hands.sort(sortingFunction)

let res = 0
sortedHands.forEach((hand, index) => {
  res += (index + 1) * parseInt(hand.split(" ")[1]!)
})

console.log(sortedHands)
console.log(res)
