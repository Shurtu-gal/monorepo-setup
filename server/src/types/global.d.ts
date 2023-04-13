declare global {
	namespace NodeJS {
		interface Global {
			__logger: import('winston').Logger;
		}
	}
}

export default global;
