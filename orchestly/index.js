const axios = require("axios");
const ZohoAuth = require("./../zoho/");

class Orchestly extends ZohoAuth {
    constructor(_client_id, _client_secret, _refresh_token) {
        super(_client_id, _client_secret, _refresh_token)
    }

    async getAllJobs(org_id) {
        const token = await this.getToken();
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/job`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    async getAllReports(org_id) {
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/reports`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    async getReport(org_id,report_id) {
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/reports/${report_id}`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }
}

module.exports = Orchestly;
