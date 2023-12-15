import * as fs from "fs"

let input = fs
  .readFileSync("test.txt", "utf-8")
  .split("\n")
  .map(line => line.split(""))

let results = []
for (let z = 0; z < 1_000; z++) {
  // north
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

  // west
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      let col = j
      if (input[i][col] === "O") {
        while (col - 1 >= 0 && input[i][col - 1] === ".") {
          input[i][col - 1] = "O"
          input[i][col] = "."
          col--
        }
      }
    }
  }

  // south
  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = 0; j < input[0].length; j++) {
      let row = i
      if (input[row][j] === "O") {
        while (row + 1 < input.length && input[row + 1][j] === ".") {
          input[row + 1][j] = "O"
          input[row][j] = "."
          row++
        }
      }
    }
  }

  // east
  for (let i = input.length - 1; i >= 0; i--) {
    for (let j = input[0].length - 1; j >= 0; j--) {
      let col = j
      if (input[i][col] === "O") {
        while (col + 1 < input[0].length && input[i][col + 1] === ".") {
          input[i][col + 1] = "O"
          input[i][col] = "."
          col++
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

  results.push(res)
}

console.log(results[results.length - 1])
const repeatedLoop = results.slice(-14)
console.log(`loop length is ${repeatedLoop.length}`)
console.log(results.slice(-14))

console.log(1_000_000_000 % repeatedLoop.length)
console.log(repeatedLoop[1_000_000_000 % repeatedLoop.length])
