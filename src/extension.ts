import * as vscode from 'vscode';
import {
	getAllFoldersWithGitConfig,
	runGitMergeOnFolders,
	runGitPullOnFolders,
} from 'emirdeliz-vs-extension-utils';
import { getWorkspacePath } from 'emirdeliz-vs-extension-utils';

const SETTINGS_KEY_BASE = 'emirdeliz-multiple-repo';
const SETTINGS_KEY_GIT_IGNORE_FOLDERS = 'ignoreFolders';

export function activate(context: vscode.ExtensionContext) {
	console.debug(
		`Congratulations, your extension "${SETTINGS_KEY_BASE}" is now active!`
	);

	const disposablePullWorkspace = vscode.commands.registerCommand(
		`${SETTINGS_KEY_BASE}.pull-workspace`,
		async ({}) => {
			const workspacePath = getWorkspacePath();
			if (!workspacePath?.uri || !workspacePath?.uri?.fsPath) {
				return;
			}

			const foldersWithGitConfig = getAllFoldersWithGitConfig(
				workspacePath.uri.fsPath,
				SETTINGS_KEY_BASE,
				SETTINGS_KEY_GIT_IGNORE_FOLDERS
			);

			runGitPullOnFolders(foldersWithGitConfig);
		}
	);

	const disposableMergeWorkspace = vscode.commands.registerCommand(
		`${SETTINGS_KEY_BASE}.merge-workspace`,
		async ({}) => {
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
			await runGitMergeOnFolders(foldersWithGitConfig);
		}
	);

	context.subscriptions.push(disposablePullWorkspace);
	context.subscriptions.push(disposableMergeWorkspace);
}

// this method is called when your extension is deactivated
export function deactivate() {}
