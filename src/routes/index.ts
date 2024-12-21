import { Router } from 'express';

import userRouter from './user-router.ts';
import adminRouter from './admin-router.ts';

const router = Router();

export default (): Router => {
    userRouter(router);
    adminRouter(router);
    
    return router;
}