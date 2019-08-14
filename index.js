require('module-alias/register');
require('dotenv').config();

const puppeteer = require("puppeteer");
const express = require("express");
const cors = require("cors");

const XpathSanitizer = require("@app/sanitizer/xpath");
const XpathParser = require("@app/parser/xpath");

const app = express();
app.use(express.json())
app.use(cors())

app.put("/v1/xpath/extract", async (req, res) => {
  const { xpath, url } = req.body;
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  try{
    const page = await browser.newPage();
    await page.goto(url);
    
    const sanitizedXpath = XpathSanitizer.sanitize(xpath);
    const results = await XpathParser.parse(page, page, sanitizedXpath);
    res.status(200).json({ results })
  }catch(err){
    console.log(err);
    res.status(404).json({ error: true })
  }finally{ await browser.close(); }
})

app.listen(process.env.PORT, () => console.log(`Express server is listening on port ${process.env.PORT}`))

