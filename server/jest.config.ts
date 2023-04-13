import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	globals: {
		'ts-jest': {
			diagnostics: {
				warnOnly: true,
			},
		},
	},
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
		'^@tests/(.*)$': '<rootDir>/tests/$1',
	},
	testEnvironment: 'node',
};

export default config;
