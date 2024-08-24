import express, { Request, Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants';
import * as logic from './logic';
import { TripData } from './types';

export interface ServerOptions {
	port: number;
}

export class Server {
	private readonly app = express();
	private readonly port: number;

	constructor(options: ServerOptions) {
		const { port } = options;
		this.port = port;
	}

	async start(): Promise<void> {
		//* Middlewares
		this.app.use(express.json()); // parse json in request body (allow raw)
		this.app.use(express.urlencoded({ extended: true })); // allow x-www-form-urlencoded
		this.app.use(compression());
		// CORS
		this.app.use((_req: Request, res: Response, next: Function) => {
			res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
			next();
		});
		//  limit repeated requests to public APIs
		this.app.use(
			rateLimit({
				max: ONE_HUNDRED,
				windowMs: SIXTY * SIXTY * ONE_THOUSAND,
				message: 'Too many requests from this IP, please try again in one hour'
			})
		);

		// Test rest api
		this.app.get('/', (_req: Request, res: Response) => {
			return res.status(HttpCode.OK).send({
				message: `Welcome to Initial API! \n Endpoints available at http://localhost:${this.port}/`
			});
		});

		this.app.get('/trip-photo', async (req: Request, res: Response) => {
			try {
				const generatedImagePath = await logic.getGeneratedImage(req.query as TripData);
				return res.status(HttpCode.OK).send({
					imageUrl: generatedImagePath
				});
			} catch (error) {
				return res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
					error: 'Failed to generate image'
				});
			}
		});

		this.app.get('/trip-plan', async (_req: Request, res: Response) => {
			const tripData = await logic.fetchTripData(_req.query as any);
			return res.status(HttpCode.OK).send({
				data: tripData
			});
		});

		this.app.listen(this.port, () => {
			console.log(`Server running on port ${this.port}...`);
		});
	}
}
