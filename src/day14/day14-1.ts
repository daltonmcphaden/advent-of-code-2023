import * as fs from "fs"

let input = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map(line => line.split(""))

console.log(input)

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    let row = i
    if (input[row][j] === "O") {
      while (row - 1 >= 0 && input[row - 1][j] === ".") {
        input[row - 1][j] = "O"
        input[row][j] = "."
        row--
      }
    }
  }
}
let res = 0
input.forEach((row, i) => {
  let zeroCount = 0
  row.forEach((col, j) => {
    if (col === "O") {
      zeroCount++
    }
  })
  res += zeroCount * (input.length - i)
})

console.log(input.map(line => line.join("")).join("\n"))
console.log(res)
