module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'src/js/index.js',
                dest: 'public/js/index.min.js'
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/jquery/dist',
                    src: '*.min.js',
                    dest: 'public/js/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/js',
                    src: '*.min.js',
                    dest: 'public/js/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/css',
                    src: '*.min.css',
                    dest: 'public/style/',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'node_modules/bootstrap/dist/fonts',
                    src: '**',
                    dest: 'public/fonts',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'node_modules/vue/dist',
                    src: 'vue.min.js',
                    dest: 'public/js',
                    flatten: true,
                    filter: 'isFile'
                }, {
                    expand: true,
                    cwd: 'node_modules/jquery-form',
                    src: 'jquery.form.js',
                    dest: 'public/js',
                    flatten: true,
                    filter: 'isFile'
                }],
            }
        },
        watch: {
            css:{
                files: ['src/css/*.css'],
                tasks: ['cssmin']
            },
            scriopts: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            }

        },
        cssmin: { //css文件压缩  
            css: {
                src: 'src/css/index.css', //将之前的all.css  
                dest: 'public/style/index.min.css' //压缩  
            }
        },
        clean: ["public/**"]
    });

    // 加载包含 "uglify" 任务的插件。
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-css');

    // 默认被执行的任务列表。
    grunt.registerTask('default', ['copy', 'uglify', 'cssmin']);

};