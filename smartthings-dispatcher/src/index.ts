import * as path from 'path';
import * as express from 'express';
import * as program from 'commander';
import * as proxy from 'express-http-proxy';


const ROOT = path.join(path.resolve(__dirname), '..');

program.version('0.0.1')
	.usage('[options]')
	.option('-c, --customizations <url>', 'URL to sentient-aware-customers static file server')
	.option('-d, --dev', 'Activate development mode')
	.option('-p, --port <port>', 'Set port that server listens on. Default: 3200')
	.option('-v, --variant <name>', 'Set the variant to serve up (dev mode only)')
	.parse(process.argv);

const developmentMode = !!program['dev'];
const customizationsUrl = program['customizations'] || 'http://localhost:3001/';
const port = program['port'] || 3300;

if (developmentMode) {
	console.log('============ DEVELOPMENT MODE ============');
}

const app = express();

app.set('views', path.join(ROOT, 'server'));
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'accept, content-type, x-app-key');
	next();
});


app.get('*', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	let pojo = { status: 404, message: 'No Content' };
	let json = JSON.stringify(pojo, null, 2);
	res.status(404).send(json);
});
	
app.post('*', function(req, res) {
	res.setHeader('Content-Type', 'application/json');
	let pojo = { status: 404, message: 'No Content' };
	let json = JSON.stringify(pojo, null, 2);
	res.status(404).send(json);
});

// Server
const server = app.listen(process.env.PORT || port, () => {
	console.log(`Listening on: http://localhost:${server.address().port}`);
});
