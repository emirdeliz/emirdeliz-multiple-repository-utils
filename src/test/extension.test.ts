// import * as utils from 'emirdeliz-vs-extension-utils';
import * as vscode from './__mocks__/vscode';
import * as extension from '../extension';

// jest.setTimeout(1000 * 30); // 30 seconds

describe('Commands', function () {
	it('should return expected output when execute pull', async function () {
		const sendTextSpy = jest.spyOn(vscode.window, 'sendText');
		extension.makePull();
		
		expect(sendTextSpy).toHaveBeenCalled();
		expect(sendTextSpy).
	});
});
