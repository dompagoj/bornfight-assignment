import { Test } from '@nestjs/testing'
import { ArmyService } from './army.service'
import { ArmyBuilder } from './ArmyBuilder'
import { ArmyModifiers } from './Modifiers'
import { ArmyUnits } from './Unit'

describe('ArmyService', () => {
  let armyService: ArmyService

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      providers: [ArmyService],
    }).compile()

    armyService = app.get(ArmyService)
  })

  describe('army battle resolution tests', () => {
    it('Army 1 should win', () => {
      const army1 = new ArmyBuilder()
        .withName('Army 1')
        .withUnit(new ArmyUnits.Villager().withCount(100))
        .build()

      const army2 = new ArmyBuilder()
        .withName('Army 2')
        .withUnit(new ArmyUnits.Villager().withCount(5))
        .build()

      const { winner } = armyService.resolveBattle(army1, army2)

      expect(winner).toEqual('Army 1')
    })

    it('Army 2 should win', () => {
      const army1 = new ArmyBuilder()
        .withName('Army 1')
        .withUnit(new ArmyUnits.Villager().withCount(5))
        .build()

      const army2 = new ArmyBuilder()
        .withName('Army 2')
        .withUnit(new ArmyUnits.Villager().withCount(100))
        .build()

      const { winner } = armyService.resolveBattle(army1, army2)

      expect(winner).toEqual('Army 2')
    })

    it('If its a tie, army 1 wins', () => {
      const army1 = new ArmyBuilder()
        .withName('Army 1')
        .withUnit(new ArmyUnits.Villager().withCount(25))
        .build()

      const army2 = new ArmyBuilder()
        .withName('Army 2')
        .withUnit(new ArmyUnits.Villager().withCount(25))
        .build()

      const { winner } = armyService.resolveBattle(army1, army2)

      expect(winner).toEqual('Army 1')
    })

    it('Army 1 should win (Dragon)', () => {
      const army1 = new ArmyBuilder()
        .withName('Army 1')
        .withUnit(new ArmyUnits.Villager().withCount(25))
        .withUnit(new ArmyUnits.Dragon().withCount(1))
        .build()

      const army2 = new ArmyBuilder()
        .withName('Army 2')
        .withUnit(new ArmyUnits.Villager().withCount(100))
        .build()

      const { winner } = armyService.resolveBattle(army1, army2)

      expect(winner).toEqual('Army 1')
    })

    it('Army 1 should win (General)', () => {
      const army1 = new ArmyBuilder()
        .withName('Army 1')
        .withUnit(new ArmyUnits.Villager().withCount(50))
        .withUnit(new ArmyUnits.General().withCount(10))
        .build()

      const army2 = new ArmyBuilder()
        .withName('Army 2')
        .withUnit(new ArmyUnits.Villager().withCount(100))
        .build()

      const { winner } = armyService.resolveBattle(army1, army2)

      expect(winner).toEqual('Army 1')
    })

    it('Army 2 should win (Modifiers)', () => {
      const army1 = new ArmyBuilder()
        .withName('Army 1')
        .withUnit(new ArmyUnits.Villager().withCount(100))
        .withModifier(new ArmyModifiers.Disease())
        .withModifier(new ArmyModifiers.Earthquake())
        .withModifier(new ArmyModifiers.LowMorale())
        .build()

      const army2 = new ArmyBuilder()
        .withName('Army 2')
        .withUnit(new ArmyUnits.Villager().withCount(25))
        .build()

      const { winner } = armyService.resolveBattle(army1, army2)

      expect(winner).toEqual('Army 2')
    })
  })
})
