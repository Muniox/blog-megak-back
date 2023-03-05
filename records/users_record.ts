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

    this.id = obj.id;
    this.email = obj.email;
    this.name = obj.name;
    this.password = obj.password;
    this.img = obj.img;
  }

  async insert() {
    if (!this.id) {
      this.id = uuid();
    } else {

    }
  }

  static async getUser() {

  }

  static async getUsers() {

  }

  async addUser() {

  }

  async deleteUser() {

  }

  async updateUser() {

  }

  async register() {

  }

  async login() {

  }

  async logout() {

  }
}
