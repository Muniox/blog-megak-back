import { UsersRecord } from '../records/users_record';
import { NewUsersEntity } from '../types';

const defaultObj: NewUsersEntity = {
  name: 'testowy',
  email: 'email@testowy.com',
  img: 'testowe.jpg',
  password: 'test',
};

describe('Can build UsersRecord', () => {
  const user = new UsersRecord(defaultObj);

  test('should have a name property with a string value', () => {
    expect(typeof user.name).toBe('string');
  });

  test('should have an email property with a string value in the correct email format', () => {
    expect(user.email).toMatch(/^\S+@\S+\.\S+$/);
  });

  test('should have an img property with a string value', () => {
    expect(typeof user.img).toBe('string');
  });

  test('should have a password property with a string value', () => {
    expect(typeof user.password).toBe('string');
  });
});
