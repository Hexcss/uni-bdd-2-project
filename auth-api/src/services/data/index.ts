import { Document, Model } from 'mongoose';

export class MongoService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findOne(filter: object): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(
    filter: object,
    projection?: object | null,
    options?: object | null
  ): Promise<T[]> {
    return this.model.find(filter, projection, options).exec();
  }

  async create(doc: object): Promise<T> {
    const document = new this.model(doc);
    return document.save() as Promise<T>;
  }

  async update(filter: object, updateDoc: object): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, updateDoc, { new: true }).exec();
  }

  async delete(filter: object): Promise<{ deletedCount?: number } | null> {
    return this.model.deleteOne(filter).exec();
  }
}
