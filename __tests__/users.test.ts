import { v4 as uuid } from 'uuid';
import { UsersRecord } from '../records/users_record';
import { UsersEntity, NewUsersEntity } from '../types';

import { pool } from '../utils/database';

afterAll(async () => {
  await pool.end();
});

// @TODO Testy niedokończone z powodu braku czasu

const defaultObj: NewUsersEntity = {
  id: uuid(),
  name: 'Testowy',
  email: 'email@costam.pl',
  password: 'Folden$0',
  img: 'img.jpg',
};

// methods: insert(), getOne(), findAll(), delete(), update(), login(), logout(), authorize()

describe('testing methods for user record', () => {
  /* insert */
  test('PostsRecord.insert returns UUID.', async () => {
    const post = new UsersRecord(defaultObj);

    await post.insert();

    expect(post.id).toBeDefined();
    expect(typeof post.id).toBe('string');
  });

  test('UsersRecord.insert inserts data to database.', async () => {
    const user = new UsersRecord(defaultObj);

    await user.insert();
    const foundUser = await UsersRecord.getOne(user.id);

    expect(foundUser).toBeDefined();
    expect(foundUser).not.toBeNull();
    expect(foundUser.id).toBe(user.id);
  });

  test('UsersRecord.insert throw error if user already exist', async () => {
    const user = new UsersRecord(defaultObj);

    await user.insert();
    const foundUser = await UsersRecord.getOne(user.id);

    expect(foundUser).toBeDefined();
    expect(foundUser).not.toBeNull();
    expect(foundUser.id).toBe(user.id);
  });

  /* getOne */
  test('UsersRecord.getOne returns null from database for unexisting entry.', async () => {
    const post = await UsersRecord.getOne('---');

    expect(post).toBeNull();
  });

  test('UsersRecord.getOne returns data from database for one entry.', async () => {
    const user = await UsersRecord.getOne('471763d5-45cf-48b7-8ef0-00a080cbcab2');

    expect(user).toBeDefined();
    expect(user.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(user.id).toBe('471763d5-45cf-48b7-8ef0-00a080cbcab2');
    expect(user.title).toBe('test');
  });

  /* findAll */
  test('PostRecord.findAll returns array of found entries.', async () => {
    const posts = await PostsRecord.findAll('');

    expect(posts).not.toEqual([]);
    expect(posts[0]).toBeDefined();
  });

  test('PostsRecord.findAll returns array of found entries when searching by category.', async () => {
    const posts = await PostsRecord.findAll('node');

    expect(posts).not.toEqual([]);
    expect(posts[0]).toBeDefined();
  });

  test('PostsRecord.findAll returns empty array when searching for something that does not exists.', async () => {
    const posts = await PostsRecord.findAll('------------------------------');

    expect(posts).toEqual([]);
  });

  // test('AdRecord.findAll returns smaller amount of data.', async () => {
  //   const ads = await AdRecord.findAll('');
  //
  //   expect(ads[0].id).toBeDefined();
  //   expect((ads[0] as AdEntity).price).toBeUndefined();
  //   expect((ads[0] as AdEntity).description).toBeUndefined();
  // });

  /* delete */
  test('PostsRecord.delete remove post and return ', async () => {

  });

  /* update */
  test('PostsRecord.update returns updated post', async () => {
    const post = new PostsRecord(defaultObj);
    const updatedPost: PostsEntity = { ...post, desc: 'zaktualizowany tekst', title: 'zaktualizowany tytuł' };

    await post.update(updatedPost);
  });

  /* login */
  /* logout */
  /* authorize */
});
