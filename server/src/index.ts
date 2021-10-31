import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import express from 'express';

import { HelloResolver } from './resolvers/hello';

const main = async () => {
	await createConnection();

	const app = express();

	const schema = await buildSchema({
		resolvers: [HelloResolver],
	});

	const apolloServer = new ApolloServer({
		schema,
	});

	await apolloServer.start();

	apolloServer.applyMiddleware({
		app,
	});

	app.listen(5000, () => {
		console.log('server started on http://localhost:5000/graphql');
	});
};

main().catch((err) => console.log(err));
