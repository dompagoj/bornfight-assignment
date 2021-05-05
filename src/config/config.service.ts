import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AppConfigService {
  constructor(private config: ConfigService) {}

  get port() {
    return this.config.get('PORT') ?? 3000
  }
}
