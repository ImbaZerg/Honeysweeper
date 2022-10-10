const components = require.context('.', true, /\.\/((?!index)[A-Z][A-Za-z0-9]+)$/);

components.keys().forEach(key => {
	module.exports[key.substring(2)] = components(key).default;
});


const folders = require.context('.', true, /\.\/((?!index)[a-z][A-Za-z0-9]+)\/([A-Za-z0-9]+)$/);

folders.keys().forEach(key => {
	const parts = key.substring(2).split('/');

	module.exports[capitalizeFirstLetter(parts[0]) + parts[1]] = folders(key).default;
});

function capitalizeFirstLetter(str) {
	str = String(str);

	return str.charAt(0).toUpperCase() + str.slice(1);
}