import * as fs from "fs"

const [time, distance] = fs
  .readFileSync("input.txt", "utf-8")
  .split("\n")
  .map(line => {
    return parseInt(
      line
        .split(":")[1]
        .trim()
        .split(" ")
        .filter(x => x !== "")
        .join("")
    )
  })

console.log(time)
console.log(distance)

let waysToWin = 0
for (let waitTime = 0; waitTime < time; waitTime++) {
  let speed = waitTime
  const raceDistance = speed * (time - waitTime)
  if (raceDistance > distance) {
    waysToWin += 1
  }
}

console.log(waysToWin)
