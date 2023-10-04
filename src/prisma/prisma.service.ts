import {INestApplication, Injectable, Logger, OnModuleDestroy, OnModuleInit} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  logger = new Logger(PrismaService.name)

  constructor() {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        }
      ]
    });
  }
  async onModuleInit() {
    await this.$connect()

    this.$on('query' as never, async (e: any) => {
      this.logger.debug(`(${e.duration}ms) ${e.query}`);
    });
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit' as never, async () => {
      await app.close();
    });
  }
}
