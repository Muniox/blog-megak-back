import { Router } from 'express';
import { UsersRecord } from '../records/users_record';
import { authenticate, AuthenticatedRequest } from '../utils/authenticate';
import { authorizeAdmin, AuthorizeRequest, authorizeUser } from '../utils/authorize';

export const usersRouter = Router()

  .get('/search/:name?', authorizeAdmin, async (req, res) => {
    const data = await UsersRecord.findAll(req.params.name ?? '');
    return res
      .status(200)
      .json(data);
  })

  .get('/:id', authorizeAdmin, async (req, res) => {
    const { password, ...data } = await UsersRecord.getOne(req.params.id);
    return res
      .status(200)
      .json(data);
  })

  .get('/', authorizeUser, async (req: AuthorizeRequest, res) => {
    const { password, ...data } = await UsersRecord.getOne(req.userInfo.id);
    return res
      .status(200)
      .json(data);
  })

  .post('/register', async (req, res) => {
    const data = req.body;
    const user = new UsersRecord(data);
    await user.insert();
    return res
      .status(200)
      .json({ message: 'Użytkownik został stworzony.' });
  })

  .post('/login', authenticate, async (req: AuthenticatedRequest, res) => res
    .status(200)
    .json({
      userInfo: req.data,
      message: 'Użytkownik został zalogowany.',
    }))

  .post('/logout', (req, res) => res
    .clearCookie('access_token', {
      sameSite: 'none',
      secure: true,
    })
    .status(200)
    .json({
      message: 'Użytkownik został wylogowany.',
    }))

  .delete('/:id', authorizeAdmin, async (req, res) => {
    const user = await UsersRecord.getOne(req.params.id);
    await user.delete();
    return res
      .status(201)
      .json({
        message: 'Użytkownik został usunięty',
      });
  })

  .put('/:id', authorizeAdmin, async (req, res) => {
    const {
      name, email, password, img,
    } = req.body;
    const user = await UsersRecord.getOne(req.params.id);

    const updatedData = {
      id: user.id,
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
      img: img || user.img,
    };

    const updatedUser = new UsersRecord(updatedData);
    await updatedUser.update();
    return res
      .status(201)
      .json({
        message: 'Użytkownik został zaktualizowany',
      });
  })

  .put('/', authorizeUser, async (req: AuthorizeRequest, res) => {
    const {
      name, email, password, img,
    } = req.body;
    const user = await UsersRecord.getOne(req.userInfo.id);

    const updatedData = {
      id: user.id,
      name: name || user.name,
      email: email || user.email,
      password: password || user.password,
      img: img || user.img,
    };

    const updatedUser = new UsersRecord(updatedData);
    await updatedUser.update();
    return res
      .status(201)
      .json({
        message: 'Użytkownik został zaktualizowany',
      });
  });
