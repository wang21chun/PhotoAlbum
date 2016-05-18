var crypto = require('crypto');

module.exports = {
	SignMD5:function(data){
		var buf;
		if(Buffer.isBuffer(data)){
			var size = data.length;
			buf = new Buffer(size);
			data.copy(buf, 0, 0, size);
		}
		return crypto.createHash('md5').update(buf.toString()).digest("hex");
	}
};