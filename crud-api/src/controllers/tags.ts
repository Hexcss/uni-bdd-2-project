
import {Request, Response} from 'express';
import CrudServices from '../services/crudService';

const getAllTags = async (req: Request, res: Response): Promise<void> => {
    CrudServices.getAll(req, res, "Tag");
  }
  
  const createTag = async (req: Request, res: Response): Promise<void> => {
    CrudServices.create(req, res, "Tag");
  }
  
  const getTagById = async (req: Request, res: Response) => {
    CrudServices.getById(req, res, "Tag");
  }
  
  const updateTag = async (req: Request, res: Response) => {
    CrudServices.update(req, res, "Tag");
  }
  
  const deleteTag = async (req: Request, res: Response) => {
    CrudServices.deleteById(req, res, "Tag")
  }
  
  const tagController = {
    getAllTags,
    createTag,
    getTagById,
    updateTag,
    deleteTag,
  }
  
  export default tagController;
  
  