const app = require(`./server/app`);
const db = require(`./server/db.js`);

const port = 3000;

db.connect().then(() => {
  app.listen(port, () => console.log(`App running on port ${port}...`));
});
