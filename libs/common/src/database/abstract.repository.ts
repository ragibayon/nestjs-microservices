import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
import { Logger, NotFoundException } from '@nestjs/common';

export abstract class AbstractRepository<Document extends AbstractDocument> {
  protected abstract readonly logger: Logger;
  constructor(protected readonly model: Model<Document>) {}

  async create(document: Omit<Document, '_id'>): Promise<Document> {
    const createdDocument = new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await createdDocument.save()).toJSON() as unknown as Document;
  }

  async find(filterQuery: FilterQuery<Document>): Promise<Document[]> {
    return await this.model.find(filterQuery).lean<Document[]>(true);
  }

  async findOne(filterQuery: FilterQuery<Document>): Promise<Document> {
    const document = await this.model.findOne(filterQuery).lean<Document>(true);
    if (!document) {
      this.logger.warn('Document was not found with filterQuery');
      this.logger.warn(`filterQuery: ${JSON.stringify(filterQuery)} `);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<Document>,
    updateQuery: UpdateQuery<Document>,
  ): Promise<Document> {
    const document = await this.model
      .findOneAndUpdate(filterQuery, updateQuery, {
        new: true,
      })
      .lean<Document>(true);
    if (!document) {
      this.logger.warn('Document was not found with filterQuery');
      this.logger.warn(`filterQuery: ${JSON.stringify(filterQuery)} `);
      throw new NotFoundException('Document was not found');
    }
    return document;
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<Document>,
  ): Promise<Document> {
    const deletedDocument = await this.model
      .findOneAndDelete(filterQuery)
      .lean<Document>(true);
    if (!deletedDocument) {
      this.logger.warn('Document was not found with filterQuery');
      this.logger.warn(`filterQuery: ${JSON.stringify(filterQuery)} `);
      throw new NotFoundException('Document was not found');
    }
    return deletedDocument;
  }
}
