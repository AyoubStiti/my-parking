/* eslint-disable no-console */
import { connect } from 'mongoose';
import cors from 'cors';
import express from 'express';
import { json } from 'body-parser';
import { mkdirSync } from 'fs-extra';
import userRoutes from 'routes/userRoutes';

require('dotenv').config();

mkdirSync(`${process.env.IMAGE_STORAGE_LOCATION}/tmp` || 'tmp', { recursive: true });

const app = express();

app.use(express.static('public'));
app.use(json());

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:3001'], credentials: true }));
app.use((req, res, next) => {
  next();
});
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use(
  process.env.BASE_API_URL || '',
  userRoutes,
);

connect(process.env.DATABASE_URI || '', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    app.listen(process.env.PORT);
    console.log(`server connected at port ${process.env.PORT}`);
  })
  .catch(error => {
    console.log('Error', error);
  });
export default app;
