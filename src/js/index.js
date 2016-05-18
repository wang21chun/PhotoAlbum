'use strict';
(function($, Vue) {

    function UploadImage(options) {
        this.options = options;
        this.progressall = undefined;
    }
    UploadImage.prototype = {
        init: function() {
            this.progressall = $(this.options.progressall);
            return this;
        },
        setValue: function(number) {
            var cs = { "height": number + "%" };
            if (number >= 100) {
                cs['border-radius'] = "6px";
                cs['height'] = number + "%";
            }
            this.progressall.css(cs);
            this.progressall.text(number + "%");
        }
    }

    var vm = new Vue({
        el: '#photo-wall',
        data: {
            imgs: []
        },
        methods: {
            getData: function() {
                $.get("/list", function(data) {
                    vm.imgs = data;
                    vm.show();
                }, "json");
            },
            show: function() {
                var $_row = $('<div class="row"/>');
                var data = vm.imgs;
                console.log(data);
                var length = data.length;
                for (var i = 0; i < length; i++) {
                    var $_col = $('<div class="col-md-2"/>');
                    var $_img = $('<img class="img-thumbnail center-block"/>');
                    $_img.prop({ "alt": data[i].name, "src": "/photo/" + data[i].url });
                    $_col.append($_img);
                    $_row.append($_col);
                }
                $(vm.$el).append($_row);
            }
        }
    });
    vm.getData();

    var uploadVm = new Vue({
        el: '#upload-modal',
        data: {},
        methods: {
            upload: function() {
                var uploadImage = new UploadImage({
                    progressall: "#upload-img"
                }).init();
                var $_uf = $('#upload-file');
                var url = "/upload";
                $_uf.fileupload({
                    url: url,
                    dataType: 'json',
                    autoUpload: true,
                    acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                    done: function(e, data) {
                        console.log("result", data.result);
                    },
                    progressall: function(e, data) {
                        var progress = parseInt(data.loaded / data.total * 100, 10);
                         uploadImage.setValue(progress);
                    },
                    send: function(e, data) {
                        console.log("data", data, e);
                    }
                })
            },
            reflash: function() {
                vm.getData();
            }
        }
    });
    uploadVm.upload();


})(jQuery, Vue);
