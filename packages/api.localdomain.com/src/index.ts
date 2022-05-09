// Imports
// ========================================================
import 'express-async-errors';
import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { buildErrorResponse } from './utils/helpers';
import { BadRequest, Forbidden, NotFound } from './utils/errorHandlers';

// ENV VARS
// ========================================================
dotenv.config();

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const VERSION: string = process.env.VERSION || 'unknown';

// Init
// ========================================================
const app = express();

// Middlewares
// ========================================================
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));

// Endpoints / Routes
// ========================================================
/**
 *
 */
app.get('/', (_req, res) =>
  res.send({ version: VERSION, environment: NODE_ENV }),
);

/**
 * Used for authenticating and redirecting
 * If no state is passed it defaults to localdomain.com for the redirect
 */
app.post('/', (req, res) => {
  console.log({ body: req.body });
  if (!`${process.env.WHITELIST_STATES}`.split(',').includes(req.body?.state)) {
    return res.redirect(`${process.env.AUTH0_REDIRECT_URI_WEBAUTH}`);
  }

  return res.redirect(`https://${req.body.state}`);
});

/**
 * Used for logging a user out
 * If no state is passed it defaults to localdomain.com for the redirect
 */
app.get('/logout', (req, res) => {
  console.log({ query: req.query });
  if (!req.query?.state) {
    return res.redirect(
      `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.AUTH0_REDIRECT_URI_AUTHORIZE}/logout?state=${process.env.DEFAULT_LOGOUT_REDIRECT}`,
    );
  }
  return res.redirect(`https://${req.query?.state}`);
});

/**
 *
 */
app.get('/healthz', (_req, res) => res.send({ status: 'ok' }));

// Error Handler
// ========================================================
app.use((error: any, _req: Request, res: Response, next: NextFunction) => {
  if (
    error instanceof BadRequest ||
    error instanceof Forbidden ||
    error instanceof NotFound
  ) {
    return res
      .status(error?.httpStatusCode ?? 400)
      .json(
        buildErrorResponse({ message: error?.message ?? 'Unknown error.' }),
      );
  }

  next(error);
});

// Exprots
// ========================================================
export default app;
