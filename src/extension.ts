import * as vscode from 'vscode';
import { getAllFoldersWithGitConfig, runGitPullOnFolders } from 'emirdeliz-vs-extension-utils';

const SETTINGS_KEY_BASE = 'emirdeliz-multi-repo-git-utils';
const SETTINGS_KEY_GIT_IGNORE_FOLDERS = 'git-ignore';

export function activate(context: vscode.ExtensionContext) {
	console.debug(
		'Congratulations, your extension "emirdeliz-dart-utils" is now active!'
	);

	const disposablePullWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.pull-workspace',
		async ({}) => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run git pull for each project on the root of the workspace.🤘...`
			);

			const workspaceFolders = vscode.workspace.workspaceFolders;
			const f = workspaceFolders
				? workspaceFolders[0]
				: ({} as vscode.WorkspaceFolder);

			if (!f?.uri || !f?.uri?.fsPath) {
				return;
			}

			const foldersWithGitConfig = getAllFoldersWithGitConfig(
				f.uri.fsPath,
				SETTINGS_KEY_BASE,
				SETTINGS_KEY_GIT_IGNORE_FOLDERS
			);
			await runGitPullOnFolders(foldersWithGitConfig);
		}
	);

	const disposableMergeWorkspace = vscode.commands.registerCommand(
		'emirdeliz-dart-utils.merge-workspace',
		async ({}) => {
			vscode.window.showInformationMessage(
				`Aloha! Let's go to run git merge for each project on the root of the workspace.🤘...`
			);

			const workspaceFolders = vscode.workspace.workspaceFolders;
			const f = workspaceFolders
				? workspaceFolders[0]
				: ({} as vscode.WorkspaceFolder);

			if (!f?.uri || !f?.uri?.fsPath) {
				return;
			}

			const foldersWithGitConfig = getAllFoldersWithGitConfig(
				f.uri.fsPath,
				SETTINGS_KEY_BASE,
				SETTINGS_KEY_GIT_IGNORE_FOLDERS
			);
			await runGitPullOnFolders(foldersWithGitConfig);
		}
	);

	context.subscriptions.push(disposablePullWorkspace);
	context.subscriptions.push(disposableMergeWorkspace);
}

// this method is called when your extension is deactivated
export function deactivate() {}
