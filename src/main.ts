import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { join } from 'path'
import { AppModule } from './app.module'
import { AppConfigService } from './config/config.service'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  )

  app.useStaticAssets(join(__dirname, '..', '..', 'public'))
  app.setBaseViewsDir(join(__dirname, '..', '..', 'views'))
  app.setViewEngine('hbs')

  await app.listen(app.get(AppConfigService).port)
}
bootstrap()
