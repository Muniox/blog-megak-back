import { FieldPacket } from 'mysql2';
import { v4 as uuid } from 'uuid';
import { ValidationExpressError } from '../utils/errors';
import { pool } from '../utils/database';
import { NewUsersEntity, UsersEntity } from '../types';

type UsersRecordResults = [
    UsersEntity[],
    FieldPacket[],
]

export class Users_record implements UsersEntity {
  id: string;

  email: string;

  name: string;

  password: string;

  img: string;

  constructor(obj: NewUsersEntity) {
    this.id = obj.id;
    this.email = obj.email;
    this.name = obj.name;
    this.password = obj.password;
    this.img = obj.img;
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
