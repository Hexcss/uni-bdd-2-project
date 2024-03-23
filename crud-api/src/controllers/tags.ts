import Tag from '../models/tag';
import {Request, Response} from 'express';

const getAllTags = async (req: Request, res: Response): Promise<void> => {
    try {
      const tags = await Tag.find();
      res.json(tags);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  const createTag = async (req: Request, res: Response): Promise<void> => {
    try {
      const newTag = new Tag(req.body);
      const savedTag = await newTag.save();
      res.status(201).json(savedTag);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
  
  const getTagById = async (req: Request, res: Response): Promise<void> => {
    try {
      const tag = await Tag.findById(req.params.id);
      if (!tag) {
        return res.status(404).send({ message: 'Etiqueta no encontrada.' });
      }
      res.json(tag);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  const updateTag = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const updatedTag = await Tag.findOneAndUpdate({ id: id }, req.body, {
        new: true,
      });
      if (!updatedTag) {
        return res.status(404).send({ message: 'Tag no encontrado.' });
      }
      res.json(updatedTag);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  const deleteTag = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params; // Aquí 'id' es el identificador personalizado
      const deletedTag = await Tag.findOneAndDelete({ id: id });
      if (!deletedTag) {
        return res.status(404).send({ message: 'Tag no encontrado.' });
      }
      res.status(204).send(); // No content
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  const tagController = {
    getAllTags,
    createTag,
    getTagById,
    updateTag,
    deleteTag,
  }
  
  export default tagController;
  
  