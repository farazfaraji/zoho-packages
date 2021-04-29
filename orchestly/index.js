const ZohoAuth = require("./../zoho/auth.zoho");

class Orchestly extends ZohoAuth {
    constructor(_uniq_name,_client_id, _client_secret, _refresh_token) {
        super(_uniq_name,_client_id, _client_secret, _refresh_token)
    }

    async getAllJobs(org_id,parameters) {
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/job`, "GET",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    async getJobDetail(org_id,jobId,parameters) {
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/job/${jobId}`, "GET",parameters);
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    async getAllOfAllJobs(org_id,parameters) {
        try {
            let result = [];
            let data = [];
            let sIndex = 0;
            result = await this.getAllJobs(org_id,parameters);
            data = [...result.job_list];
            while (result.job_list.length === 100) {
                sIndex += 100;
                parameters.index = sIndex;
                result = await this.getAllJobs(org_id,parameters);
                data.push(...result.job_list);
            }
            return data;
        }catch (e) {
            console.log(e);
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

    async getAllLayout(org_id) {
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/layout`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    async getLayer(org_id,layout_id) {
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/layout/${layout_id}`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    async getAllCustomFields(org_id) {
        try {
            return await this.customRequest(`https://orchestlyapi.zoho.com/blueprint/api/${org_id}/customfield`, "GET");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

}

module.exports = Orchestly;
