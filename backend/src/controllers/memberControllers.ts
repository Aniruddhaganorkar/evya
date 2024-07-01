import { Request, Response } from 'express';
import { createMemebers, deleteSelectedMembers, deleteMembers, getMembers, getMembersById, updateMembers } from '../services/memberServices.js';

interface CustomError extends Error {
  status?: number;
  message?: string;
}

export async function addMember(req: Request, res: Response) {
    try {
        const data = await createMemebers(req.body);
        res.status(201).json(data);
    } catch (err) {
        const error = err as CustomError;
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function deleteMember(req: Request, res: Response) {
    try {
        const data = await deleteMembers(Number(req.params.id));
        res.status(200).json(data);
    } catch (err) {
        const error = err as CustomError;
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function deleteSelectedMember(req: Request, res: Response) {
    try {
        const data = await deleteSelectedMembers(req.body);
        res.status(200).json(data);
    } catch (err) {
        const error = err as CustomError;
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function updateMember(req: Request, res: Response) {
    try {
        const data = await updateMembers(Number(req.params.id), req.body);
        res.status(200).json(data);
    } catch (err) {
        const error = err as CustomError;
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function getMemberById(req: Request, res: Response) {
    try {
        const data = await getMembersById(Number(req.params?.id));
        res.status(200).json(data);
    } catch (err) {
        const error = err as CustomError;
        res.status(error.status || 500).json({ message: error.message });
    }
}

export async function getMember(req: Request, res: Response) {
    try {
        const data = await getMembers(req.query);
        res.status(200).json(data);
    } catch (err) {
        const error = err as CustomError;
        res.status(error.status || 500).json({ message: error.message });
    }
}
