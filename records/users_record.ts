import { FieldPacket, OkPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';
import { ValidationExpressError } from '../utils/errors';
import { pool } from '../utils/database';
import { NewUsersEntity, UsersEntity } from '../types';

type UsersRecordResults = [
    UsersEntity[],
    FieldPacket[],
]

export class UsersRecord implements UsersEntity {
  id: string;

  email: string;

  name: string;

  password: string;

  img: string;

  constructor(obj: NewUsersEntity) {
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    const emailRegex = /^(?=.{1,255}$)[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (obj.id && !(uuidRegex.test(obj.id))) {
      throw new ValidationExpressError('Nieprawidłowy identyfikator dla objektu użytkownik');
    }
    if (!obj.name || obj.name.length > 50 || typeof obj.name !== 'string') {
      throw new ValidationExpressError('Imię nie może być puste oraz powinno zawierać maksymalnie do 50 znaków');
    }
    if (!obj.email || !emailRegex.test(obj.email)) {
      throw new ValidationExpressError('Nieprawidłowy adres email');
    }
    if (!obj.password || typeof obj.password !== 'string') {
      throw new ValidationExpressError('Hasło nie może być puste');
    }

    this.id = obj.id;
    this.email = obj.email;
    this.name = obj.name;
    this.password = obj.password;
    this.img = obj.img ? obj.img : 'default_user_image.jpg';
  }

  // @TODO posprawdzać zwracane typy przez metody!
  // @TODO czy insert powinien zwracać cokolwiek np: id?
  async insert() {
    if (!this.id) {
      this.id = uuid();
    }

    const [results] = await pool.execute('SELECT * FROM `users` WHERE email = :email OR name = :name OR id = :id', {
      email: this.email,
      name: this.name,
      id: this.id,
    }) as UsersRecordResults;
    if (results.length) {
      if (this.id === results[0].id) {
        throw new ValidationExpressError(`User with id: ${this.id} already exist.`, 409);
      }
      if (this.name === results[0].name) {
        throw new ValidationExpressError(`User with name: ${this.name} already exist.`, 409);
      }
      if (this.email === results[0].email) {
        throw new ValidationExpressError(`User with email: ${this.email} already exist.`, 409);
      }
    }
    // Password between 8-16 characters 1 special, 1 uppercase, 1 number
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;

    if (!this.password || !passwordRegex.test(this.password)) {
      throw new ValidationExpressError('Hasło nie spełnia wymogów bezpieczeństwa');
    }

    // @TODO zaimplementować lepsze haszowanie z solą
    const hashPassword = await bcrypt.hash(this.password, 10);

    await pool.execute('INSERT INTO `users`(`id`,`name`,`email`,`password`,`img`, `role`) VALUES (:id, :name, :email, :password, :img, :role)', {
      id: this.id,
      name: this.name,
      email: this.email,
      password: hashPassword,
      img: this.img,
      role: 'user',
    });
  }

  static async getOne(id: string): Promise<UsersRecord | null> {
    const [results] = await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
      id,
    }) as UsersRecordResults;
    return results.length === 0 ? null : new UsersRecord(results[0]);
  }

  static async findAll(searchName: string) {
    const [results] = await pool.execute('SELECT * FROM `users` WHERE `name` LIKE :search', {
      search: `%${searchName}%`,
    }) as UsersRecordResults;

    return results.map((result) => {
      const {
        id, name, email, img,
      } = result;

      return {
        id, name, email, img,
      };
    });
  }

  async delete() {
    const [results] = await pool.execute('DELETE FROM `users` WHERE `id` = :id', {
      id: this.id,
    }) as OkPacket[];

    if (results.affectedRows === 0) {
      throw new ValidationExpressError('The user has not been deleted.', 403);
    }
  }

  async update() {
    if (!this.id) {
      throw new ValidationExpressError('User can not be update without ID!', 403);
    }

    const [results] = await pool.execute('SELECT * FROM `users` WHERE ( `email` = :email OR `name` = :name ) AND `id` != :id', {
      email: this.email,
      name: this.name,
      id: this.id,
    }) as UsersRecordResults;

    if (results.length) {
      if (this.name === results[0].name) {
        throw new ValidationExpressError(`User with name: ${this.name} already exist.`, 409);
      }
      if (this.email === results[0].email) {
        throw new ValidationExpressError(`User with email: ${this.email} already exist.`, 409);
      }
    }

    const [passwordResult] = await pool.execute('SELECT * FROM `users` WHERE `id` = :id', {
      id: this.id,
    }) as UsersRecordResults;

    if (passwordResult[0].password === this.password) {
      await pool.execute('UPDATE `users` SET `name` = :name, `email` = :email, `img` = :img  WHERE `id` = :id', {
        id: this.id,
        name: this.name,
        email: this.email,
        img: this.img,
      });
    } else {
      const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;

      if (!this.password || !passwordRegex.test(this.password)) {
        throw new ValidationExpressError('Hasło nie spełnia wymogów bezpieczeństwa');
      }

      const hashPassword = await bcrypt.hash(this.password, 10);

      await pool.execute('UPDATE `users` SET `name` = :name, `email` = :email, `password` = :password, `img` = :img  WHERE `id` = :id', {
        id: this.id,
        name: this.name,
        email: this.email,
        password: hashPassword,
        img: this.img,
      });
    }
  }
}
