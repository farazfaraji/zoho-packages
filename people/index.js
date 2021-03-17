const ZohoAuth = require("./../zoho/auth.zoho");

class People extends ZohoAuth {
    constructor(uniq_name,client_id, client_secret, refresh_token) {
        super(uniq_name,client_id, client_secret, refresh_token)
    }

    /**
     *
     * @param formName
     * @param sIndex start index
     * @param limit maximum 200
     * @returns {Promise<*>}
     */
    async getForms(formName,sIndex=1,limit=200) {
        try {
            return await this.customRequest(`https://people.zoho.com/people/api/forms/${formName}/getRecords?sIndex=${sIndex}&limit=${limit}`, "POST");
        } catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }

    /**
     *
     * @param formName
     * @returns {Promise<Array>}
     */
    async getFormsAllData(formName) {
        try {
            let result = [];
            let data = [];
            let sIndex = 1;
            result = await this.getForms(formName);
            data = [...result.response.result];
            while (result.response.result.length === 200) {
                sIndex += 200;
                result = await this.getForms(formName, sIndex);
                data.push(...result.response.result);
            }
            return data;
        }catch (e) {
            console.log(e);
        }
    }

    /**
     *
     * @param sdate MM/dd/YYYY
     * @param edate MM/dd/YYYY
     * @param employee_id optional
     * @returns {Promise<*>}
     */
    async getReport(sdate,edate,employee_id=null){
        try {
            return await this.customRequest(`https://people.zoho.com/people/api/attendance/getUserReport`,"GET",{sdate,edate,employee_id});
        }catch (e) {
            if (e.response !== undefined)
                console.error(e.response.data);
            else
                console.error(e.message);
        }
    }
}

module.exports = People;
