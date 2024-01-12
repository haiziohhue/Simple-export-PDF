const puppeteer = require('puppeteer');
const axios = require('axios');
const judge = require('./judge');
module.exports = async () => {
    console.log("start puppeteer")
    const req = await axios("http://localhost:3001/list")
    const data = req.data[0].list
    // const errNum = []

    console.log("saving json to memory")
    
    const browser = await puppeteer.launch();
        
    console.log("start nt browser")
    
    const page = await browser.newPage();

    for (const [index, item] of data.entries()) {
        // if (!judge(item)) {
            // console.log(`${item.name} skip`)
            // errNum.push(item.name)
            // continue;
        // }
        console.log("save " + item.name + " PDF")
        await savePDF(page, index, item)
        console.log(item.name + "saved")
    }
    // console.log("共有", errNum.length, "个异常，", "异常数据：", errNum)
    
    console.log(`all pdf save!\nexit`)

    browser.close();
    process.exit(0);
}
const savePDF = async (page, index, item) => {
    await page.goto(`http://localhost:3000/?id=${index}`);
    return new Promise((resolve, reject) => {
        setTimeout(async () => {
            await page.pdf({
                path: `./pdf/${item.name}.pdf`,
                format: 'A4',
                printBackground: true
            })
            resolve()
        }, 500)
    })
}