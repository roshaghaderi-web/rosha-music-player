import fs from 'node:fs/promises'
import path from 'node:path'

const root = process.cwd()

const candidates = [
  'data/song.js',
  'data/song.jsx',
  'data/song.ts',
  'data/song.tsx',
  'src/data/song.js',
  'src/data/song.jsx',
  'src/data/song.ts',
  'src/data/song.tsx',
]

let songFile = null

for (const file of candidates) {
  try {
    await fs.access(path.join(root, file))
    songFile = path.join(root, file)
    break
  } catch {}
}

if (!songFile) {
  console.error('Song file not found. Check its location.')
  process.exit(1)
}

const original = await fs.readFile(songFile, 'utf8')
const backup = songFile + '.bak'

await fs.copyFile(songFile, backup)

let updated = 0
let missing = 0

const result = original.replace(/\{[^{}]*\}/g, (song) => {
  const srcMatch = song.match(/src:\s*['"]([^'"]+)['"]/)
  const coverMatch = song.match(/cover:\s*(['"])[^'"]*\1/)

  if (!srcMatch || !coverMatch) return song

  const parts = srcMatch[1].split('/')
  const artistFolder = parts[parts.length - 2]
  const audioName = path.parse(parts[parts.length - 1]).name
  const coverName = `${artistFolder}-${audioName}.jpg`
  const coverPath = path.join(root, 'public', 'covers', coverName)

  // Keep the default cover if no extracted image exists.
  // Check the exact filename before linking it.
  return song.replace(/cover:\s*(['"])[^'"]*\1/, (field) => {
    return field
  })
})

const finalResult = await (async () => {
  let text = result

  const blocks = [...text.matchAll(/\{[^{}]*\}/g)]

  for (const block of blocks.reverse()) {
    const song = block[0]
    const srcMatch = song.match(/src:\s*['"]([^'"]+)['"]/)
    const coverMatch = song.match(/cover:\s*(['"])[^'"]*\1/)

    if (!srcMatch || !coverMatch) continue

    const parts = srcMatch[1].split('/')
    const artistFolder = parts[parts.length - 2]
    const audioName = path.parse(parts[parts.length - 1]).name
    const coverName = `${artistFolder}-${audioName}.jpg`
    const coverPath = path.join(root, 'public', 'covers', coverName)

    try {
      await fs.access(coverPath)

      const newSong = song.replace(
        /cover:\s*(['"])[^'"]*\1/,
        `cover: '/covers/${coverName}'`
      )

      text =
        text.slice(0, block.index) +
        newSong +
        text.slice(block.index + song.length)

      updated++
    } catch {
      missing++
      console.log('No extracted cover:', audioName)
    }
  }

  return text
})()

await fs.writeFile(songFile, finalResult, 'utf8')

console.log('Song file:', path.relative(root, songFile))
console.log('Updated covers:', updated)
console.log('Songs without extracted covers:', missing)
console.log('Backup saved:', path.basename(backup))