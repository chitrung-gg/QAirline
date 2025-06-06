import { Request } from 'express';
import { User } from 'src/user/entity/user.entity';

interface RequestWithUser extends Request {
  user: User;
}
 
export default RequestWithUser;