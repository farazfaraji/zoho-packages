const fs = require("fs");
const randomString = require('randomstring');
const request = require('request');
const axios = require("axios");

class ZohoAuthentication {
    constructor(_client_id, _client_secret, _refresh_token) {
        this.client_id = _client_id;
        this.client_secret = _client_secret;
        this.refresh_token = _refresh_token;
        this.token = null;
    }

    async removeToken(){
        fs.unlinkSync("token.zoho");
    }

    async getToken() {
        if(this.token===null){
            let _token = null;
            if(fs.existsSync("token.zoho"))
            {
                return
            }else
            {
                _token = await this.generateToken();
                _token = _token.access_token;
                await fs.writeFileSync("token.zoho",_token);
            }
        }
        return this.token;
    }

    async generateToken() {
        const client_id = this.client_id;
        const client_secret = this.client_secret;
        const refresh_token = this.refresh_token;

        return new Promise(function (resolve, reject) {
            request({
                url: 'https://accounts.zoho.com/oauth/v2/token',
                method: 'POST',
                form: {
                    grant_type: 'refresh_token',
                    client_id: client_id,
                    client_secret: client_secret,
                    refresh_token: refresh_token,
                }
            }, (error, response, body) => {
                if (error) {
                    console.log(error);
                } else {
                    resolve(JSON.parse(response.body));
                }
            });
        })
    }

    async customRequest(url, method, parameters) {
        if(!["GET","POST","PUT"].includes(method.toString().toUpperCase()))
            throw new Error("method is not included");
        const token = await this.getToken();
        let config = {};
        if(method.toString().toLowerCase()==="get"){
            let params = [];
            for(let parameter in parameters){
                if (parameters.hasOwnProperty(parameter)) {
                    params.push(encodeURI(parameter) + "=" + encodeURI(parameters[parameter]));
                }
            }
            config.url = url + "?" +  params.join("&");
        }else
        {
            config.url = url;
        }

        config.method = method.toString().toLowerCase();
        config.header = {
            'content-type': 'application/x-www-form-urlencoded',
            'Authorization': `Zoho-oauthtoken ${token}`,
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (e) {
            console.error(e.response.data);
        }
    }

    /**
     *
     * @param scopes Array
     * @returns {Promise<void>}
     */
    async initialize(scopes){
        scopes = scopes.join(",");
        console.log(`Open: https://accounts.zoho.com/oauth/v2/auth?response_type=code&access_type=offline&client_id=${this.client_id}&scope=${scopes}&redirect_uri=https://sigmatelecom.com/support`);
        console.log("");
        console.log("");
        console.log("");
        console.log(`curl --location --request POST 'https://accounts.zoho.com/oauth/v2/token' \\
--header 'Content-Type: application/x-www-form-urlencoded' \\
--data-urlencode 'code=REPLACE_CODE' \\
--data-urlencode 'client_id=${this.client_id}' \\
--data-urlencode 'client_secret=${this.client_secret}' \\
--data-urlencode 'redirect_uri=https://sigmatelecom.com/support' \\
--data-urlencode 'grant_type=authorization_code'`);
        console.log("");
        console.log("");
        console.log("");
    }

}

module.exports = ZohoAuthentication;