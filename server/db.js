const mongoose = require(`mongoose`);
const Mockgoose = require(`mockgoose`).Mockgoose;

const DB = `mongodb://localhost:27017/api`;

const connect = () => {
  return new Promise((resolve, reject) => {
    const mockgoose = new Mockgoose(mongoose);

    mockgoose.prepareStorage().then(() => {
      mongoose
        .connect(DB, {
          useNewUrlParser: true,
          useCreateIndex: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          console.log(`DB connection successful.`);

          if (err) return reject(err);
          
          resolve();
        });
    });
  });
};

const close = () => mongoose.disconnect();

module.exports = { connect, close };
