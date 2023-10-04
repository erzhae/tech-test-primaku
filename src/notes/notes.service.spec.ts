import { Test, TestingModule } from '@nestjs/testing';
import { NotesService } from './notes.service';
import { Notes } from '@prisma/client';

import { v4 as uuid } from 'uuid';
import { PrismaService } from '../prisma/prisma.service';

const firstNoteUUID = uuid();
const firstNoteTitle = `Test 1`;
const firstNoteContent = `Test 1 Content`;
const firstNoteCreatedAt = new Date();
const firstNoteUpdatedAt = new Date();

const secondNoteUUID = uuid();

const noteArray: Notes[] = [
  {
    id: firstNoteUUID,
    title: firstNoteTitle,
    content: firstNoteContent,
    createdAt: firstNoteCreatedAt,
    updatedAt: firstNoteUpdatedAt,
  },
  {
    id: secondNoteUUID,
    title: 'Test 2',
    content: 'Test 2 Content',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

const oneNote = noteArray[0];
const oneNoteUpdated = {
  ...oneNote,
  title: 'Test 1 (Updated)',
  content: 'Test 1 Content (Updated)',
};

const fn = {
  notes: {
    findMany: jest.fn().mockResolvedValue(noteArray),
    findUnique: jest.fn().mockResolvedValue(oneNote),
    findFirst: jest.fn().mockResolvedValue(oneNote),
    create: jest.fn().mockReturnValue(oneNote),
    save: jest.fn(),
    update: jest.fn().mockResolvedValue(oneNoteUpdated),
    delete: jest.fn().mockResolvedValue(oneNote),
  },
};

describe('NotesService', () => {
  let service: NotesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotesService,
        {
          provide: PrismaService,
          useValue: fn,
        },
      ],
    }).compile();

    service = module.get<NotesService>(NotesService);
  });

  describe('getAll', () => {
    it('should return all notes', async () => {
      const getAll = await service.findAll();
      expect(getAll).toEqual(noteArray);
    });
  });

  describe('getOne', () => {
    it('should get a single note', async () => {
      const get = await service.findOne(firstNoteUUID);
      expect(get).toEqual(oneNote);
    });
  });

  describe('insertOne', () => {
    it('should successfully insert note', async () => {
      const insert = await service.create({
        id: firstNoteUUID,
        title: firstNoteTitle,
        content: firstNoteContent,
        createdAt: firstNoteCreatedAt,
        updatedAt: firstNoteUpdatedAt,
      });
      expect(insert).toEqual(oneNote);
    });
  });

  describe('updateOne', () => {
    it('should call the update method', async () => {
      const update = await service.update(firstNoteUUID, {
        title: 'Test 1 (Updated)',
        content: 'Test 1 Content (Updated)',
      });
      expect(update).toEqual(oneNoteUpdated);
    });
  });
});
