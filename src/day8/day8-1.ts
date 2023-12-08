import * as fs from "fs"

const [instructions, connections] = fs.readFileSync("input.txt", "utf-8").split("\n\n")

interface DestinationPair {
  left: string
  right: string
}

const nodeMap = new Map<string, DestinationPair>()

let currentNode = "AAA"
for (const conn of connections.split("\n")) {
  const [from, to] = conn.split(" = ")
  const [d1, d2] = to.slice(1, to.length - 1).split(", ")
  nodeMap.set(from, { left: d1, right: d2 })
}

console.log(nodeMap)

const instructionsLength = instructions.length
console.log(instructionsLength)
let count = 0
while (currentNode !== "ZZZ") {
  const currentInstruction = instructions[count % instructionsLength]
  if (currentInstruction === "R") {
    currentNode = nodeMap.get(currentNode)!.right
  } else if (currentInstruction === "L") {
    currentNode = nodeMap.get(currentNode)!.left
  }

  count += 1
}

console.log(count)
