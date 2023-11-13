"use strict";
// Change default timeout from 5 seconds to 300 seconds
jest.setTimeout(2500000);
const args = require('yargs').argv;
process.env.Environment = args.envm;
import filesyshelper from '../providers/filesyshelper';
import apihelper from '../providers/apihelper';
import hm from '../providers/helper-method.js';
import utils from '../providers/utils.js';
const path = require('path'); //for constructing Path 
const xlsx = require('xlsx'); //for reading Data from Datasheet

let body,
	url,
	headers,
	bearerToken,
	response,
	resourceId
const payloadPath = path.join(__dirname, './../../test-api/test_data/Payloads');
const dataSheetPath = path.join(__dirname, `./../../test-api/test_data/Test-Data.xlsx`);

const config = utils.getConfig();
//Read excel Datasheet if exists
if (filesyshelper.exists(dataSheetPath)) var wb = xlsx.readFile(dataSheetPath);

const ws = wb.Sheets["TestGroup"];
const testGroups = xlsx.utils.sheet_to_json(ws);
for (let e = 0; e < testGroups.length; e++) {
	let testGroupName = testGroups[e];

	if (testGroupName.Name == 'EtoE' && testGroupName.Run == 'Yes') {

		describe(`NW API EtoE`, () => {
			//All the Nationwide API E2E test cases would be under this describe block

			//Before All Block to get Authorization bearer token
			beforeAll(async () => {

				bearerToken = await hm.getAuthorizationToken();

				if (typeof bearerToken != 'string') {
					const res = bearerToken;
					expect(res.status).toEqual(200);
				}

			});

			beforeEach(() => {
				headers = {
					'Content-Type': 'application/json',
					'Authorization': bearerToken
				};
				body = filesyshelper.readFile(`${payloadPath}/NWRequest.json`)
				body = JSON.parse(body);
			})


			//Obtaining the list of test cases to be executed
			const ws = wb.Sheets["EtoE"];
			const tcList = xlsx.utils.sheet_to_json(ws);

			let testdata;//
			for (let i = 0; i < tcList.length; i++) {
				let testdata = tcList[i];

				if (testdata.TestCaseName == 'POST - Search Success - HIT with productcode as Ster_SV' && testdata.Run == 'Yes') {
					test(`${testdata.TestCaseName}`, async () => {
						console.log("POST - Search Success - HIT with productcode as Ster_SV");

						url = config.baseURI + "/search";
						var requestBody = await hm.updateRequestBody(testdata, body);
						requestBody = JSON.stringify(body)
						response = await apihelper.submitPost(url, requestBody, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toEqual(200);
						expect(response.body.result.code).toEqual("Hit");
						resourceId = response.body.id;
						console.log("ID generated is: " + resourceId)

					});
				}

				if (testdata.TestCaseName == 'POST - Search Success - Clear with productcode as MonitoringTestProfile' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("POST - Search Success - Clear with productcode as MonitoringTestProfile");

						url = config.baseURI + "/search";
						var requestBody = await hm.updateRequestBody(testdata, body);
						requestBody = JSON.stringify(body)
						response = await apihelper.submitPost(url, requestBody, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toEqual(200);
						expect(response.body.result.code).toEqual("Clear");
						resourceId = response.body.id;
						console.log("ID generated is: " + resourceId)

					});
				}


				if (testdata.TestCaseName == 'GET - Valid resourceID - Hit with productcode as MonitoringTestProfile' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Valid resourceID - Hit with productcode as MonitoringTestProfile")

						url = config.baseURI + "/search";

						var requestBody = await hm.updateRequestBody(testdata, body);
						requestBody = JSON.stringify(body)
						response = await apihelper.submitPost(url, requestBody, headers);
						//console.log(JSON.stringify(response.body));
						if (response.status == 200) {
							resourceId = response.body.id;
							console.log("ID generated is: " + resourceId)
							url = config.baseURI + "/search/" + resourceId;
							response = await apihelper.submitGet(url, headers);
							//console.log(JSON.stringify(response.body));
							expect(response.status).toBe(200);
							expect(response.body.id).toEqual(resourceId);
							expect(response.body.results.code).toEqual("Hit");
							expect(response.body.results.criminalCases).not.toBeNull();
						} else {
							expect(response.status).toEqual(200);
						}



					});
				}

				if (testdata.TestCaseName == 'GET - Valid resourceID - Clear with productcode as MonitoringTestProfile' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Valid resourceID - Clear with productcode as MonitoringTestProfile")
			url = config.baseURI + "/search";

						var requestBody = await hm.updateRequestBody(testdata, body);
						requestBody = JSON.stringify(body)
						response = await apihelper.submitPost(url, requestBody, headers);
						//console.log(JSON.stringify(response.body));
						if (response.status == 200) {
							resourceId = response.body.id;
							console.log("ID generated is: " + resourceId)
							url = config.baseURI + "/search/" + resourceId;

							response = await apihelper.submitGet(url, headers);
							//console.log(JSON.stringify(response.body));
							expect(response.status).toBe(200);
							expect(response.body.id).toEqual(resourceId);
							expect(response.body.results.code).toEqual("Clear");
							expect(response.body.results.criminalCases).not.toBeNull();
						} else {
							expect(response.status).toEqual(200);
						}



					});
				}

				if (testdata.TestCaseName == 'GET - Invalid resourceID' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Invalid resourceID")

						resourceId = testdata.rscId;
						url = config.baseURI + "/search/" + resourceId;

						response = await apihelper.submitGet(url, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(404);

						expect(response.body.error).toEqual("404#NotFoundInDynamoDB");
						expect(response.body.message).toEqual("The Resource not found in DynamoDB.");


					});
				}

				if (testdata.TestCaseName == 'POST - Search with S3 down' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("POST - Search with S3 down");
						headers["QA-Disable"] = "S3";
						url = config.baseURI + "/search";

						var requestBody = await hm.updateRequestBody(testdata, body);
						requestBody = JSON.stringify(body)
						response = await apihelper.submitPost(url, requestBody, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(503);

						expect(response.body.error).toEqual("503#ErrorInUploadS3/DynamoDB");
						expect(response.body.message).toEqual("Error in uploading to s3/ DynamoDB.");

					});
				}

				if (testdata.TestCaseName == 'POST - Search with Vendor down' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("POST - Search with Vendor down");
						headers["QA-Disable"] = "Vendor";
						url = config.baseURI + "/search";

						var requestBody = await hm.updateRequestBody(testdata, body);
						requestBody = JSON.stringify(body)
						response = await apihelper.submitPost(url, requestBody, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(503);

						expect(response.body.error).toEqual("503#InvalidResponse");
						expect(response.body.message).toEqual("There is issue in response/Vendor Response is null or Empty.");

					});
				}


				if (testdata.TestCaseName == 'POST - Mandatory & Non-Mnadatory field check' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("POST - Mandatory & Non-Mnadatory field check");
						var requestBody
						url = config.baseURI + "/search";
						let error = testdata.errorMessage.split("||");
						let manFieldName = testdata.mandatoryField.split(",");
						for (let j = 0; j < error.length; j++) {

							requestBody = await hm.updateRequestBody(testdata, body);
							requestBody[manFieldName[j]] = '';
							requestBody = JSON.stringify(body)

							response = await apihelper.submitPost(url, requestBody, headers);
							expect(response.status).toEqual(400);
							expect(response.body.error).toEqual(error[j].split(":")[0]);
							expect(response.body.message).toEqual(error[j].split(":")[1]);

						}
						let nonmanFieldName = testdata.nonMandatoryField.split(",");
						for (let k = 0; k < nonmanFieldName.length; k++) {
							requestBody = await hm.updateRequestBody(testdata, body);
							requestBody[nonmanFieldName[k]] = '';
							requestBody = JSON.stringify(body)

							response = await apihelper.submitPost(url, requestBody, headers);
							expect(response.status).toEqual(200);
						}

					});
				}

			}

		});
	}
	if (testGroupName.Name == 'HealthCheck' && testGroupName.Run == 'Yes') {
		describe(`HealthCheck`, () => {
			//All the Healthcheck test cases would be under this describe block

			//Obtaining the list of test cases to be executed
			const ws = wb.Sheets["HealthCheck"];
			const tcList = xlsx.utils.sheet_to_json(ws);


			for (let i = 0; i < tcList.length; i++) {
				let testdata = tcList[i];

				if (testdata.TestCaseName == 'GET - HealthCheck' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - HealthCheck")

						url = config.healthURL;
						response = await apihelper.submitGet(url, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(200);


					});
				}

				if (testdata.TestCaseName == 'GET - Deep HealthCheck' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Deep HealthCheck")

						url = config.healthDeepURL;
						response = await apihelper.submitGet(url, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(200);
						expect(response.body.status).toBe("OK");
						expect(response.body.message).toBe(testdata.message);
						expect(response.body.methods[0].checks[0].detail.ValidateVendor).toBe(testdata.success);
						expect(response.body.methods[0].checks[1].detail.ValidateS3).toBe(testdata.success);
						expect(response.body.methods[0].checks[2].detail.ValidateDynamoDB).toBe(testdata.success);
						expect(response.body.methods[0].checks[3].detail.ValidateSecretManager).toBe(testdata.success);

					});
				}

				if (testdata.TestCaseName == 'GET - Deep HealthCheck with QA-Disable as Vendor' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Deep HealthCheck with QA-Disable as Vendor")
						headers = {
							'QA-Disable': testdata.headers,
						};
						url = config.healthDeepURL;
						response = await apihelper.submitGet(url, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(503);
						expect(response.body.status).toBe("CRITICAL");
						expect(response.body.message).toBe(testdata.message);
						expect(response.body.methods[0].checks[0].detail.ValidateApriss).toBe(testdata.fail);
						expect(response.body.methods[0].checks[1].detail.ValidateS3).toBe(testdata.success);
						expect(response.body.methods[0].checks[2].detail.ValidateDynamoDB).toBe(testdata.success);
						expect(response.body.methods[0].checks[3].detail.ValidateSecretManager).toBe(testdata.success);

					});
				}

				if (testdata.TestCaseName == 'GET - Deep HealthCheck with QA-Disable as S3' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Deep HealthCheck with QA-Disable as S3")
						headers = {
							'QA-Disable': testdata.headers,
						};
						url = config.healthDeepURL;
						response = await apihelper.submitGet(url, headers);
					//	console.log(JSON.stringify(response.body));
						expect(response.status).toBe(503);
						expect(response.body.status).toBe("CRITICAL");
						expect(response.body.message).toBe(testdata.message);
						expect(response.body.methods[0].checks[0].detail.ValidateVendor).toBe(testdata.success);
						expect(response.body.methods[0].checks[1].detail.ValidateS3).toBe(testdata.fail);
						expect(response.body.methods[0].checks[2].detail.ValidateDynamoDB).toBe(testdata.success);
						expect(response.body.methods[0].checks[3].detail.ValidateSecretManager).toBe(testdata.success);

					});
				}

				if (testdata.TestCaseName == 'GET - Deep HealthCheck with QA-Disable as Dynamo' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Deep HealthCheck with QA-Disable as Dynamo")
						headers = {
							'QA-Disable': testdata.headers,
						};
						url = config.healthDeepURL;
						response = await apihelper.submitGet(url, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(503);
						expect(response.body.status).toBe("CRITICAL");
						expect(response.body.message).toBe(testdata.message);
						expect(response.body.methods[0].checks[0].detail.ValidateVendor).toBe(testdata.success);
						expect(response.body.methods[0].checks[1].detail.ValidateS3).toBe(testdata.success);
						expect(response.body.methods[0].checks[2].detail.ValidateDynamoDB).toBe(testdata.fail);
						expect(response.body.methods[0].checks[3].detail.ValidateSecretManager).toBe(testdata.success);

					});
				}

				if (testdata.TestCaseName == 'GET - Deep HealthCheck with QA-Disable as SecretManager' && testdata.Run == 'Yes') {

					test(`${testdata.TestCaseName}`, async () => {
						console.log("GET - Deep HealthCheck with QA-Disable as SecretManager")
						headers = {
							'QA-Disable': testdata.headers,
						};
						url = config.healthDeepURL;
						response = await apihelper.submitGet(url, headers);
						//console.log(JSON.stringify(response.body));
						expect(response.status).toBe(503);
						expect(response.body.status).toBe("CRITICAL");
						expect(response.body.message).toBe(testdata.message);
						expect(response.body.methods[0].checks[0].detail.ValidateVendor).toBe(testdata.success);
						expect(response.body.methods[0].checks[1].detail.ValidateS3).toBe(testdata.success);
						expect(response.body.methods[0].checks[2].detail.ValidateDynamoDB).toBe(testdata.success);
						expect(response.body.methods[0].checks[3].detail.ValidateSecret).toBe(testdata.fail);

					});
				}
			}


		});
	}
}


