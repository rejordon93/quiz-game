import { Request, Response, NextFunction, Router  } from 'express';
import { User } from '../models/User';
import { ensureLoggedIn } from '../middleware/auth';

export const userRouter = Router()

// Get a user by username
userRouter.get('/user/:username', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try{
    // implement get user by username //
    return res.json({ message: "should return a user" });
  } catch (e: unknown) {
	  return next(e);
	}
});
// Gets all users (future development)
userRouter.get('/', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try {
	  // implement get all users //
	  return res.json({ message: "should return all users" });
  } catch (e: unknown) {
	  return next(e);
  }
});

// Get user by id (future features)
userRouter.get('/:id', ensureLoggedIn, async (req: Request, res: Response, next: NextFunction) => {
  try{
    // implement get user by id //
	  return res.json({ message: "should return a user by id" });
  } catch (e) {
	  return next(e);
  }
});

// Delete user (future features) 
userRouter.delete('/:id', ensureLoggedIn, async(req: Request, res: Response, next: NextFunction) => {
  try {
	  const id = +req.params.id
	  // should delete a user by id //
	  return res.json({ message: "Should delete a user by id" });
  } catch (e) {
	  return next (e)
	}
});

