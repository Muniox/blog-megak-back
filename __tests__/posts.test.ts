import { PostsRecord } from '../records/posts_record';
import { PostsEntity, NewPostsEntity } from '../types';

import { pool } from '../utils/database';

afterAll(async () => {
  await pool.end();
});

// eslint-disable-next-line max-len
// @TODO testy potrzebują do działania defaultObj with id "471763d5-45cf-48b7-8ef0-00a080cbcab2"
// @TODO Testy niedokończone z powodu braku czasu

const defaultObj: NewPostsEntity = {
  id: '69939d0e-e64d-4bbc-b058-12be05739959',
  title: 'test',
  desc: 'testowy tekst',
  date: '2023-03-03 00:00:00', // FORMAT YYYY-MM-DD HH:mm:ss
  img: 'test.jpg',
  userId: '471763d5-45cf-48b7-8ef0-00a080cbcab2',
  category: 'Node',
};

describe('testing methods for post record', () => {
  /* insert */
  test('PostsRecord.insert returns UUID.', async () => {
    const post = new PostsRecord(defaultObj);

    await post.insert();

    expect(post.id).toBeDefined();
    expect(typeof post.id).toBe('string');
  });

  test('PostsRecord.insert inserts data to database.', async () => {
    const post = new PostsRecord(defaultObj);

    await post.insert();
    const foundPost = await PostsRecord.getOne(post.id);

    expect(foundPost).toBeDefined();
    expect(foundPost).not.toBeNull();
    expect(foundPost.id).toBe(post.id);
  });

  /* getOne */
  test('PostsRecord.getOne returns null from database for unexisting entry.', async () => {
    const post = await PostsRecord.getOne('---');

    expect(post).toBeNull();
  });

  test('PostsRecord.getOne returns data from database for one entry.', async () => {
    const post = await PostsRecord.getOne('69939d0e-e64d-4bbc-b058-12be05739959');

    expect(post).toBeDefined();
    expect(post.id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(post.id).toBe('69939d0e-e64d-4bbc-b058-12be05739959');
    expect(post.title).toBe('test');
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
});
