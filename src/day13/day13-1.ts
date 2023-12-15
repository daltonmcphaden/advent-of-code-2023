import * as fs from "fs"

let patterns = fs.readFileSync("input.txt", "utf-8").split("\n\n")

function transpose(mat) {
  // Create a new matrix with dimensions swapped
  let newMat = []
  for (let i = 0; i < mat[0].length; i++) {
    newMat.push([])
    for (let j = 0; j < mat.length; j++) {
      newMat[i].push(mat[j][i])
    }
  }

  return newMat
}

let res = 0
for (const pattern of patterns) {
  const lines = pattern.split("\n")
  console.log(lines)
  for (let slot = 0; slot < lines.length - 1; slot++) {
    let left = slot
    let right = slot + 1
    let isRowMirror = true
    while (left >= 0 && right < lines.length) {
      if (lines[left] !== lines[right]) {
        isRowMirror = false
        break
      }
      left--
      right++
    }
    if (isRowMirror) {
      console.log(`isRowMirror ${isRowMirror} between rows with index ${slot} and ${slot + 1}`)
      res += (slot + 1) * 100
    }
  }

  console.log(lines.length)
  console.log(lines[0].length)

  let transposedPattern = transpose(lines.map(line => line.split(""))).map(line => line.join(""))
  for (let slot = 0; slot < transposedPattern.length - 1; slot++) {
    let left = slot
    let right = slot + 1
    let isColMirror = true
    while (left >= 0 && right < transposedPattern.length) {
      if (transposedPattern[left] !== transposedPattern[right]) {
        isColMirror = false
        break
      }
      left--
      right++
    }
    if (isColMirror) {
      console.log(`isColMirror ${isColMirror} between cols with index ${slot} and ${slot + 1}`)
      res += slot + 1
    }
  }
}

console.log(res)
