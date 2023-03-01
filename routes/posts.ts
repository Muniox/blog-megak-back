import { Router } from 'express';

export const postsRouter = Router()

  .get('/', (req, res) => {
    res.send('get all posts');
  })

  .get('/:id', (req, res) => {
    res.send('get single post');
  })

  .post('/', (req, res) => {
    res.send('create post');
  })

  .delete('/:id', (req, res) => {
    res.send('delete post');
  })

  .put('/:id', (req, res) => {
    res.send('update post');
  });
