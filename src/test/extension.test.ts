import * as assert from 'assert';
import { Workbench } from 'vscode-extension-tester';
import * as sinon from 'sinon';
import * as utils from 'emirdeliz-vs-extension-utils';
import { SETTINGS_KEY_BASE } from '../constants';

// https://github.com/redhat-developer/vscode-extension-tester

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
// import * as vscode from 'vscode';
// import { SETTINGS_KEY_BASE } from '../../constants';
// import * as myExtension from '../../extension';

describe('Sample Command palette tests', async function () {
	const utilsT = { ...utils };
	const utilStub = sinon.stub(utilsT, 'getAllFoldersInDir');
	utilStub.returns(['eml-design-system', 'eml-core', 'eml-utils']);

	it('using executeCommand', async function () {
		// the simplest way to execute a command
		// this opens the command palette, puts in the command, and confirms
		await new Workbench().executeCommand(`${SETTINGS_KEY_BASE}.pull-workspace`);
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
	});

	// vscode.commands.executeCommand(`${SETTINGS_KEY_BASE}.pull-workspace`);

	// test('Sample test', () => {
	// 	assert.strictEqual(-1, [1, 2, 3].indexOf(5));
	// 	assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	// });
});
