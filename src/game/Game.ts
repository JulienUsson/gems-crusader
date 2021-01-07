import random from 'lodash/random'
import range from 'lodash/range'

export type Gem = 'RED' | 'BLUE' | 'GREEN' | 'YELLOW'
export type Grid = Gem[][]

const gems: Gem[] = ['RED', 'BLUE', 'GREEN', 'YELLOW']

export default class Game {
  cols: number
  rows: number
  grid: Grid

  constructor(rows: number, cols: number) {
    this.cols = cols
    this.rows = rows
    this.grid = []
    range(rows).map((row) =>
      range(cols).forEach((col) => {
        if (!this.grid[col]) {
          this.grid[col] = []
        }
        this.grid[col][row] = gems[random(0, gems.length)]
      }),
    )
  }
}
