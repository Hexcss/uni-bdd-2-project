import app from './app';
import { environment } from './config/index';

const PORT: number = environment.port;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
