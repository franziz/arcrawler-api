class XpathSanitizer{

  /**
   * 
   * @param {string} xpath 
   */
  static sanitize(xpath){
    const sanitizedXpath = { xpath: "", property: null }
    if(xpath.indexOf("@href") >= 0){
      sanitizedXpath.xpath = xpath.substring(0, xpath.indexOf("@href"));
      sanitizedXpath.property = "href";
    }else if(xpath.indexOf("text()") >= 0){
      sanitizedXpath.xpath = xpath.substring(0, xpath.indexOf("text()"));
      sanitizedXpath.property = "innerText";
    }else if(xpath.indexOf("@content") >= 0){
      sanitizedXpath.xpath = xpath.substring(0, xpath.indexOf("@content"));
      sanitizedXpath.property = "content";
    }else{
      sanitizedXpath.xpath = JSON.parse(JSON.stringify(xpath));
      sanitizedXpath.property = null
    }

    let isValid = false;
    while(!isValid){
      if(sanitizedXpath.xpath.substr(-1) === "/"){
        sanitizedXpath.xpath = sanitizedXpath.xpath.substring(0, sanitizedXpath.xpath.lastIndexOf("/"));
      }else{ isValid = true }
    }
    return sanitizedXpath;
  }
}

module.exports = XpathSanitizer;