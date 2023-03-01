import { Router } from 'express';

export const usersRouter = Router()

  .post('/register', (req, res) => {
    res.send('register');
  })

  .post('/login', (req, res) => {
    res.send('login');
  })

  .post('/logout', (req, res) => {
    res.send('logout');
  });
