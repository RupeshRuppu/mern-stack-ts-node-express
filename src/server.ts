import app from './app';
import config from './config';
import dbConnect from './config/dbConnect';

app.listen(config.PORT, () => {
  dbConnect();
  console.log(`Server running on port ${config.PORT}`);
});
