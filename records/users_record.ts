import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
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
    // @TODO make validation in this place (example add id where is no id provided)
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
    const emailRegex = /^(?=.{1,255}$)[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/;
    if (obj.id && !(uuidRegex.test(obj.id))) throw new ValidationExpressError('Nieprawidłowy identyfikator dla objektu użytkownik');
    if (!obj.name || obj.name.length > 50) throw new ValidationExpressError('Imię nie może być puste oraz powinno zawierać maksymalnie do 50 znaków');
    if (!obj.email || !emailRegex.test(obj.email)) throw new ValidationExpressError('Nieprawidłowy adres email');
    if (!obj.password || !passwordRegex.test(obj.password)) throw new ValidationExpressError('Hasło nie spełnia wymogów bezpieczeństwa');

    this.id = obj.id;
    this.email = obj.email;
    this.name = obj.name;
    this.password = obj.password;
    this.img = obj.img ? obj.img : 'default_user_image.jpg';
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    } else {

    }
  }

  static async getOne() {

  }

  static async findAll() {

  }

  async delete() {

  }

  async update() {

  }

  async register() {

  }

  async login() {

  }

  async logout() {

  }

  private async authorize() {

  }
}
