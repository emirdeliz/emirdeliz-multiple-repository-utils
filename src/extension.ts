import * as vscode from 'vscode';
import * as utils from 'emirdeliz-vs-extension-utils';
import * as constants from './constants';

async function makePull() {
	const foldersWithGitConfig = await utils.getAllFoldersWithGitConfig(
		constants.SETTINGS_KEY_BASE,
		constants.SETTINGS_KEY_GIT.IgnoreFolders
	);
	await utils.runGitPullOnFolders(foldersWithGitConfig);
}

async function makeMerge() {
	const foldersWithGitConfig = await utils.getAllFoldersWithGitConfig(
		constants.SETTINGS_KEY_BASE,
		constants.SETTINGS_KEY_GIT.IgnoreFolders
	);
	const branchOrigin = utils.getSettingsByKey<string>(
		constants.SETTINGS_KEY_BASE,
		constants.SETTINGS_KEY_GIT.BranchOrigin
	);
	await utils.runGitMergeOnFolders(foldersWithGitConfig, branchOrigin);
}

function activate(context: vscode.ExtensionContext) {
	console.debug(
		`Congratulations, your extension "${constants.SETTINGS_KEY_BASE}" is now active!`
	);

	const disposablePullWorkspace = vscode.commands.registerCommand(
		`${constants.SETTINGS_KEY_BASE}.pull-workspace`,
		makePull
	);

	const disposableMergeWorkspace = vscode.commands.registerCommand(
		`${constants.SETTINGS_KEY_BASE}.merge-workspace`,
		makeMerge
	);

	context.subscriptions.push(disposablePullWorkspace);
	context.subscriptions.push(disposableMergeWorkspace);
}

export { activate, makeMerge, makePull };
