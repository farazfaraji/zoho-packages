# Zoho NPM Package

Connecting To zoho services and manage most of the API's

## Features
* Handling oAuth
* Zoho People


## Installation

##### Using github
```bash
git clone git@github.com:farazfaraji/zoho-package
cd zoho-package
npm install
```

##### Using package
* https://www.npmjs.com/package/zoho-package

```
const People = require("zoho-package").People;
const people = new People("APP_NAME","CLIENT_ID","CLIENT_SECRET","REFRESH_TOKEN");
```
if you are using this package for many tokens you should separate APP_NAME

#### Available Classes
* People
* CRM
* Orchestly


## Get zoho credential
* Read https://www.zoho.com/crm/developer/docs/api/v2/oauth-overview.html this article to retrieve Client ID and Client Secret.
```
const Zoho = require("zoho-package").Zoho;
const zoho  = new Zoho(CLIENT_ID,CLIENT_SECRET,null);
zoho.initialize(["ZohoCRM.modules.ALL"],"http://github.com/redirect");
```
* In the console, you can see one link, Click on that and copy code from URL,
* Replace your code in curl CLI and run it.

#Zoho People Functions
* getForms
    * fetch limited data (maximum 200)
* getFormsAllData
    * fetch all data in a form


#Zoho Functions
* removeToken
* fetchLastToken
* customRequest
* initialize
