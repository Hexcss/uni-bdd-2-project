import Category from '../models/category';
import Recipe from '../models/recipe';
import Tag from '../models/tag';
import { Request, Response } from 'express';

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
    }

    const savedData = await newData.save();
    res.status(201).json(savedData);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAll = async (req: Request, res: Response, dataType: string) => {
  try {
    let gottenData = undefined;
    switch (dataType) {
      case 'Category': {
        gottenData = await Category.find();
        break;
      }
      case 'Recipe': {
        const query: { category_id?: string } = {};
        if (req.query.category) {
          query.category_id = req.query.category as string;
        }
        gottenData = await Recipe.find(query);
        break;
      }
      case 'Tag': {
        gottenData = await Tag.find();
        break;
      }
    }

    res.json(gottenData);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const getById = async (req: Request, res: Response, dataType: string) => {
  try {
    let foundData = undefined;
    switch (dataType) {
      case 'Category': {
        foundData = await Category.findById(req.params.id);
        break;
      }
      case 'Recipe': {
        foundData = await Recipe.findById(req.params.id);
        break;
      }
      case 'Tag': {
        foundData = await Tag.findById(req.params.id);
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
