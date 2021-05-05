import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { ArmyModule } from './army/army.module'
import { AppConfigService } from './config/config.service'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      envFilePath: '.env.dev', // TODO configure for production
    }),
    ArmyModule,
  ],
  controllers: [],
  providers: [AppConfigService],
})
export class AppModule {}
