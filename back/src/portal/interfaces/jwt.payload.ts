
import { User} from '../entities/user.entity';
export interface JwtPayload
{
    id : string;
    email : string;
    date : Date;
}