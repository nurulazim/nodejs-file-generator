const path = require('path');
const http = require('http');
const fs = require('fs');

const express = require('express');

const rootDir = require('../util/path');
const { dirname } = require('path');
const { fileURLToPath } = require('url');
const { dir } = require('console');

const router = express.Router();

const products = [];

function checkAlphaNumeric(str) {
  const alphaNumeric = /^[a-z0-9]+$/i;
  var isAlphaNumeric = str.match(alphaNumeric) ? true : false;
  return isAlphaNumeric;
}

function checkInteger(str) {
  const num = Number(str);
  return Number.isInteger(num);
}

function checkRealNumber(str) {
  return !isNaN(str) && !isNaN(parseFloat(str));
}

function checkAlphabeticalString(str) {
  const alphabetic = /^[A-Za-z]+$/;
  var isAlphabetic = str.match(alphabetic) ? true : false;
  return isAlphabetic;
}

function getFilesizeInBytes(filename) {
  var stats = fs.statSync(filename);
  var fileSizeInBytes = stats.size;
  return fileSizeInBytes;
}

function getStringSizeInBytes(str) {
  var size = str.length*2;
  return size;
}

function generateStringForFile() {
  var fileSizeInMegabytes = getFilesizeInBytes('message.txt') / (1024*1024);
  var stringSizeInMegabytes = 0;

  
  var randomMessage = "";
  const maxValue = 1000000;

  while(stringSizeInMegabytes < 4) {
    if(stringSizeInMegabytes >= 4) break;
    for(let i = 0; i < 50; i++) {
      var randomNumber = Math.floor(Math.random()*40);
      if(randomNumber < 10) {
        randomMessage = randomMessage + (Math.random()*maxValue).toString() + ',';
      } else if(randomNumber >= 10 && randomNumber < 20) {
        randomMessage = randomMessage + parseInt(Math.random()*maxValue).toString() + ',';
      } else if(randomNumber >= 20 && randomNumber < 30) {
        randomMessage = randomMessage + generateAlphaNumeric(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + ',';
      } else if(randomNumber >= 30) {
        randomMessage = randomMessage + generateAlphaNumeric(32, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + ',';
      }
    }
    stringSizeInMegabytes = getStringSizeInBytes(randomMessage) / (1024*1024);
    // fileSizeInMegabytes = getFilesizeInBytes('message.txt') / (1024*1024);
  }
  return randomMessage;
}

function generateAlphaNumeric(length, chars) {
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

function getReport() {
  var alphabeticalStringCount = 0;
  var intCount = 0;
  var realNumberCount = 0;
  var alphaNumericCount = 0;
  // var data = fs.readFileSync('message.txt', 'utf8');
  // var fileData = data.toString();
  // var generatedArray = fileData.split(',');
  // generatedArray.forEach(element => {
  //   var isAlphabeticalString = checkAlphabeticalString(element);
  //   var isInt = checkInteger(element);
  //   var isRealNumber = checkRealNumber(element);
  //   var isAlphaNumeric = checkAlphaNumeric(element);
  //   isAlphabeticalString ? alphabeticalStringCount++ : alphabeticalStringCount;
  //   isInt ? intCount++ : intCount;
  //   isRealNumber ? realNumberCount++ : realNumberCount;
  //   isAlphaNumeric ? alphaNumericCount++ : alphaNumericCount;
  // });
  // return {AlphabeticalString: alphabeticalStringCount, Integer: intCount, RealNumber: realNumberCount, AlphaNumeric: alphaNumericCount};

  return new Promise((resolve, reject) => {
      fs.readFile('message.txt', 'utf8', (err, data) => {
        var fileData = data.toString();
        var generatedArray = fileData.split(',');
        generatedArray.forEach(element => {
          var isAlphabeticalString = checkAlphabeticalString(element);
          var isInt = checkInteger(element);
          var isRealNumber = checkRealNumber(element);
          var isAlphaNumeric = checkAlphaNumeric(element);
          isAlphabeticalString ? alphabeticalStringCount++ : alphabeticalStringCount;
          isInt ? intCount++ : intCount;
          isRealNumber ? realNumberCount++ : realNumberCount;
          isAlphaNumeric ? alphaNumericCount++ : alphaNumericCount;
        });
          resolve({AlphabeticalString: alphabeticalStringCount, Integer: intCount, RealNumber: realNumberCount, AlphaNumeric: alphaNumericCount});
      })
  });
}

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
});

router.get('/generate-file', (req, res, next) => {

  // var fileSizeInMegabytes = getFilesizeInBytes('message.txt') / (1024*1024);
  // var stringSizeInMegabytes = 0;
  // var randomMessage = "";
  // const maxValue = 1000000;

  // while(stringSizeInMegabytes < 4) {
  //   if(stringSizeInMegabytes >= 4) break;
  //   for(let i = 0; i < 50; i++) {
  //     var randomNumber = Math.floor(Math.random()*40);
  //     if(randomNumber < 10) {
  //       randomMessage = randomMessage + (Math.random()*maxValue).toString() + ',';
  //     } else if(randomNumber >= 10 && randomNumber < 20) {
  //       randomMessage = randomMessage + parseInt(Math.random()*maxValue).toString() + ',';
  //     } else if(randomNumber >= 20 && randomNumber < 30) {
  //       randomMessage = randomMessage + generateAlphaNumeric(32, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + ',';
  //     } else if(randomNumber >= 30) {
  //       randomMessage = randomMessage + generateAlphaNumeric(32, 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') + ',';
  //     }
  //   }
  //   stringSizeInMegabytes = getStringSizeInBytes(randomMessage) / (1024*1024);
  //   if(stringSizeInMegabytes >= 4 ) {
  //     fs.writeFileSync('message.txt', randomMessage);
  //   }
  //   // fileSizeInMegabytes = getFilesizeInBytes('message.txt') / (1024*1024);

  // }

  var generatedStringToSave = generateStringForFile();
  fs.writeFileSync('message.txt', generatedStringToSave);
  res.render('home', {
    pageTitle: 'Home',
    path: '/',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    report: null,
    file: true
  });
  // res.statusCode = 302;
  // res.setHeader('Location', '/');
  // return res.end();
});

router.get('/download-file', (req, res, next) => {
  res.download('message.txt', 'message.txt');
});

router.get('/report-file', (req, res, next) => {
  getReport().then(result => {
    var report = result;
    res.render('home', {
      pageTitle: 'Home',
      path: '/',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      report: report,
      file: true
    });
  });
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
