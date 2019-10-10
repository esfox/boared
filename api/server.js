const Koa = require('koa');
const Router = require('koa-router');
const bodyparser = require('koa-bodyparser');
const cors = require('@koa/cors');

const database = require('./database');

const server = new Koa();
server.use(bodyparser());
server.use(cors());

const router = new Router({ prefix: '/api' });
router.get('/', async context =>
{
  context.body = await database.getPosts();
});

router.post('/', async context =>
{
  const savedPost = await database.savePost(context.request.body.post);
  context.body = savedPost;
});

server
  .use(router.routes())
  .use(router.allowedMethods());

server.listen(7070);
console.log('server started on port 7070');
