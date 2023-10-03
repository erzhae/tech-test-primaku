import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import {Notes} from "@prisma/client";

describe('NotesService', () => {
  let service: NotesService;
  let notesData: Notes[] = [{
    "id": "c9e419e7-cb91-424a-9e19-139031dbaef7",
    "title": "Test 1",
    "content": "Test 1 Content",
    "createdAt": new Date(),
    "updatedAt": new Date()
  }]

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotesService],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  describe('findAll', () => {
    it('should return an array of notes', async () => {
      const result = [];
      jest.spyOn(notesService, 'findAll').mockImplementation(() => result);

      expect(await controller.findAll()).toBe(result);
    });
  });
});
