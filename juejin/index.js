const express = require('express');
const superagent= require('superagent');
const TurndownService = require('turndown');
const fs = require('fs')
const http = require('http')
const path = require('path')
const cheerio=require('cheerio')
const app = express()

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
})
let server = app.listen(3000, function(){
  let host = server.address().address;
  let port = server.address().port;
	// console.log("TCL: server", server)
  console.log('Your App is running at http://%s:%s', host, port);
})

let article = {}
superagent.get('https://juejin.im/post/5cd38990e51d453a543f9e3e').end((err,res)=>{
  if(err) {
    // console.log(err)
  } else {
    // console.log(res)
    getContent(res)
  }
})

let getContent = (res)=>{
  let $ = cheerio.load(res.text,{
    decodeEntities:false
  })
  // let titleString = $('h1.article-title').html()
  // let titleBuffer = unicode2Ch(titleString)
  article.title = $('h1.article-title').html()
  // let contentString = $('div.article-content').html()
  // 转码
  // let contentBuffer = unicode2Ch(contentString)
  // 变成markdown
  // contentBuffer = turndownService.turndown(contentBuffer)
  article.content = $('div.article-content').html().replace(/data-src/g, "src");
  console.log(typeof(article.content))
}

app.get('/', async (req, res, next) => {
  // console.log("TCL: article", article)
  fs.writeFileSync(`page.html`, String.raw`${article.content}`)  
  fs.writeFileSync(`page.md`,turndownService.turndown(article.content))
  res.send(article);
});