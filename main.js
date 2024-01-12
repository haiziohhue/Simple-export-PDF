const axios = require('axios');
const express = require('./express');
const puppeteer = require('./puppeteer');
const {getFromInternet} = require('./request')

// getFromInterNet()
express()
console.log("waiting 5 seconds")
setTimeout(()=>{
    puppeteer()
},5000)