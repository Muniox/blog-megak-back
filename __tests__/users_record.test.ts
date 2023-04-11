import { UsersRecord } from '../records/users_record';
import { NewUsersEntity } from '../types';

const defaultObj: NewUsersEntity = {
  id: '471763d5-45cf-48b7-8ef0-00a080cbcab2',
  name: 'testowy',
  email: 'email@testowy.com',
  img: 'testowe.jpg',
  password: 'Go111111!1',
};

describe('Can build UsersRecord with validation', () => {
  const user = new UsersRecord(defaultObj);

  /* id */
  test('optionally have a userId property with a string value in the correct format', () => {
    if (user.id) {
      expect(typeof user.id).toBe('string');
      expect(user.id).toMatch(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/);
    }
  });

  test('should throw error if id property is not correct uuid v4 format', () => {
    const objIdWrongFormat = { ...defaultObj, id: ' ' };

    expect(() => new UsersRecord(objIdWrongFormat)).toThrow('Nieprawidłowy identyfikator dla objektu użytkownik');
  });

  /* name */
  test('should have a name property with a string value', () => {
    expect(user.name).toBeDefined();
    expect(typeof user.name).toBe('string');
  });

  test('should throw error if name property length is empty or more than 50 letters', () => {
    const userNameNone = { ...defaultObj, name: '' };
    expect(() => new UsersRecord(userNameNone)).toThrow('Imię nie może być puste oraz powinno zawierać maksymalnie do 50 znaków');

    const userNameMore = {
      ...defaultObj,
      name: 'Lorem ipsum dolor sit amet, consectetuer adipiscing',
    };
    expect(() => new UsersRecord(userNameMore)).toThrow('Imię nie może być puste oraz powinno zawierać maksymalnie do 50 znaków');
  });

  /* email */
  test('should have an email property with a string value in the correct email format', () => {
    expect(user.email).toMatch(/^(?=.{1,255}$)[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
  });

  test('should throw error if email property has incorrect format', () => {
    const userEmailWrongFormat = { ...defaultObj, email: 'email.pl' };
    expect(() => new UsersRecord(userEmailWrongFormat)).toThrow('Nieprawidłowy adres email');
  });

  /* img */
  test('should have an img property with a string value', () => {
    expect(typeof user.img).toBe('string');
  });

  test('should have an img property with a string value or set default to default user img value', () => {
    expect(typeof user.img).toBe('string');

    const { img, ...rest } = user;
    const postImgNone = new UsersRecord(rest);
    expect(postImgNone.img).toBe('default_user_image.jpg');
  });

  /**
   * password
   * at least 8 characters
   * at least 1 numeric character
   * at least 1 lowercase letter
   * at least 1 uppercase letter
   * at least 1 special character
   * at max 16 characters
   * */
  test('should have a password property with a string value', () => {
    expect(typeof user.password).toBe('string');
    expect(user.password).toMatch(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/);
  });

  test('should throw error if password property has incorrect format', () => {
    const userPasswordWrongFormat = { ...defaultObj, password: '111111' };
    expect(() => new UsersRecord(userPasswordWrongFormat)).toThrow('Hasło nie spełnia wymogów bezpieczeństwa');
  });
});
