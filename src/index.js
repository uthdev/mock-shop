import express from 'express';

import router from './routes';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/', router);

router.use('/*', (req, res) => {
  res.status(404).json({
    status: 'error',
    error: 'Endpoint not found! Go to the homepage using: /api/v1',
  });
});

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app;
