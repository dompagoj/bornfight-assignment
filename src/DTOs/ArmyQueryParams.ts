import { Type } from 'class-transformer'
import { IsNumber, Min } from 'class-validator'

export class ArmyQueryParams {
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  army1: number

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  army2: number
}
