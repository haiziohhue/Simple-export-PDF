const axios = require('axios');
/**
 * @description get token
 * @param url request url 请求的url
 * @param data post body POST的数据
 * @returns axios request 返回axios请求
 */
const getToken = async (url,data) => {
    return await axios.post(url, data)
}
/**
 * @description get internet data(post)
 * @param {string} url 
 * @param {string} token 
 * @param {object} data request body
 * @returns response data
 */
const getData = async (url,token, data) => {
    return await fetch("", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
}
/**
 * 
 * @param {Array} list request List
 * @param {string} host ex:http://localhost:3001/list 
 * @returns 
 */
const saveList = async (list, host) => {
    return await axios.post(host, list, {
        "Content-Type": "application/json"
    })
}
/**
 * 
 * @param {string} loginUrl login url
 * @param {string} dataUrl request data url
 * @param {object} loginData post data
 * @param {object} requestData post data
 */
const getFromInternet = async (loginUrl,dataUrl,loginData,requestData) => {

    //cleaning old data
    const preGet = await axios({
        url: "http://localhost:3001/list",
        method: "get"
    })
    if (preGet.data.length) {
        for (let i of preGet.data)
            await axios({
                url: `http://localhost:3001/list/${i.id}`,
                method: "delete"
            })
    }
    console.log("clean cache")

    //getting data
    const token = await getToken(loginUrl,loginData)
    //need change token
    const list = await getData(dataUrl,token.data.data.accessToken,requestData)
    const listJson = await list.json()
    console.log("success got data")

    //save
    await saveList({
        list: listJson.data.list
    }, "http://localhost:3001/list")
    console.log("success saving local")
}
module.exports = {
    getFromInternet
}