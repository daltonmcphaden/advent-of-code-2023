import * as fs from "fs"

let rows = fs.readFileSync("test.txt", "utf-8").split("\n")

type Alternative = [string[], number[]]

let totalCount = 0
for (const row of rows) {
  const locs = row.split(" ")[0].split("")
  const contGroups = row
    .split(" ")[1]
    .split(",")
    .map(x => parseInt(x))

  let nextAlternatives: Alternative[] = [[locs, contGroups]]
  let currentAlternatives: Alternative[] = []

  for (let i = 0; i < locs.length; i++) {
    console.log(i)
    currentAlternatives = nextAlternatives
    nextAlternatives = []
    while (currentAlternatives.length > 0) {
      //   if (i == 1) {
      //     console.log("currentAlternatives", currentAlternatives)
      //   }
      const alternative = currentAlternatives.pop()!
      const locations = alternative[0]
      //   console.log(locations.join(""))
      const contiguousGroups = alternative[1]

      if (locations[i] === "." || locations[i] === "#") {
        console.log(`skipping ${i}`)
        nextAlternatives.push([locations, contiguousGroups])
        continue
      }
      // check if a continuous group can fit here
      // if so, place it, and continue with both options (with and without the group placed there)
      const nextGroup = contiguousGroups[0]
      let canPlaceNextGroupHere = true
      for (let j = 0; j < nextGroup; j++) {
        if (locations[i + j] === ".") {
          console.log(`1 cant place group ${nextGroup} at ${i}`)
          canPlaceNextGroupHere = false
        }
      }
      if (locations[i - 1] === "#") {
        console.log(`2 cant place group ${nextGroup} at ${i}`)
        canPlaceNextGroupHere = false
      }
      if (locations[i + nextGroup] === "#") {
        console.log(`3 cant place group ${nextGroup} at ${i}`)
        canPlaceNextGroupHere = false
      }

      nextAlternatives.push([locations, contiguousGroups])
      if (canPlaceNextGroupHere) {
        const locationsCopy = [...locations]
        // place it
        for (let j = 0; j < nextGroup; j++) {
          locationsCopy[i + j] = "#"
        }
        nextAlternatives.push([locationsCopy, contiguousGroups.slice(1)])
      }
    }
  }
  let count = 0
  console.log("nextAlternatives", nextAlternatives)
  for (const alternative of nextAlternatives) {
    if (alternative[1].length === 0) {
      count += 1
    }
  }
  totalCount += count
  console.log(count)
}

// console.log(totalCount)
