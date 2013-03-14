'use strict';

module.exports = function (grunt) {

// Project configuration

	grunt.initConfig({
		pkg: '<json:package.json>',

		coffee: {
			compile: {
				file: {
					'public/scripts/dist.js': ['public/coffee/*.*coffee']
				}
			}
		},

		watch: {
			files: ['coffee/*.*coffee'],
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

	grunt.loadNpmTasks('grunt-contrib-coffee');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-docco');

	grunt.registerTask('default', ['docco', 'coffee']);
	grunt.registerTask('docs',    ['docco']);

};