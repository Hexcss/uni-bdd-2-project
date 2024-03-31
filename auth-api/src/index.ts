import app from './app';
import { environment } from './config/index';

const PORT: number = environment.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
