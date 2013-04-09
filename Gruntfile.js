'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
	return connect.static(path.resolve(point));
};

module.exports = function (grunt) {
	grunt.initConfig({
		pkg: '<json:package.json>',

		coffeeify: {
			options: {},
			files: {
				dest: 'public/scripts/app.js',
				src: ['public/coffee/**/*.*coffee']
			 }
		},

		connect: {
			livereload: {
				options: {
					port: 3333,
					base: 'public',
					middleware: function (connect, options) {
						return [lrSnippet, folderMount(connect, options.base)];
					}
				}
			},
		},

		livereload: {
			port: 35729
		},

		regarde: {
			coffee: {
				files: '**/*.*coffee',
				tasks: ['coffeeify', 'livereload']
			},
			css: {
				files: '**/*.css',
				tasks: ['livereload']
			},
			html: {
				files: '**/*.html',
				tasks: ['livereload']
			}
		}
	});

	grunt.loadNpmTasks('grunt-coffeeify');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-regarde');

	grunt.registerTask('default', ['coffeeify']);
	grunt.registerTask('server',  ['livereload-start', 'connect', 'regarde']);
};