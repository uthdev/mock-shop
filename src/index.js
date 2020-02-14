import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import router from './routes';
import swaggerDocument from '../swagger.json';

const app = express();

//helmet
app.use(helmet());

// Limit rate
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 100, //limts number of request per IP
})

app.use(limiter);

//bodyparser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Cors
const corsOption = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOption));

const PORT = process.env.PORT || 3000;

app.use('/api/v1', router);

app.use('/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
