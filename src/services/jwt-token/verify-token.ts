import { NextFunction, Response } from 'express';
import { HttpStatus } from '../../services/http/http.type';
import { AuthenticationMessage } from '../../shared/const/message.const';
import jwt, { Secret } from 'jsonwebtoken';
import { CustomRequestUser } from 'shared/types/user.type';

// Verify auth token
export function auth(req: CustomRequestUser, res: Response, next: NextFunction) {
  // Get auth header value
  const token = req.header('token');
  // Check if token is undefined
  if (!token) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .send({ message: AuthenticationMessage.MISSING_TOKEN });
  }
  try {
    const secret: Secret = process.env.JWT_SECRET_KEY || 'secret-key';
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send({ message: AuthenticationMessage.WRONG_TOKEN });
  }
}
