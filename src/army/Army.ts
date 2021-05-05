import { IArmyModifier } from './Modifiers'
import { IArmyUnit } from './Unit'

export class Army {
  public name: string
  public modifiers: IArmyModifier[] = []
  public units: IArmyUnit[] = []

  public getTotalHealth(): number {
    return this.units.reduce(
      (acc, unit) => (acc += unit.health * unit.count),
      0,
    )
  }

  public getTotalDamage(): number {
    return this.units.reduce(
      (acc, unit) => (acc += unit.damage * unit.count),
      0,
    )
  }

  public applyModifiers(): void {
    this.modifiers.forEach((modifier) => modifier.apply(this))
  }

  public getStats() {
    return {
      name: this.name,
      totalHealth: this.getTotalHealth(),
      totalDamage: this.getTotalDamage(),
      units: this.units,
      modifiers: this.modifiers,
    }
  }
}
