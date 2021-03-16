const ZohoAuth = require("./../zoho/auth.zoho");

class People extends ZohoAuth {
    constructor(uniq_name,client_id, client_secret, refresh_token) {
        super(uniq_name,client_id, client_secret, refresh_token)
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