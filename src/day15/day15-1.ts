import * as fs from "fs"

let strings = fs.readFileSync("input.txt", "utf-8").split(",")

let res = 0
for (const str of strings) {
  const hashVal = calculateHash(str)
  res += hashVal
  console.log(`String: ${str} Hash: ${hashVal}`)
  console.log(str)
}

console.log(res)
function calculateHash(str: string) {
  let currentValue = 0
  for (let i = 0; i < str.length; i++) {
    const asciiVal = str.charCodeAt(i)
    currentValue += asciiVal
    currentValue *= 17
    currentValue = currentValue % 256
  }
  return currentValue
}
