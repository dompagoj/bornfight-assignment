import { Army } from './Army'
import { IArmyModifier } from './Modifiers'

export interface IArmyUnit {
  health: number
  damage: number
  name: string
  count: number
}

export function unitAsModififer(unit: IArmyUnit) {
  return (unit as unknown) as IArmyModifier // Don't think there is a better way for this, type guards don't work
}

export function isUnitModifier(unit: IArmyUnit): boolean {
  return !!unitAsModififer(unit).apply
}

class BaseUnit {
  name = 'Unnamed Army unit'

  constructor(public count: number = 0) {}

  public withCount(count: number): this {
    this.count = count

    return this
  }
}

class Villager extends BaseUnit implements IArmyUnit {
  name = 'Villager'
  health = 25
  damage = 5
}

class General extends BaseUnit implements IArmyUnit, IArmyModifier {
  name = 'General'
  health = 90 // Buffs itself
  damage = 15

  private HEALTH_BUF = 10
  private DAMAGE_BUF = 2

  modifierDescription = `Buffs the damage of all units by ${this.DAMAGE_BUF} and health by ${this.HEALTH_BUF}`

  apply(army: Army): void {
    army.units.forEach((unit) => {
      unit.health += this.HEALTH_BUF
      unit.damage += this.DAMAGE_BUF
    })
  }
}

class Dragon extends BaseUnit implements IArmyUnit {
  name = 'Dragon'
  health = 2500
  damage = 250
}

export const ArmyUnits = {
  Villager,
  General,
  Dragon,
}
