import * as vscode from 'vscode';
import * as utils from 'emirdeliz-vs-extension-utils';
import {
	SETTINGS_KEY_BASE,
	SETTINGS_KEY_GIT_IGNORE_FOLDERS,
} from './constants';

const makePull = function () {
	const workspacePath = utils.getWorkspacePath();
	if (!workspacePath?.uri || !workspacePath?.uri?.fsPath) {
		return;
	}

	const foldersWithGitConfig = utils.getAllFoldersWithGitConfig(
		workspacePath.uri.fsPath,
		SETTINGS_KEY_BASE,
		SETTINGS_KEY_GIT_IGNORE_FOLDERS
	);
	utils.runGitPullOnFolders(foldersWithGitConfig);
};

const makeMerge = function () {
	const workspacePath = utils.getWorkspacePath();
	if (!workspacePath?.uri || !workspacePath?.uri?.fsPath) {
		return;
	}

	const foldersWithGitConfig = utils.getAllFoldersWithGitConfig(
		workspacePath.uri.fsPath,
		SETTINGS_KEY_BASE,
		SETTINGS_KEY_GIT_IGNORE_FOLDERS
	);
	utils.runGitMergeOnFolders(foldersWithGitConfig);
};

function activate(context: vscode.ExtensionContext) {
	console.debug(
		`Congratulations, your extension "${SETTINGS_KEY_BASE}" is now active!`
	);

	const disposablePullWorkspace = vscode.commands.registerCommand(
		`${SETTINGS_KEY_BASE}.pull-workspace`,
		makePull
	);

	const disposableMergeWorkspace = vscode.commands.registerCommand(
		`${SETTINGS_KEY_BASE}.merge-workspace`,
		makeMerge
	);

	context.subscriptions.push(disposablePullWorkspace);
	context.subscriptions.push(disposableMergeWorkspace);
}

export { activate, makeMerge, makePull };
