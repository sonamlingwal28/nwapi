
class utilities {

	getConfig = () => {
		const env = process.env.Environment.toLowerCase();
		const config = require('../configs/config.json');
	
		if (env == 'dev') {
			return config.dev;
		} else if (env == 'pre') {
			return config.pre;
		} else if (env == 'int') {
			return config.int;
		} else if (env == 'prd') {
			return config.prd;
		} else if (env == 'int_aws') {
			return config.int_aws;
		}
	};

    async decryptString (str) {
		const Cryptr = require('cryptr');
		const cryptr = new Cryptr('auth');
		return cryptr.decrypt(str);
	};






}
export default new utilities();