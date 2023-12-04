const fs = require("fs")
const path = require("path")

function createDayFolderAndFiles(dayNumber) {
  const folderName = `../src/day${dayNumber}`
  const folderPath = path.join(__dirname, folderName)

  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath)
  }

  for (let i = 1; i <= 2; i++) {
    const fileName = `day${dayNumber}-${i}.ts`
    const filePath = path.join(folderPath, fileName)
    fs.writeFileSync(filePath, "// TypeScript content\n")
  }

  fs.writeFileSync(path.join(folderPath, "input.txt"), "your input")
  fs.writeFileSync(path.join(folderPath, "test.txt"), "test input")

  console.log(`Folder and files created for ${dayNumber}`)
}

const dayNumber = process.argv[2]
if (!dayNumber) {
  console.error("Please provide a day number")
  process.exit(1)
}
createDayFolderAndFiles(dayNumber)
