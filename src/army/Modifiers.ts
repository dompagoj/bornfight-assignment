import { Army } from './Army'

export interface IArmyModifier {
  name: string
  modifierDescription?: string
  apply(army: Army): void
}

class Disease implements IArmyModifier {
  name = 'Disease'
  protected HEALTH_REDUCTION = 15
  modifierDescription = `Reduces the health of all units by ${this.HEALTH_REDUCTION}`

  apply(army: Army) {
    army.units.forEach((unit) => {
      if (unit.health <= this.HEALTH_REDUCTION) unit.health = 1
      else unit.health -= this.HEALTH_REDUCTION
    })
  }
}

class Earthquake extends Disease {
  name = 'Earthquake'
  HEALTH_REDUCTION = 20
  modifierDescription = `Reduces the health of all units by ${this.HEALTH_REDUCTION}`
}

class LowMorale implements IArmyModifier {
  name = 'Low morale'
  DAMAGE_REDUCTION = 5
  modifierDescription = `Reduces the damage of all units by ${this.DAMAGE_REDUCTION}`

  apply(army: Army) {
    army.units.forEach((unit) => {
      if (unit.damage <= this.DAMAGE_REDUCTION) unit.damage = 1
      else unit.damage -= this.DAMAGE_REDUCTION
    })
  }
}

export const ArmyModifiers = {
  Disease,
  Earthquake,
  LowMorale,
}
