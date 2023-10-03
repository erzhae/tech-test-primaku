import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Notes, Prisma } from '@prisma/client';

@Injectable()
export class NotesService {
  constructor(private prisma: PrismaService) {}

  create(createNoteDto: Prisma.NotesCreateInput) {
    return this.prisma.notes.create({
      data: createNoteDto,
    });
  }

  findAll() {
    return this.prisma.notes.findMany();
  }

  findOne(id: string) {
    return this.prisma.notes.findUnique({
      where: {
        id: id,
      }
    })
  }

  update(id: string, updateNoteDto: Prisma.NotesUpdateInput) {
    return this.prisma.notes.update({
      where: {
        id: id
      },
      data: updateNoteDto
    });
  }

  remove(id: string) {
    return this.prisma.notes.delete({
      where: {
        id: id
      }
    })
  }
}
