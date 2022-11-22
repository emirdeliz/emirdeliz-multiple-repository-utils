import * as vscode from 'vscode';
import * as utils from 'emirdeliz-vs-extension-utils';
import { SETTINGS_KEY_BASE, SETTINGS_KEY_GIT_IGNORE_FOLDERS } from './constants';

export function activate(context: vscode.ExtensionContext) {
	console.debug(
		`Congratulations, your extension "${SETTINGS_KEY_BASE}" is now active!`
	);

	const disposablePullWorkspace = vscode.commands.registerCommand(
		`${SETTINGS_KEY_BASE}.pull-workspace`,
		async () => {
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
		}
	);

	const disposableMergeWorkspace = vscode.commands.registerCommand(
		`${SETTINGS_KEY_BASE}.merge-workspace`,
		async () => {
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
		}
	);

	context.subscriptions.push(disposablePullWorkspace);
	context.subscriptions.push(disposableMergeWorkspace);
}

// this method is called when your extension is deactivated
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function deactivate() {}
