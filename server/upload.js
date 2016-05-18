var multiparty = require('multiparty');
var fs = require('fs');
var imageinfo = require('imageinfo');
var path = require('path');
var utile = require("../utile/utile");
var basePath = path.join(process.cwd(), "public/photo/");
var optioins = {};
var imgs = [];

module.exports = function(req, res, dao, cb) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
        if (err) throw err;
        getData(files.uploadFile[0].path, function(data){
            var singName = utile.SignMD5(data);
            var result = { code: 200, msg: "SUCCESS", url: "" };
            console.log(imgs.indexOf(singName))
            if(imgs.indexOf(singName) == -1){
                imgs.push(singName);
                var info = imageinfo(data);
                singName += "."+info.format;
                saveData(data, singName);
                result.url = singName;
                dao.push(result);
            }
            cb(result);
        })

        /*cpFile(files.uploadFile[0].path, function(result) {
            if (200 == result.code) {
                var imginfo = { "name": "", "url": "" };
                imginfo.name = "";
                imginfo.url = result.url;
                dao.push(imginfo);
            }
            cb(result);
        });*/
    });
};

/*
获取图片二进制数据
*/
function getData(filePath, cb){
    fs.readFile(filePath, function(err, data) {
        if (err) throw err;
        cb(data);
    });
}

function saveData(data, name){
    fs.writeFile(path.join(basePath, name), data, { encoding: "utf8" }, function(err) {
        if (err) throw err;
    });
}

/*function cpFile(filePath, cb) {
    var basePath = path.join(process.cwd(), "public/photo/");
    var basePathThumbnail = path.join(process.cwd(), "public/thumbnail/");
    var result = { code: 200, msg: "SUCCESS", url: "" };
    fs.readFile(filePath, function(err, data) {
        if (err) throw err;
        var info = imageinfo(data);
        if (info) {
            var name = crypto.createHash('md5').update(data.toString()).digest("hex");
            name += "." + info.format;
            fs.writeFile(path.join(basePath, name), data, { encoding: "utf8" }, function(err) {
                if (err) throw err;
                result.url = name;
                cb(result);
            });
        } else {
            result.code = 500;
            result.msg = "File Type ERROR";
            cb(result);
        }
    });

}*/
