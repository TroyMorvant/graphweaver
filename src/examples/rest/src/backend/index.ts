import 'reflect-metadata';
import Graphweaver from '@exogee/graphweaver-server';
import { AuthorizationContext, authApolloPlugin } from '@exogee/graphweaver-auth';

import './schema';
// Auth Functions
import { beforeRead, afterRead } from './auth/admin-ui';
import { addUserToContext } from './auth/context';

// API Key Data Provider
// import { apiKeyDataProvider } from './schema/auth';

export const graphweaver = new Graphweaver<AuthorizationContext>({
	apolloServerOptions: {
		plugins: [authApolloPlugin(addUserToContext)], //, @todo { apiKeyDataProvider })],
	},
	adminMetadata: {
		enabled: true,
		hooks: {
			// These hooks filter the admin ui entities based on the logged in user
			beforeRead,
			afterRead,
		},
	},
	fileAutoGenerationOptions: {
		typesOutputPath: ['./'],
	},
});

export const handler = graphweaver.handler();
