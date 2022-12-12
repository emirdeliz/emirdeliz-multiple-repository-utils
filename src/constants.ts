import * as utils from 'emirdeliz-vs-extension-utils';

export const EMIRDELIZ_EXTENSION_UTILS_TERMINAL_PREFIX_NAME = 'Ext utils';
export const EMIRDELIZ_EXTENSION_UTILS_VSCODE_SETTINGS_PREFIX = 'emirdeliz-';
export const EMIRDELIZ_EXTENSION_UTILS_GIT_NAME_FOLDER_CONFIG =
	utils.isJestEnvironment() ? 'git' : '.git';
export const EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS = {
	pull: 'pull',
	merge: 'merge,',
};

export const EMIRDELIZ_TEST_WORKSPACE_PATH = `${__dirname}/test/__mocks__/folders`;
export const EMIRDELIZ_TEST_WORKSPACE_FOLDER_FOCUS = `${__dirname}/utils`;

export const SETTINGS_KEY_BASE = 'emirdeliz-multiple-repo';
export const SETTINGS_KEY_GIT_IGNORE_FOLDERS = 'ignoreFolders';
