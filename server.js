import dotenv from 'dotenv';

dotenv.config();

import app from './app';

app.listen(process.env.PORT, () => console.log(`Running on port ${process.env.PORT}`));
