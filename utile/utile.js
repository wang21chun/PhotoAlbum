var crypto = require('crypto');

module.exports = {
	SignMD5:function(data){
		return crypto.createHash('md5').update(data.toString()).digest("hex");
	}
};