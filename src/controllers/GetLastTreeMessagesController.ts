import {Request, Response} from 'express';
import { GetLastTreeMessagesService } from '../services/GetLastTreeMessagesService';

class GetLastTreeMessagesController {
    
    async handle(request: Request, response: Response) {      
        const service = new GetLastTreeMessagesService();
    
        try{
            const result = await service.execute();
            return response.json(result);
        } catch(err) {
            return response.json(err.message)
        }
    }
}

export { GetLastTreeMessagesController }