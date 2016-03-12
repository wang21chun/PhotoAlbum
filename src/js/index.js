'use strict';
(function($, Vue) {
    var vm = new Vue({
        el: '#photo-wall',
        data: {
            message: 'Hello Vue.js!'
        }，
        methods: {
            getData: function() {
                $.get("/index", function(data) {
                    alert("Data Loaded: " + data);
                });
            }
        }
    });

    vm.getData();

})(jQuery, Vue);
