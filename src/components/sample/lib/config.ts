const config = {
  initiateLoginEndpoint: "https://sharepointapps.docusms.uk/Teamsapp/build/auth-start.html",//process.env.REACT_APP_START_LOGIN_PAGE_URL,
  clientId: process.env.AAD_APP_CLIENT_ID,//process.env.REACT_APP_CLIENT_ID,
  apiEndpoint: "https://sharepointapps.docusms.uk",//process.env.REACT_APP_FUNC_ENDPOINT,
  apiName: 'getUserProfile',//process.env.REACT_APP_FUNC_NAME,
};

export default config;
