module.exports = function(config) {
	config.set({
		browsers : ['Chrome'],
		frameworks: ['jasmine'],
		files : [
			'../node_modules/requirejs/require.js',
			'**/*.spec.js'
		]
	});
};