import { Test } from '@nestjs/testing'
import { ArmyQueryParams } from '../DTOs/ArmyQueryParams'
import { ArmyController } from './army.controller'
import { ArmyService } from './army.service'

describe('ArmyController', () => {
  let armyController: ArmyController

  beforeEach(async () => {
    const app = await Test.createTestingModule({
      controllers: [ArmyController],
      providers: [ArmyService],
    }).compile()

    armyController = app.get(ArmyController)
  })

  describe('army-controller-test', () => {
    it('Should work', () => {
      const queryParams = new ArmyQueryParams()
      queryParams.army1 = 50
      queryParams.army2 = 25

      expect(armyController.getBattleResult(queryParams)).toBeTruthy()
    })

    it('Should break', () => {
      const queryParams = new ArmyQueryParams()
      queryParams.army1 = -50
      queryParams.army2 = 25

      expect(() => armyController.getBattleResult(queryParams)).toThrow()
    })
  })
})
