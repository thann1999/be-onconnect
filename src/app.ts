import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import registerFreeRoute from './routes/register-free.route';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './database/db-connection';
import { AxiosError } from 'axios';
import createError from 'http-errors';
import helmet from 'helmet';

dotenv.config();
const app = express();

// Config
app.use(cors());
app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Connect DB
(async () => {
  try {
    await sequelize.sync({ alter: true, logging: false });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Routes
app.use('/api/register-free', registerFreeRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: AxiosError, req: Request, res: Response) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status ? Number(err.status) : 500);
  res.send(res.locals.message);
});

export default app;
