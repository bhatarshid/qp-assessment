import { Request, Response } from "express"
import adminService from "../services/admin-service.ts"

const addGroceryItem = async (req: Request, res: Response) =>  {
  try {
    if (!req.body.name || !req.body.price || !req.body.quantity) {
      throw { statusCode: 400, message: 'Please provide all the details' };
    }
    const response = await adminService.addGroceryItem(req.body);
    res.status(201).send({ message: response});
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const getGroceryItems = async (req: Request, res: Response) =>  {
  try {
    const response = await adminService.viewGroceryItems();
    res.status(200).send(response);
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const deleteGroceryItem = async (req: Request, res: Response) =>  {
  try {
    const response = await adminService.deleteGroceryItem(req.params.id);
    res.status(200).send({ message: response });
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const updateGroceryItem = async (req: Request, res: Response) =>  {
  try {
    if (!req.body.id) {
      throw { statusCode: 400, message: 'Please provide the id' };
    }
    const response = await adminService.updateGroceryItem(req.body.id, req.body)
    res.status(200).send({ message: response });
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

export default {
  addGroceryItem,
  getGroceryItems,
  deleteGroceryItem,
  updateGroceryItem
}