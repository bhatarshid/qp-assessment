import { Router } from 'express';

import { adminController } from "../controller/index.ts";

export default (router: Router) => {
  router.post('/admin/item',adminController.addGroceryItem);
  router.get('/admin/item', adminController.getGroceryItems);
  router.delete('/admin/item/:id', adminController.deleteGroceryItem);
  router.put('/admin/item', adminController.updateGroceryItem);
}