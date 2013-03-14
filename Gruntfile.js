'use strict';

module.exports = function (grunt) {

// Project configuration

	grunt.initConfig({
		pkg: '<json:package.json>',

		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: [
					'!scripts/vendor/prefixfree.js',
					'scripts/vendor/underscore.js',
					'scripts/vendor/jquery.js',
					'scripts/vendor/*.js',
					'scripts/main.js'
				],
				dest: 'scripts/main.combined.min.js'
			}
		},

		jshint: {
			all: [
				'scripts/main.js'
			]
		},

		watch: {
			files: [
				'scripts/**/*.js',
				'!scripts/app.js'
			],
			tasks: ['default']
		},

		docco: {
			debug: {
				src: 'scripts/main.js',
				options: {
					output: 'docs/'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-docco');

	grunt.registerTask('default', ['docco', 'jshint', 'concat']);
	grunt.registerTask('docs',    ['docco']);

};