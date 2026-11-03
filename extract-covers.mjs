import { parseFile } from 'music-metadata'
import fs from 'node:fs/promises'
import path from 'node:path'

const musicDir = path.join(process.cwd(), 'public', 'music')
const coversDir = path.join(process.cwd(), 'public', 'covers')

await fs.mkdir(coversDir, { recursive: true })

async function extractCovers(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      await extractCovers(fullPath)
      continue
    }

    if (path.extname(entry.name).toLowerCase() !== '.mp3') continue

    try {
      const metadata = await parseFile(fullPath)
      const picture = metadata.common.picture?.[0]

      if (!picture) {
        console.log('No cover:', entry.name)
        continue
      }

      const artistFolder = path.basename(dir)
      const fileName = path.parse(entry.name).name
      const outputName = `${artistFolder}-${fileName}.jpg`
      const outputPath = path.join(coversDir, outputName)

      await fs.writeFile(outputPath, picture.data)
      console.log('Extracted:', outputName)
    } catch (error) {
      console.error('Error:', entry.name, error.message)
    }
  }
}

await extractCovers(musicDir)
console.log('Cover extraction finished!')