import * as fs from "fs"

const [instructions, connections] = fs.readFileSync("input.txt", "utf-8").split("\n\n")

interface DestinationPair {
  left: string
  right: string
}

const nodeMap = new Map<string, DestinationPair>()

let currentNodes: string[] = []
for (const conn of connections.split("\n")) {
  const [from, to] = conn.split(" = ")
  if (from[from.length - 1] === "A") {
    currentNodes.push(from)
  }
  const [d1, d2] = to.slice(1, to.length - 1).split(", ")
  nodeMap.set(from, { left: d1, right: d2 })
}

console.log(currentNodes)

const counts: number[] = []
for (let node of currentNodes) {
  let nodes = [node]
  let count = 0
  while (true) {
    const currentInstruction = instructions[count % instructions.length]
    if (nodes.every(node => node[node.length - 1] === "Z")) {
      break
    }

    nodes = nodes.map(node => (currentInstruction === "R" ? nodeMap.get(node)!.right : nodeMap.get(node)!.left))

    count += 1
  }
  counts.push(count)
}

for (const count of counts) {
  console.log(count)
}
