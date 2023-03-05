import { PostsRecord } from '../records/posts_record';
import { NewPostsEntity } from '../types';

const defaultObj: NewPostsEntity = {
  title: 'test',
  desc: 'testowy tekst',
  date: '2023-03-03 00:00:00', // FORMAT YYY-MM-DD HH:mm:ss
  img: 'test.jpg',
  userId: '64a5c473-b6ee-11ed-955a-50ebf64adf2b',
  category: 'test',
};

describe('Can build the PostsRecord with validation', () => {
  const post = new PostsRecord(defaultObj);

  test('should have a title property with a string value', () => {
    expect(typeof post.title).toBe('string');
  });

  test('should throw error if less than 3 letters', () => {
    const obj = { ...defaultObj, title: 'xx' };
    expect(() => new PostsRecord(obj)).toThrow('Tytuł powinien od 3 do 50 znaków');
  });

  test('should throw error if more than 50 letters', () => {
    const obj = {
      ...defaultObj,
      title: 'arridens ars arte artem artes artibus artifex artis',
    };
    expect(() => new PostsRecord(obj)).toThrow('Tytuł powinien od 3 do 50 znaków');
  });

  test('should have a desc property with a string value', () => {
    expect(typeof post.desc).toBe('string');
  });

  test('should have a date property with a string value in the correct format', () => {
    expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  test('should have an img property with a string value', () => {
    expect(typeof post.img).toBe('string');
  });

  test('should have a userId property with a string value in the correct format', () => {
    expect(post.userId).toMatch(/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/);
  });

  test('should have a category property with a string value', () => {
    expect(typeof post.category).toBe('string');
  });
});
