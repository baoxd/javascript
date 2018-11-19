#!/usr/bin/env node
let   inputPath = process.argv['2'];
const fileUtil = require('./file');
const path = require('path');
const fs = require('fs');
const config = require('./config');
const ignorePaths = config.ignorePaths;
const chineseMap = [];
const xlsx = require('node-xlsx');
let index = 0;


if (!inputPath) {
    inputPath = '.';
}

/**
 * 文件夹读取回调
 * @param  {[type]} files      [description]
 * @param  {[type]} sourcePath [description]
 * @return {[type]}            [description]
 */
function readDirCallback(files, sourcePath) {
    if (files && files.length > 0) {
        files.forEach(file => {
            const filePath = path.join(sourcePath, file);
            // 判断文件是否是文件夹
            const fileSate  = fs.statSync(filePath);

            if (!fileUtil.isIgnorePath(ignorePaths, filePath)) {
                // 子文件夹
                if (fileSate.isDirectory()) {
                    fileUtil.readDir(filePath, (files) => {
                        readDirCallback(files, filePath);
                    });
                }
                // 文件
                if (fileSate.isFile()) {
                    console.log(`FILE: ${filePath}`);
                    fileUtil.readFile(filePath, (code) => {
                        readFileCallback(code, filePath);
                    })
                }
            }
        });
    }
}

/**
 * 文件读取回调
 * @param  {[type]} code [description]
 * @param  {[type]} file [description]
 * @return {[type]}      [description]
 */
function readFileCallback(code, file) {
    const reg = /[\u4e00-\u9fa5]+/g;
    let execArr;

    // 清空注释
    code = code.replace(/\/\*+(\s|\S)*\*\//g, '')
            .replace(/\/\/.+/g, '');
    let flag = false;
    while(execArr = reg.exec(code)) {
        const currIndex = index++;
        chineseMap[currIndex] = [];
        if (execArr[0]) {
            if (!flag) {
                chineseMap[currIndex].push(file);
            } else {
                chineseMap[currIndex].push('');
            }
            chineseMap[currIndex].push(execArr[0]);
            flag = true;
        }
    }

}

fileUtil.readDir(inputPath, (files) => {
    readDirCallback(files, inputPath);
});

var buffer = xlsx.build([{name: "mySheetName", data: chineseMap}]);
fs.writeFile('./chinese.xlsx', buffer);


