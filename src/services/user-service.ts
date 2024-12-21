import prisma from "../../lib/db.ts";
import { Item, User } from "../../lib/schema.ts";

const addUser = async (user: User): Promise<String> => {
  try {
    const userDetails = await prisma.user.findFirst({
      where: {
        email: user.email
      }
    });

    if (userDetails) {
      throw { statusCode: 400, message: 'User already exists!' };
    }

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email
      }
    });

    return "User added successfully!";
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

const bookGroceryItems = async (id: string, items: { id: number; count: number}[] ): Promise<String> => {
  try {
    const userDetails = await prisma.user.findFirst({
      where: {
        id: Number(id)
      }
    });
    if (!userDetails) {
      throw { statusCode: 404, message: 'User not found!' };
    }

    for (const item of items) {
      const groceryItem = await prisma.groceryItem.findUnique({
        where: {
          id: item.id
        }
      });
      if (!groceryItem) {
        throw { statusCode: 404, message: `Grocery item ${item.id} not found!` };
      }
      if (groceryItem.quantity < item.count) {
        throw { statusCode: 400, message: 'Not enough quantity available for ' + groceryItem.name };
      }

      const booking = await prisma.userGroceryItem.findFirst({
        where: {
          userId: Number(id),
          groceryItemId: item.id
        }
      })

      if (booking) {
        await prisma.userGroceryItem.update({
          where: {
            userId_groceryItemId: {
              userId: Number(id),
              groceryItemId: item.id
            }
          },
          data: {
            count: booking.count + item.count,
            price: (booking.count + item.count) * groceryItem.price
          }
        });
      }
      else {
        await prisma.userGroceryItem.create({
          data: {
            userId: Number(id),
            groceryItemId: item.id,
            count: item.count,
            price: item.count * groceryItem.price
          }
        });        
      }

      await prisma.groceryItem.update({
        where: {
          id: item.id
        },
        data: {
          quantity: groceryItem.quantity - item.count
        }
      });
    }

    return "Grocery items booked successfully!";
  }
  catch (error) {
    throw error;
  }
}

export default {
  addUser,
  viewGroceryItems,
  bookGroceryItems
}