const ZohoAuth = require("./../zoho/");

class People extends ZohoAuth {
    constructor(_client_id, _client_secret, _refresh_token) {
        super(_client_id, _client_secret, _refresh_token)
    }

    async getForms(formName) {
        try {
            return await this.customRequest(`https://people.zoho.com/people/api/forms/${formName}/getRecords`, "POST");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

}

module.exports = People;
