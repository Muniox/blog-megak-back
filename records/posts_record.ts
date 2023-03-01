import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { ValidationExpressError } from '../utils/errors';
import { pool } from '../utils/database';
import { NewPostsEntity, PostsEntity } from '../types';

type PostsRecordResults = [
    PostsEntity[],
    FieldPacket[],
]

export class PostsRecord implements PostsEntity {
  id: string;

  title: string;

  desc: string;

  category: string;

  date: string;

  img: string;

  userId: string;

  constructor(obj: NewPostsEntity) {
    // @TODO make validation in this place (example add id where is no id provided)
    this.id = obj.id;
    this.title = obj.title;
    this.desc = obj.desc;
    this.category = obj.category;
    this.date = obj.date;
    this.img = obj.img;
    this.userId = obj.userId;
  }

  static async getPost(id: string): Promise<PostsEntity | null> {
    const [results] = await pool.execute('') as PostsRecordResults;
    return results.length === 0 ? null : new PostsRecord(results[0]);
  }

  static async getPosts() {

  }

  async addPost() {

  }

  async deletePost() {

  }

  async updatePost() {

  }
}
