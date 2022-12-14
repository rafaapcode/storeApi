import dotenv from 'dotenv';

dotenv.config();

import app from './app.js';

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`));
