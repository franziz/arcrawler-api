class XpathParser{
  /**
   * 
   * @param {Object} element 
   * @param {Object} xpath 
   */
  static async parse(page, element, xpath){
    const stringValue = await page.evaluate((xpath) => {
      const e = document.evaluate(xpath.xpath, document);
      if(e.resultType === 2) return Promise.resolve(e.stringValue)
      else Promise.resolve(null)
    }, xpath)
    const isString = !(!stringValue);
    
    if(isString){
      return Promise.resolve({ elements: 1, results: stringValue })
    }else{
      const elements = await element.$x(xpath.xpath);
      if(xpath.property){
        const xpathResults = await Promise.all(elements.map(async (element) => {
          const value = await (await element.getProperty(xpath.property)).jsonValue();
          return Promise.resolve(value)
        }))
        return Promise.resolve({ elements: elements.length, results: xpathResults })
      }else{
        return Promise.resolve({ elements: elements.length, results: null })
      }
    }
  }
}

module.exports = XpathParser;