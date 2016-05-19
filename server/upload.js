
var multiparty = require('multiparty');
var fs = require('fs');
var imageinfo = require('imageinfo');
var path = require('path');
var utile = require("../utile/utile");
var basePath = path.join(process.cwd(), "public/photo/");
var optioins = {};
var imgs = [];

module.exports = function(req, res, dao, cb) {
    'use strict';
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        getData(files.uploadFile[0].path, function(data) {
            var singName = utile.SignMD5(data);
            var result = {
                code: 200,
                msg: "SUCCESS",
                url: ""
            };
            if (-1 == imgs.indexOf(singName)) {
                imgs.push(singName);
                var info = imageinfo(data);
                singName += "." + info.format;
                saveData(data, singName);
                result.url = singName;
                dao.push(result);
            }
            cb(result);
        });
    });
};

/*
获取图片二进制数据
*/
function getData(filePath, cb) {
    fs.readFile(filePath, function(err, data) {
        if (err) throw err;
        cb(data);
    });
}

function saveData(data, name) {
    fs.writeFile(path.join(basePath, name), data, {
        encoding: "utf8"
    }, function(err) {
        if (err) throw err;
    });
}
