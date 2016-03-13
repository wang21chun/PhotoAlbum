'use strict';
(function($, Vue) {
    var vm = new Vue({
        el: '#photo-wall',
        data: {
            imgs:[]
        },
        methods: {
            getData: function() {
                $.get("/list",function(data) {
                    vm.imgs = data;
                    vm.show();
                },"json");
            },
            show: function(){
                var $_row = $('<div class="row"/>');
                var data = vm.imgs;
                console.log(data);
                var length = data.length;
                for(var i = 0; i < length; i++){
                    var $_col = $('<div class="col-md-2"/>');
                    var $_img = $('<img class="img-thumbnail center-block"/>');    
                    $_img.prop({"alt":data[i].name,"src":"http://127.0.0.1:3000/photo/"+data[i].url});
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
               $("#upload-form").ajaxSubmit({
                success:function(data){
                    
                }
               })
            },
            reflash: function(){
                vm.getData();
            }
        }
    });
})(jQuery, Vue);
