
import utils from '../providers/utils.js';
import apihelp from '../providers/apihelper.js';
class HelperMethods {

	async getAuthorizationToken() {
		const config =  utils.getConfig();
     
        config.auth.headers.authorization=  await utils.decryptString(config.auth.basicAuthorization);
		const response = await apihelp.submitPost(config.auth.url, config.auth.body, config.auth.headers);

		if (response.status == 200)
			return `${response.body.token_type} ${response.body.access_token}`;
         
		else
			return response;
	}

	async updateRequestBody(testdat,body) {
		body.referenceId = testdat.referenceId;
		body.givenName = testdat.givenName;
		body.middleName = testdat.middleName;
		body.familyName = testdat.familyName;
		body.dob = testdat.dob.split(":")[1];
		body.productCode = testdat.productCode;
		body.customerId = testdat.customerId;
		body.customerName = testdat.customerName;
		body.accountId = testdat.accountId;
				return body;
		
	}
  
   
}
export default new HelperMethods();