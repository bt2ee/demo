import ApiCompose from './compose.js'

const {use, start} = new ApiCompose()

use(async (ctx, next) => {
  console.log(1333);
  await next();
} )

use([async (ctx, next) => {
  console.log(1);
  await next();
  console.log(2);
}, async (ctx, next) => {
  console.log(3);
  await next();
  console.log(4);
}] )

start()
