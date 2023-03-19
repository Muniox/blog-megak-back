import { PostsRecord } from '../records/posts_record';
import { NewPostsEntity } from '../types';

const defaultObj: NewPostsEntity = {
  id: 'd2056734-ba34-4427-a9c8-22c2dbcb72a2',
  title: 'test',
  desc: 'testowy tekst',
  date: '2023-03-03 00:00:00', // FORMAT YYYY-MM-DD HH:mm:ss
  img: 'test.jpg',
  userId: '471763d5-45cf-48b7-8ef0-00a080cbcab2',
  category: 'Node',
};

describe('Can build the PostsRecord with validation', () => {
  const post = new PostsRecord(defaultObj);

  /* id */
  test('optionally have a userId property with a string value in the correct format', () => {
    if (post.id) {
      expect(typeof post.id).toBe('string');
      expect(post.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/);
    }
  });

  test('should throw error if id property is not correct with uuid v4 format', () => {
    const objIdWrongFormat = { ...defaultObj, id: ' ' };

    expect(() => new PostsRecord(objIdWrongFormat)).toThrow('Nieprawidłowy identyfikator dla objektu post');
  });

  /* title */
  test('should have a title property with a string value', () => {
    expect(post.title).toBeDefined();
    expect(typeof post.title).toBe('string');
  });

  test('should throw error if title property length is empty or more than 255 letters', () => {
    const postTitleLess = { ...defaultObj, title: '' };
    expect(() => new PostsRecord(postTitleLess)).toThrow('Tytuł nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');

    const postTitleMore = {
      ...defaultObj,
      title: 'aequitate aequitatem aequo aequum aetatis aeterno aeternum affecta affecti affectus afferat afferre afferrent affert afficit afficitur affirmatis afflueret afranius agam agatur aiebat ait aiunt albam albuci albucius alia aliae aliam alias aliena alienae an',
    };
    expect(() => new PostsRecord(postTitleMore)).toThrow('Tytuł nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');
  });

  /* desc */
  test('should have a desc property with a string value', () => {
    expect(post.desc).toBeDefined();
    expect(typeof post.desc).toBe('string');
  });

  test('should throw error if desc property is empty or more than 255 letters', () => {
    const postDescLess = { ...defaultObj, desc: '' };
    expect(() => new PostsRecord(postDescLess)).toThrow('Opis nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');

    const postDescMore = {
      ...defaultObj,
      desc: 'aequitate aequitatem aequo aequum aetatis aeterno aeternum affecta affecti affectus afferat afferre afferrent affert afficit afficitur affirmatis afflueret afranius agam agatur aiebat ait aiunt albam albuci albucius alia aliae aliam alias aliena alienae an',
    };
    expect(() => new PostsRecord(postDescMore)).toThrow('Opis nie może być pusty oraz powinien zawierać maksymalnie do 255 znaków');
  });

  /* date */
  test('should have a date property with a string value in the correct format', () => {
    expect(post.date).toBeDefined();
    expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/);
  });

  /* img */
  test('should have an img property with a string value or set default to default img value', () => {
    expect(typeof post.img).toBe('string');

    const { img, ...rest } = post;
    const postImgNone = new PostsRecord(rest);
    expect(postImgNone.img).toBe('default_image.jpg');
  });

  /* userId */
  test('should have a userId property with a string value in the correct format', () => {
    expect(post.userId).toBeDefined();
    expect(typeof post.userId).toBe('string');
    expect(post.userId).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });

  /* category */
  test('should have a category property with a string value', () => {
    expect(post.category).toBeDefined();
    expect(typeof post.category).toBe('string');
    expect(post.category).toBe('Node');
  });

  test('should throw error if category property has incorrect format', () => {
    const postCategoryIncorrect = { ...defaultObj, category: 'Java' };
    expect(() => new PostsRecord(postCategoryIncorrect)).toThrow('Nieprawidłowa kategoria');
  });
});
