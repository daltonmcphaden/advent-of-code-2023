import * as fs from "fs"

const lines = fs.readFileSync("input.txt", "utf-8").split("\n")

let res = 0
for (const line of lines) {
  const numbers = line.split(" ").map(n => parseInt(n))
  let rows = [numbers]
  let currentRow = rows[0]
  while (currentRow.some(n => n != 0)) {
    let newRow: number[] = []
    for (let i = 1; i < currentRow.length; i++) {
      newRow.push(currentRow[i] - currentRow[i - 1])
    }
    rows.push(newRow)
    currentRow = newRow
  }
  console.log(rows)
  for (let i = rows.length - 1; i >= 0; i--) {
    if (i == rows.length - 1) {
      rows[i].unshift(0)
    } else {
      let previewRowFirstValue = rows[i + 1][0]
      let currentRowFirstValue = rows[i][0]
      rows[i].unshift(currentRowFirstValue - previewRowFirstValue)
    }
  }
  console.log(rows)
  res += rows[0][0]

  console.log("\n\n")
}

console.log("res:", res)
