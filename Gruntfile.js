'use strict';

module.exports = function (grunt) {

// Project configuration

	grunt.initConfig({
		pkg: '<json:package.json>',

		coffeeify: {
			options: {},
			files: {
				dest: 'public/scripts/app.js',
				src: ['public/coffee/**/*.*coffee']
			 }
		},

		watch: {
			files: ['public/coffee/**/*.*coffee'],
			tasks: ['default']
		},

		docco: {
			debug: {
				src: 'public/coffee/*.*coffee',
				options: {
					output: 'docs/'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-coffeeify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-docco');

	grunt.registerTask('default', ['coffeeify']);
	grunt.registerTask('docs',    ['docco']);

};