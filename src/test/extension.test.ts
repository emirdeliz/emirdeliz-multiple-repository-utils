import * as constants from 'emirdeliz-vs-extension-utils/dist/constants';
import * as vscode from './__mocks__/vscode';
import * as extension from '../extension';

jest.mock('fs');

function testRun(
	runSpy: jest.SpyInstance,
	type: constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS,
	branchOrigin?: string
) {
	expect(runSpy).toHaveBeenCalledTimes(2);
	expect(runSpy).toHaveBeenNthCalledWith(
		1,
		`git -C repoOne ${type}${branchOrigin ? ` origin/${branchOrigin}` : ''}`
	);
	expect(runSpy).toHaveBeenNthCalledWith(
		2,
		`git -C repoTwo ${type}${branchOrigin ? ` origin/${branchOrigin}` : ''}`
	);
}

function testReport(reportSpy: jest.SpyInstance) {
	expect(reportSpy).toHaveBeenCalledTimes(2);
	expect(reportSpy).toHaveBeenNthCalledWith(1, {
		increment: 50,
		message: 'Running on repoOne (1 of 2)',
	});

	expect(reportSpy).toHaveBeenNthCalledWith(2, {
		increment: 50,
		message: 'Running on repoTwo (2 of 2)',
	});
}

function testProgress(
	withProgressSpy: jest.SpyInstance,
	type: constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS
) {
	expect(withProgressSpy).toHaveBeenCalledTimes(1);
	expect(withProgressSpy).toHaveBeenCalledWith(
		expect.objectContaining({
			title: `Making ${type}... 🤘`,
		}),
		expect.any(Function)
	);
}

function testIgnoreFolders(
	runSpy: jest.SpyInstance,
	type: constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS,
	branchOrigin?: string
) {
	expect(runSpy).toHaveBeenCalledTimes(1);
	expect(runSpy).toHaveBeenCalledWith(
		`git -C repoTwo ${type}${branchOrigin ? ` origin/${branchOrigin}` : ''}`
	);
}

describe('Commands', function () {
	beforeEach(function () {
		jest.clearAllMocks();
	});

	it('should return expected output when execute pull', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const withProgressSpy = jest.spyOn(vscode.window, 'withProgress');

		await extension.makePull();

		testRun(runSpy, constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull);
		testProgress(
			withProgressSpy,
			constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull
		);
		testReport(reportSpy);
	});

	it('should return expected output when execute merge', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const withProgressSpy = jest.spyOn(vscode.window, 'withProgress');

		await extension.makeMerge();

		const branchOrigin = 'feature/login';
		testRun(
			runSpy,
			constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge,
			branchOrigin
		);
		testProgress(
			withProgressSpy,
			constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge
		);
		testReport(reportSpy);
	});

	it('should return expected output when execute pull/merge with ignoreFolders', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		jest.spyOn(vscode.workspace, 'getConfiguration').mockReturnValue({
			get: function (settingKey: string) {
				switch (settingKey) {
					case 'emirdeliz-multiple-repository-utils.branch-origin':
						return 'feature/login';
					case 'emirdeliz-multiple-repository-utils.ignore-folders':
						return ['repoOne'];
					default:
						return [];
				}
			},
		});

		await extension.makePull();
		testIgnoreFolders(
			runSpy,
			constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull
		);

		runSpy.mockReset();
		await extension.makeMerge();

		const branchOrigin = 'feature/login';
		testIgnoreFolders(
			runSpy,
			constants.EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge,
			branchOrigin
		);
	});
});
