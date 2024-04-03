import { Document, Model } from 'mongoose';
import { escapeRegExp } from 'lodash';

class MongoService<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async findOne(filter: object): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(
    filter: object = {},
    page: number = 1,
    limit: number = 10,
    projection?: object | null,
    options?: object | null,
    searchTerm?: string
  ): Promise<{ data: T[]; totalCount: number }> {
    const skipIndex = (page - 1) * limit;

    if (searchTerm && searchTerm.trim()) {
      const escapedSearchTerm = escapeRegExp(searchTerm.trim());
      filter = {
        ...filter,
        name: { $regex: new RegExp(escapedSearchTerm, 'i') },
      };
    }

    const data = await this.model
      .find(filter, projection, { ...options, limit, skip: skipIndex })
      .exec();

    const totalCount = await this.model.countDocuments(filter);

    return { data, totalCount };
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

export default MongoService;
