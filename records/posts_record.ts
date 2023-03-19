import { FieldPacket, OkPacket } from 'mysql2';
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
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    const dateRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
    const arrCategory = ['React', 'Vanilla JavaScript', 'Node', 'Express', 'TypeScript', 'NestJS', 'Other'];
    if (obj.id && !(uuidRegex.test(obj.id))) {
      throw new ValidationExpressError('Nieprawidłowy identyfikator dla objektu post');
    }
    if (!obj.title || obj.title.length > 255 || typeof obj.title !== 'string') {
      throw new ValidationExpressError('Tytuł nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');
    }
    if (!obj.desc || obj.desc.length > 255 || typeof obj.desc !== 'string') {
      throw new ValidationExpressError('Opis nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');
    }
    if (!obj.date || !dateRegex.test(obj.date)) {
      throw new ValidationExpressError('Nieprawidłowy format daty');
    }
    if (!obj.category || !(arrCategory.includes(obj.category))) {
      throw new ValidationExpressError('Nieprawidłowa kategoria');// @TODO pomyśleć jak lepiej zaimplementować kategorie
    }
    if (obj.userId && !(uuidRegex.test(obj.userId))) {
      throw new ValidationExpressError('Nieprawidłowy identyfikator dla objektu użytkownik');
    }

    this.id = obj.id;
    this.title = obj.title;
    this.desc = obj.desc;
    this.category = obj.category;
    this.date = obj.date;
    this.img = obj.img ? obj.img : 'default_image.jpg'; // Maybe should use String(obj.img)
    this.userId = obj.userId;
  }

  // @TODO posprawdzać zwracane typy przez metody!
  async insert() {
    if (!this.id) {
      this.id = uuid();
    }
    await pool.execute(
      'INSERT INTO `posts`(`id`,`title`,`desc`,`img`,`date`,`userId`,`category`) VALUES (:id, :title, :desc, :img, :date, :userId, :category )',
      {
        id: this.id,
        title: this.title,
        desc: this.desc,
        img: this.img,
        date: this.date,
        userId: this.userId,
        category: this.category,
      },
    );
  }

  static async getOne(id: string): Promise<PostsRecord | null> {
    const [results] = await pool.execute('SELECT *, DATE_FORMAT(`date`, "%Y-%m-%d %H:%i:%s") as date FROM `posts` WHERE `id` = :id', {
      id,
    }) as PostsRecordResults;
    return results.length === 0 ? null : new PostsRecord(results[0]);
  }

  static async findAll(category?: string) {
    if (category) {
      const [results] = await pool.execute('SELECT *, DATE_FORMAT(`date`, "%Y-%m-%d %H:%i:%s") as date  FROM `posts` WHERE `category` = :category', {
        category,
      }) as PostsRecordResults;
      return results.map((result) => new PostsRecord(result));
    }
    const [results] = await pool.execute('SELECT *, DATE_FORMAT(`date`, "%Y-%m-%d %H:%i:%s") as date FROM `posts`') as PostsRecordResults;
    return results.map((result) => new PostsRecord(result));
  }

  async delete(userId: string) {
    const [results] = await pool.execute('DELETE FROM `posts` WHERE `id` = :id AND userId = :userId ', {
      id: this.id,
      userId,
    }) as OkPacket[];

    if (results.affectedRows === 0) {
      throw new ValidationExpressError('The post has not been deleted.', 403);
    }
  }

  async update() {
    if (!this.id) {
      throw new ValidationExpressError('User can not be update without ID!', 403);
    }

    const [results] = await pool.execute('UPDATE `posts` SET `title` = :title, `desc` = :desc, `img` = :img WHERE `id` = :id AND `userId` = :userId', {
      id: this.id,
      title: this.title,
      desc: this.desc,
      img: this.img,
      userId: this.userId,
    }) as OkPacket[];

    if (results.affectedRows === 0) {
      throw new ValidationExpressError('The post has not been updated.', 403);
    }
  }
}
