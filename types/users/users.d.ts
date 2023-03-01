import { UsersEntity } from './users_entity';

export interface NewUsersEntity extends Omit<UsersEntity, 'id'>{
    id?: string;
}
