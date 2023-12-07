import * as fs from "fs"

const [times, distances] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map(line => {
    return line
      .split(":")[1]
      .trim()
      .split(" ")
      .filter(x => x !== "")
      .map(x => parseInt(x))
  })

console.log(times)
console.log(distances)

let res = 1
for (let i = 0; i < times.length; i++) {
  let waysToWin = 0
  for (let waitTime = 0; waitTime < times[i]; waitTime++) {
    let speed = waitTime
    const distance = speed * (times[i] - waitTime)
    if (distance > distances[i]) {
      waysToWin += 1
    }
  }
  res *= waysToWin
  console.log(waysToWin)
}

console.log(res)
