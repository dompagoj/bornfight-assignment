import { Army } from './Army'
import { IArmyModifier } from './Modifiers'
import { assert, getRandom } from '../utils/utils'
import { IArmyUnit, isUnitModifier } from './Unit'
import { Logger } from '@nestjs/common'

function assertChance(chance: number) {
  assert(
    chance >= 0 && chance <= 1,
    'Chance has to be a number between 0 and 1',
  )
}

const logger = new Logger('Army builder')

export class ArmyBuilder {
  private _army = new Army()
  static logger = new Logger('Army builder')

  public withName(name: string): this {
    this._army.name = name

    return this
  }

  public withUnit(unit: IArmyUnit): this {
    this._army.units.push(unit)

    // Refer to Unit.ts / line 12
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (isUnitModifier(unit)) this.withModifier(unit)

    return this
  }

  public withRandom(chance: number, callback: (builder: this) => void): this {
    assertChance(chance)
    if (chance < getRandom(1)) return this

    logger.debug('With random triggered')
    callback(this)

    return this
  }

  public withModifier(modifier: IArmyModifier): this {
    this._army.modifiers.push(modifier)

    return this
  }

  public withRandomModifier(chance: number, modifier: IArmyModifier): this {
    assertChance(chance)
    if (chance < getRandom(1)) return this

    logger.debug(`Added random modifier ${modifier.name}`)

    return this.withModifier(modifier)
  }

  public build(): Army {
    return this._army // Not how it should be done but good enough for this demo
  }
}
