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

const newPatterns = []
for (const pattern of patterns) {
  let p = 0
  newPatterns.push([])
  const lines = pattern.split("\n").map(line => line.split(""))
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      const linesCopy = lines.map(innerArray => [...innerArray])
      linesCopy[i][j] = linesCopy[i][j] === "#" ? "." : "#"
      const newPat = linesCopy.map(line => line.join("")).join("\n")
      newPatterns[p].push(newPat)
    }
  }
  p += 1
}

console.log(newPatterns.length)

let res = 0
for (const patternGroup of newPatterns) {
  console.log("pattern group here")

  let isFound = false
  for (const pattern of patternGroup) {
    if (isFound) {
      break
    }
    const lines = pattern.split("\n")

    //   console.log(lines)
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
        isFound = true

        console.log(`isRowMirror ${isRowMirror} between rows with index ${slot} and ${slot + 1}`)
        res += (slot + 1) * 100
        break
      }
    }
    if (isFound) {
      break
    }

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
        break
      }
    }
  }
}

console.log(res)
