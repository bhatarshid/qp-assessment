import prisma from "../../lib/db.ts";
import { Item, UpdateItem } from "../../lib/schema.ts";

const addGroceryItem = async (items: Item): Promise<String> => {
  try {
    await prisma.groceryItem.create({
      data: {
        name: items.name,
        quantity: items.quantity,
        price: items.price
      }
    });

    return 'Grocery item added successfully!';
  }
  catch (error) {
    throw error;
  }
}

const viewGroceryItems = async (): Promise<Item[]> => {
  try {
    const items = await prisma.groceryItem.findMany();
    return items;
  }
  catch (error) {
    throw error;
  }
}

const deleteGroceryItem = async (id: string): Promise<String> => {
  try {
    await prisma.groceryItem.delete({
      where: {
        id: Number(id)
      }
    });

    return 'Grocery item deleted successfully!';
  }
  catch (error) {
    throw error;
  }
}

const updateGroceryItem = async (id: string, items: UpdateItem): Promise<String> => {
  try {
    const item: Item = await prisma.groceryItem.findUnique({
      where: {
        id: Number(id)
      }
    });
    if (!item) {
      throw { statusCode: 404, message: 'Grocery item not found!' };
    }

    await prisma.groceryItem.update({
      where: {
        id: Number(id)
      },
      data: {
        name: items.name || item.name,
        quantity: items.quantity || item.quantity,
        price: items.price || item.price
      }
    });

    return 'Grocery item updated successfully!';
  }
  catch (error) {
    throw error;
  }
}

export default {
  addGroceryItem,
  viewGroceryItems,
  deleteGroceryItem,
  updateGroceryItem
}