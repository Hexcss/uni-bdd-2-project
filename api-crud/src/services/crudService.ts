import Category from '../models/category';
import Recipe from '../models/recipe';
import Tag from '../models/tag';
import { Request, Response } from 'express';
import { escapeRegExp } from 'lodash';

const create = async (req: Request, res: Response, dataType: string) => {
  try {
    let newData = undefined;
    switch (dataType) {
      case 'Category': {
        newData = new Category(req.body);
        break;
      }
      case 'Recipe': {
        newData = new Recipe(req.body);
        break;
      }
      case 'Tag': {
        newData = new Tag(req.body);
        break;
      }
      default: {
        return;
      }
    }

    console.log(newData);

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAll = async (req: Request, res: Response, dataType: string) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skipIndex = (page - 1) * limit;
  const search = req.query.search as string;

  try {
    let filter = {};
    if (search) {
      const escapedSearch = escapeRegExp(search);
      filter = {
        name: { $regex: new RegExp(escapedSearch, 'i') },
      };
    }

    let gottenData = undefined;
    let totalCount = 0;

    switch (dataType) {
      case 'Category': {
        totalCount = await Category.countDocuments(filter);
        gottenData = await Category.find(filter)
          .limit(limit)
          .skip(skipIndex)
          .exec();
        break;
      }
      case 'Recipe': {
        totalCount = await Recipe.countDocuments(filter);
        gottenData = await Recipe.find(filter)
          .limit(limit)
          .skip(skipIndex)
          .exec();
        break;
      }
      case 'Tag': {
        totalCount = await Tag.countDocuments(filter);
        gottenData = await Tag.find(filter).limit(limit).skip(skipIndex).exec();
        break;
      }
    }

    res.json({ data: gottenData, totalCount });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getById = async (req: Request, res: Response, dataType: string) => {
  try {
    let foundData = undefined;
    switch (dataType) {
      case 'Category': {
        foundData = await Category.findOne({ id: req.params.id });
        break;
      }
      case 'Recipe': {
        foundData = await Recipe.findOne({ id: req.params.id });
        break;
      }
      case 'Tag': {
        foundData = await Tag.findOne({ id: req.params.id });
        break;
      }
    }

    if (!foundData) {
      return res.status(404).send({ message: 'Data not found' });
    }

    res.json(foundData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const update = async (req: Request, res: Response, dataType: string) => {
  try {
    const { id } = req.params;
    let updatedData = undefined;

    switch (dataType) {
      case 'Category': {
        updatedData = await Category.findOneAndUpdate({ id }, req.body, {
          new: true,
        });
        break;
      }
      case 'Recipe': {
        updatedData = await Recipe.findOneAndUpdate({ id }, req.body, {
          new: true,
        });
        break;
      }
      case 'Tag': {
        updatedData = await Tag.findOneAndUpdate({ id }, req.body, {
          new: true,
        });
        break;
      }
    }

    if (!updatedData) {
      return res.status(404).send({ message: 'Data not found' });
    }

    res.json(updatedData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteById = async (req: Request, res: Response, dataType: string) => {
  try {
    const { id } = req.params;
    let deletedData = undefined;

    switch (dataType) {
      case 'Category': {
        deletedData = await Category.findOneAndDelete({ id });
        break;
      }
      case 'Recipe': {
        deletedData = await Recipe.findOneAndDelete({ id });
        break;
      }
      case 'Tag': {
        deletedData = await Tag.findOneAndDelete({ id });
        break;
      }
    }

    if (!deletedData) {
      return res.status(404).send({ message: 'Data not found' });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const CrudServices = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};

export default CrudServices;
