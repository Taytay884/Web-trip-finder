import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
	PORT: get('PORT').required().asPortNumber(),
	API_PREFIX: get('DEFAULT_API_PREFIX').default('/api/v1').asString(),
	NODE_ENV: get('NODE_ENV').default('development').asString(),
	GOOGLE_API_KEY: get('GOOGLE_API_KEY').required().asString(),
	MONGODB_URI: get('MONGODB_URI').required().asString()
};
