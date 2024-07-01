import { Router, Request, Response } from 'express';
import {addMember, deleteMember, deleteSelectedMember, getMember, getMemberById, updateMember} from '../controllers/memberControllers.js'
const memberRouter = Router();

  // Get all members
  memberRouter.get('/', (req: Request, res: Response) => getMember(req, res));

  //get member by id 
  memberRouter.get('/:id', (req: Request, res: Response) => getMemberById(req, res))

  // add Member
  memberRouter.post('/', (req: Request, res: Response) => addMember(req, res));

  //update member
  memberRouter.put('/:id/edit', (req: Request, res: Response) => updateMember(req, res))

  // delete member
  memberRouter.delete('/:id', (req: Request, res: Response) => deleteMember(req, res))
  // delete member
  memberRouter.delete('/', (req: Request, res: Response) => deleteSelectedMember(req, res))
  
  export default memberRouter;
