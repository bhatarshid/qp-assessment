import { Request, Response } from 'express';
import { userService } from '../services/index.ts';

const addUser = async (req: Request, res: Response) => {
  try {
    if (!req.body.name || !req.body.email) {
      throw { statusCode: 400, message: 'Please provide all the details' };
    }
    const response = await userService.addUser(req.body);
    res.status(201).send({ message: response});
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const viewGroceryItems = async (req: Request, res: Response) => {
  try {
    const response = await userService.viewGroceryItems();
    res.status(200).send(response);
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

const bookGroceryItems = async (req: Request, res: Response) => {
  try {
    if (!req.body.id) {
      throw { statusCode: 400, message: 'Please provide the id of user' };
    }
    if (req.body.items.length === 0) {
      throw { statusCode: 400, message: 'Please provide the items to book' };
    }

    const response = await userService.bookGroceryItems(req.body.id, req.body.items);
    res.status(200).send({ message: response });
  }
  catch (error) {
    res.status(error.statusCode || 500).send({ message: error.message || 'Internal server error' });
  }
}

export default {
  addUser,
  viewGroceryItems,
  bookGroceryItems
};