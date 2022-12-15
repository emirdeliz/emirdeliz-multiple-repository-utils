import * as vscode from './__mocks__/vscode';
import * as extension from '../extension';
import { EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS } from 'emirdeliz-vs-extension-utils/src/constants';

function testRun(
	runSpy: jest.SpyInstance,
	type: EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS
) {
	expect(runSpy).toHaveBeenCalledTimes(2);
	expect(runSpy).toHaveBeenNthCalledWith(1, `git -C repoOne ${type}`);
	expect(runSpy).toHaveBeenNthCalledWith(2, `git -C repoTwo ${type}`);
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
	type: EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS
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
	type: EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS
) {
	expect(runSpy).toHaveBeenCalledTimes(1);
	expect(runSpy).toHaveBeenCalledWith(`git -C repoTwo ${type}`);
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

		testRun(runSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull);
		testProgress(withProgressSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull);
		testReport(reportSpy);
	});

	it('should return expected output when execute merge', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const withProgressSpy = jest.spyOn(vscode.window, 'withProgress');

		await extension.makeMerge();

		testRun(runSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge);
		// testProgress(withProgressSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge);
		testReport(reportSpy);
	});

	it('should return expected output when execute pull/merge with ignoreFolders', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		jest.spyOn(vscode.workspace, 'getConfiguration').mockReturnValue({
			get: jest.fn(function () {
				return ['repoOne'];
			}),
		});

		await extension.makePull();
		testIgnoreFolders(runSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull);

		runSpy.mockReset();
		await extension.makeMerge();
		testIgnoreFolders(runSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge);
	});
});
