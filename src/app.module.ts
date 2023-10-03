import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';
import {PrismaService} from "./prisma.service";
import {AppService} from "./app.service";

@Module({
  imports: [NotesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
