import { Injectable, INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(private config:ConfigService){
    super(
      {
      datasources:{
        db:{
          url: config.get<string>('DATABASE_HOST')
        }
      }
    });
  }
  
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
    })
  }
}