import * as fs from "fs"

const words = fs.readFileSync("input.txt", "utf-8").split("\n")
console.log(words)

const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
const letterDigits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const letterDigitsToDigitMap = new Map<string, string>()
for (let i = 0; i < digits.length; i++) {
  letterDigitsToDigitMap.set(letterDigits[i], digits[i])
}

const nums: number[] = []
let result = 0

for (const word of words) {
  let leftDigit: string | undefined
  let rightDigit: string | undefined
  for (let i = 0; i < word.length; i++) {
    if (digits.includes(word[i])) {
      leftDigit = leftDigit || word[i]
    }
    for (const [letterDigit, digit] of letterDigitsToDigitMap.entries()) {
      if (word.slice(i, i + letterDigit.length) === letterDigit) {
        leftDigit = leftDigit || digit
      }
    }

    if (digits.includes(word[word.length - 1 - i])) {
      rightDigit = rightDigit || word[word.length - 1 - i]
    }
    for (const [letterDigit, digit] of letterDigitsToDigitMap.entries()) {
      const start = word.length - i - letterDigit.length
      const end = word.length - i
      if (word.slice(start, end) === letterDigit) {
        rightDigit = rightDigit || digit
      }
    }
    if (leftDigit && rightDigit) {
      break
    }
  }
  const num = parseInt(`${leftDigit}${rightDigit}`)
  console.log(num)
  nums.push(num)
}

for (const num of nums) {
  result += num
}
console.log(result)
