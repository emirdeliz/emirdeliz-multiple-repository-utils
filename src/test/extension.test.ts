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
	expect(reportSpy).toHaveBeenNthCalledWith(
		1,
		expect.objectContaining({
			increment: 0,
			message: 'Running 1 of 2',
		})
	);

	expect(reportSpy).toHaveBeenNthCalledWith(
		2,
		expect.objectContaining({
			increment: 50,
			message: 'Running 2 of 2',
		})
	);
}

function testProgress(
	withProgressSpy: jest.SpyInstance,
	type: EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS
) {
	expect(withProgressSpy).toHaveBeenCalledTimes(2);
	expect(withProgressSpy).toHaveBeenNthCalledWith(
		1,
		expect.objectContaining({
			title: `Making ${type}... 🤘`,
		}),
		expect.any(Function)
	);

	expect(withProgressSpy).toHaveBeenNthCalledWith(
		2,
		expect.objectContaining({
			title: `Making ${type}... 🤘`,
		}),
		expect.any(Function)
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

		extension.makePull();

		testRun(runSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull);
		testProgress(withProgressSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Pull);
		testReport(reportSpy);
	});

	it('should return expected output when execute merge', async function () {
		const runSpy = jest.spyOn(vscode.window, 'sendText');
		const reportSpy = jest.spyOn(vscode.window, 'report');
		const withProgressSpy = jest.spyOn(vscode.window, 'withProgress');

		extension.makeMerge();

		testRun(runSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge);
		testProgress(withProgressSpy, EMIRDELIZ_EXTENSION_UTILS_GIT_COMMANDS.Merge);
		testReport(reportSpy);
	});
});
