import { Injectable, Logger } from '@nestjs/common'
import { assert } from '../utils/utils'
import { Army } from './Army'
import { ArmyBuilder } from './ArmyBuilder'
import { ArmyModifiers } from './Modifiers'
import { ArmyUnits } from './Unit'

@Injectable()
export class ArmyService {
  private readonly _logger = new Logger(ArmyService.name)

  public createArmy(name: string, numberOfUnits: number): Army {
    assert(numberOfUnits > 0, 'Number of units must be greater then 0')

    this._logger.debug('Creating army')

    return new ArmyBuilder()
      .withName(name)
      .withUnit(new ArmyUnits.Villager().withCount(numberOfUnits))
      .withRandomModifier(0.2, new ArmyModifiers.Earthquake())
      .withRandomModifier(0.2, new ArmyModifiers.LowMorale())
      .withRandomModifier(0.2, new ArmyModifiers.Disease())
      .withRandom(0.2, (builder) =>
        builder.withUnit(new ArmyUnits.General().withCount(1)),
      )
      .withRandom(0.1, (builder) =>
        builder.withUnit(new ArmyUnits.Dragon().withCount(1)),
      )
      .build()
  }

  public resolveBattle(army1: Army, army2: Army) {
    this._logger.debug('Resolving battle')
    army1.applyModifiers()
    army2.applyModifiers()

    const army1Stats = army1.getStats()
    const army2Stats = army2.getStats()

    const winner = (() => {
      let army1Health = army1Stats.totalHealth
      let army2Health = army2Stats.totalHealth

      while (army1Health > 0 && army2Health > 0) {
        army2Health -= army1Stats.totalDamage

        if (army2Health <= 0) return army1

        army1Health -= army2Stats.totalDamage
      }

      return army2
    })()

    this._logger.debug(`Winner : ${winner.name}`)

    return {
      winner: winner.name,
      army1Stats,
      army2Stats,
    }
  }
}
