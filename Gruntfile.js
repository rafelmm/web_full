module.exports = function (grunt) {
	grunt.initConfig({
		sass:{
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'web_full/src/css/sass',
					src: ['*.scss'],
					dest: 'web_full/src/css',
					ext: '.css'
				}]
			}
		},
		postcss: {
			dist:{
				options: {
					map: false,
					processors: [
						require('pixrem')(), //add fallbacks for rem units
						require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
						require('cssnano')() //minify the result
					],
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: 'web_full/src/css',
					src: ['*.css'],
					dest: 'web_full/static/css',
					ext: '.min.css'
				}]
			},
			dev: {
				options: {
					map: false,
					processors: [
						require('pixrem')(), //add fallbacks for rem units
						require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
					],
				},
				files: [{
					expand: true,
					flatten: true,
					cwd: 'web_full/src/css',
					src: ['*.css'],
					dest: 'web_full/static/css',
					ext: '.css'
				}]
			}
		},
		uglify: {
			dev: {
				files: [{
					expand: true,
					flatten: true,
					cwd: 'web_full/src/js',
					src: ['*.js'],
					dest: 'web_full/static/js',
					ext: '.min.js'
				}]
			}
		},
		watch: {
			sass:{
				files: ['web_full/src/css/sass/*.scss',
						'web_full/src/css/sass/helper/*.scss'],
				tasks: ['sass']
			},
			postcss:{
				files: ['web_full/src/css/*.css'],
				tasks: ['postcss']
			},
			uglify:{
				files: ['web_full/src/js/*.js'],
				tasks: ['uglify']
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['watch']);
};