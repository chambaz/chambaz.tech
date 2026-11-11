// Classic B3/S23 on a fixed, wrapping grid. Rendering never changes the rules.
export function step(cells, width, height) {
  const next = new Uint8Array(cells.length)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      let neighbors = 0
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx || dy)
            neighbors +=
              cells[
                ((y + dy + height) % height) * width +
                  ((x + dx + width) % width)
              ]
        }
      }
      const i = y * width + x
      next[i] = Number(neighbors === 3 || (cells[i] === 1 && neighbors === 2))
    }
  }
  return next
}

export function seed(width, height, random = Math.random) {
  return Uint8Array.from({ length: width * height }, () =>
    Number(random() < 0.28),
  )
}

export function sameBoard(a, b) {
  return a.length === b.length && a.every((cell, i) => cell === b[i])
}
