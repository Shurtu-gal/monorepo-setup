import { Request } from 'express';
import { Logger } from 'winston';
import { winston } from '@/config/winston';
import { PrismaClient } from '@prisma/client';

const db = new PrismaClient();

export interface Context {
	db: PrismaClient;
	req: Request;
	logger: Logger;
}

const logger = winston('Graphql');

export const context = async ({ req }: { req: Request }) => ({
	db,
	req,
	logger,
});
