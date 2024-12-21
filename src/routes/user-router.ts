import { Router } from 'express';

import { userController } from "../controller/index.ts";

export default (router: Router) => {
    router.post('/user/add',userController.addUser);
    router.get('/user/grocery',userController.viewGroceryItems);
    router.put('/user/grocery',userController.bookGroceryItems);
}