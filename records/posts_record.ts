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

  img?: string;

  userId: string;

  constructor(obj: NewPostsEntity) {
    // @TODO make validation in this place (example add id where is no id provided)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    const arrCategory = ['React', 'Vanilla JavaScript', 'Node', 'Express', 'TypeScript', 'NestJS', 'Other'];
    if (obj.id && !(uuidRegex.test(obj.id))) throw new ValidationExpressError('Nieprawidłowy identyfikator dla objektu post');
    if (!obj.title || obj.title.length > 255) throw new ValidationExpressError('Tytuł nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');
    if (!obj.desc || obj.desc.length > 255) throw new ValidationExpressError('Opis nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');
    if (!obj.date || !dateRegex.test(obj.date)) throw new ValidationExpressError('Nieprawidłowy format daty');
    if (!obj.category || !(arrCategory.includes(obj.category))) throw new ValidationExpressError('Nieprawidłowa kategoria');// @TODO think how to implement and validate category better
    if (obj.userId && !(uuidRegex.test(obj.userId))) throw new ValidationExpressError('Nieprawidłowy identyfikator dla objektu użytkownik');

    this.id = obj.id;
    this.title = obj.title;
    this.desc = obj.desc;
    this.category = obj.category;
    this.date = obj.date;
    this.img = obj.img ? obj.img : 'default_image.jpg'; // Maybe should use String(obj.img)
    this.userId = obj.userId;
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();

      await pool.execute('INSERT INTO `posts`(`id`,`title`,`desc`,`category`)');
    }
  }

  static async getOne(id: string): Promise<PostsEntity | null> {
    const [results] = await pool.execute('') as PostsRecordResults;
    return results.length === 0 ? null : new PostsRecord(results[0]);
  }

  static async findAll(title: string) {

  }

  async delete(id: string) {

  }

  async update(obj: PostsEntity) {

  }
}
