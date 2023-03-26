import { Router } from 'express';
import { PostsRecord } from '../records/posts_record';
import { AuthorizeRequest, authorizeUser } from '../utils/authorize';

export const postsRouter = Router()

  .get('/', async (req, res) => {
    const data = await PostsRecord.findAll(req.query.cat as string);
    return res
      .status(200)
      .json(data);
  })

  .get('/:id', async (req, res) => {
    const { userId, ...data } = await PostsRecord.getOne(req.params.id);
    return res
      .status(200)
      .json(data);
  })

  .post('/', authorizeUser, async (req: AuthorizeRequest, res) => {
    const userId = req.userInfo.id;
    const {
      title, desc, category, date, img,
    } = req.body;
    const post = new PostsRecord({
      title, desc, category, date, img, userId,
    });
    await post.insert();
    return res
      .status(200)
      .json({
        message: 'post has been added',
      });
  })

  .delete('/:id', authorizeUser, async (req: AuthorizeRequest, res) => {
    const userId = req.userInfo.id;
    const post = await PostsRecord.getOne(req.params.id);
    await post.delete(userId);
    return res
      .status(201)
      .json({
        message: 'post has been deleted',
      });
  })

  .put('/:id', authorizeUser, async (req: AuthorizeRequest, res) => {
    const {
      title, desc, img, category,
    } = req.body;
    const userId = req.userInfo.id;
    const post = await PostsRecord.getOne(req.params.id);
    const updatedData = {
      id: post.id,
      title: title || post.title,
      desc: desc || post.desc,
      img: img || post.img,
      date: post.date,
      category: category || post.category,
      userId,
    };
    console.log(updatedData);
    const updatedPost = new PostsRecord(updatedData);
    await updatedPost.update();
    return res
      .status(201)
      .json({
        message: 'post has been updated',
      });
  });
