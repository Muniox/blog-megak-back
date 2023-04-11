import { PostsEntity } from './posts_entity';

export interface NewPostsEntity extends Omit<PostsEntity, 'id'>{
    id?: string;
}

export interface PostEntityResponse extends Omit<PostsEntity, 'userId'> {}
