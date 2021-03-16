# Zoho NPM Package

Connecting To zoho services and manage most of the API's

## Features
* Handling oAuth
* Zoho People


## Installation

##### Using github
```bash
git clone git@github.com:farazfaraji/zoho-boilerplate
cd zoho-boilerplate
docker-compose up -d
npm install
```

##### Using package
* https://www.npmjs.com/package/zoho-package

```
const People = require("zoho-package").People;
const people = new People("CLIENT_ID","CLIENT_SECRET","REFRESH_TOKEN");
```

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
