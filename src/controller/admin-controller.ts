import { Request, Response } from "express"
import adminService from "../services/admin-service.ts"
import { Item } from "../../lib/schema.ts";

const addGroceryItem = async (req: Request, res: Response) =>  {
  try {
    if (!req.body.name || !req.body.price || !req.body.quantity) {
      throw { statusCode: 400, message: 'Please provide all the details' };
    }
    const response: string = await adminService.addGroceryItem(req.body);
    res.status(201).send({ message: response});
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const getGroceryItems = async (req: Request, res: Response) =>  {
  try {
    const response: Item[] = await adminService.viewGroceryItems();
    res.status(200).send(response);
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const deleteGroceryItem = async (req: Request, res: Response) =>  {
  try {
    const response: string = await adminService.deleteGroceryItem(req.params.id);
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
    const response: string = await adminService.updateGroceryItem(req.body.id, req.body)
    res.status(200).send({ message: response });
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const addQuantityToItem = async (req: Request, res: Response) => {
  try {
    if (!req.params.id || !req.params.count) {
      throw { statusCode: 400, message: 'Please provide the id and quantity' };
    }
    const id = Number(req.params.id);
    const count = Number(req.params.count);

    if (!req.query.type || (req.query.type !== 'add' && req.query.type !== 'remove')) {
      throw { statusCode: 400, message: 'Please provide the type as add or remove' };
    }

    const response: string = await adminService.addQuantityToItem(id, count, req.query.type);
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
  updateGroceryItem,
  addQuantityToItem
}