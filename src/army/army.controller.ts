import { Controller, Get, Query, Render } from '@nestjs/common'
import { ArmyQueryParams } from '../DTOs/ArmyQueryParams'
import { ArmyService } from './army.service'

@Controller()
export class ArmyController {
  constructor(private armyService: ArmyService) {}

  @Get()
  @Render('army')
  getBattleResult(@Query() params: ArmyQueryParams) {
    const army1 = this.armyService.createArmy('Army 1', params.army1)
    const army2 = this.armyService.createArmy('Army 2', params.army2)

    return this.armyService.resolveBattle(army1, army2)
  }
}
