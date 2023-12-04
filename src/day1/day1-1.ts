import * as fs from "fs"

const words = fs.readFileSync("input.txt", "utf-8").split("\n")
console.log(words)

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

const nums: number[] = []
let result = 0

for (const word of words) {
  let leftDigit: string | undefined
  let rightDigit: string | undefined
  for (let i = 0; i < word.length; i++) {
    if (digits.includes(word[i])) {
      leftDigit = leftDigit || word[i]
    }
    if (digits.includes(word[word.length - 1 - i])) {
      rightDigit = rightDigit || word[word.length - 1 - i]
    }
    if (leftDigit && rightDigit) {
      break
    }
  }
  const num = parseInt(`${leftDigit}${rightDigit}`)
  nums.push(num)
}

for (const num of nums) {
  result += num
}
console.log(result)
