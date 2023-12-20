import * as fs from "fs"

let [workflows, partRatings] = fs.readFileSync("input.txt", "utf-8").split("\n\n")

interface Part {
  x: number
  m: number
  a: number
  s: number
}

interface Rule {
  partRating: "x" | "m" | "a" | "s"
  operator: "<" | ">"
}

const nameToRuleMap: { [name: string]: string } = {}
for (const workflow of workflows.split("\n")) {
  const [name, rules] = workflow.split("{")

  nameToRuleMap[name] = rules.slice(0, -1)
}
console.log(nameToRuleMap)

const acceptedParts: Part[] = []
for (const partRating of partRatings.split("\n")) {
  const partArr = partRating
    .slice(1, -1)
    .split(",")
    .map(part => parseInt(part.split("=")[1]))

  const part: Part = {
    x: partArr[0],
    m: partArr[1],
    a: partArr[2],
    s: partArr[3],
  }
  console.log(part)

  let currentWorkflow = nameToRuleMap["in"]
  while (currentWorkflow !== "DONE") {
    console.log(currentWorkflow)
    const rules = currentWorkflow.split(",")
    for (const rule of rules) {
      if (rule === "R") {
        currentWorkflow = "DONE"
        break
      } else if (rule === "A") {
        acceptedParts.push(part)
        currentWorkflow = "DONE"
        break
      } else if (rule.includes("<") || rule.includes(">")) {
        const [check, destination] = rule.split(":")
        const category = check[0]
        const operator = check[1]
        const value = parseInt(check.slice(2))
        if (operator === "<") {
          if (part[category] < value) {
            if (destination === "A") {
              acceptedParts.push(part)
              currentWorkflow = "DONE"
              break
            } else if (destination === "R") {
              currentWorkflow = "DONE"
              break
            } else {
              currentWorkflow = nameToRuleMap[destination]
              break
            }
          }
        } else if (operator === ">") {
          if (part[category] > value) {
            if (destination === "A") {
              acceptedParts.push(part)
              currentWorkflow = "DONE"
              break
            } else if (destination === "R") {
              currentWorkflow = "DONE"
              break
            } else {
              currentWorkflow = nameToRuleMap[destination]
              break
            }
          }
        } else {
          console.error("Invalid operator")
        }
      } else {
        currentWorkflow = nameToRuleMap[rule]
      }
    }
  }
}

console.log(acceptedParts)
let res = 0
for (const part of acceptedParts) {
  res += part.x
  res += part.m
  res += part.a
  res += part.s
}
console.log(res)
