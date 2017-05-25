import {Request, Response} from 'express';

export class UserController {
  public getAll(request: Request, response: Response): void {
    response.json([
      { id: '1', name: 'John' },
      { id: '2', name: 'Jenny' },
      { id: '3', name: 'Jame' },
    ]);
  }
}