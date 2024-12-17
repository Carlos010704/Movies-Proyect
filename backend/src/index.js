import app from './app';
import { getConnection } from './database/connection';
import router from './routes/movies.routes';

app.listen(app.get('port'));

app.use('/', router);

// console.log('server on https://cd4wd00g-' + app.get('port') + '.brs.devtunnels.ms');
console.log('server on http://localhost:' + app.get('port'));

getConnection();