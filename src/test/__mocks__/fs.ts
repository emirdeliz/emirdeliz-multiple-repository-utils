const fs = function () {
	return {
		existsSync: function () {
			return true;
		},
		readdirSync: function () {
			return ['eml-design-system', 'eml-core', 'eml-utils'];
		},
		statSync: function () {
			return {
				isDirectory: function () {
					return true;
				},
			};
		},
	};
};

export default fs;
