import { Injectable, Logger } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Note } from '../../schema';
import { AbstractRepository } from '../../schema/abstract-repo/abstract.repository';

@Injectable()
export class NoteRepository extends AbstractRepository<Note> {
  protected readonly logger = new Logger(NoteRepository.name);
  constructor(
    @InjectModel(Note.name)
    NoteRepositoryModel: Model<Note>,
    @InjectConnection() connection: Connection
  ) {
    super(NoteRepositoryModel, connection);
  }
}
