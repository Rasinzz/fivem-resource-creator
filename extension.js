const fs = require('fs-extra');
const vscode = require('vscode');

let extensionPath = '';

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    extensionPath = context.extensionPath + '/templates';

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('fivem-resource-creator.createResource', async function (uri) {
        // Get User Input
        const [resourceName, resourceType] = await getUserInput();

        // Create new folder for resource
        const resourcePath = `${uri.fsPath}/${resourceName}`;
        fs.mkdirSync(resourcePath);

        // Transfer files
        let testDir = '';
        if (resourceType === 0) {
            testDir = `${extensionPath}/script`;
        } else if (resourceType === 1) {
            testDir = `${extensionPath}/nui`;
        } else if (resourceType === 2) {
            testDir = `${extensionPath}/vehicle`;
        }

        fs.moveSync(testDir, resourcePath, { overwrite: true });

        // Finished message
        vscode.window.showInformationMessage(`Created FiveM resource named: ${resourceName}`);
    });

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
    activate,
    deactivate,
};

// Functions
async function getUserInput() {
    const resourceName = await vscode.window.showInputBox({
        title: 'FiveM Server Creator (1/2)',
        placeHolder: 'e.g. esx_drugs, qb-core, svrp-poo',
        prompt: 'Enter Resource Name',
        ignoreFocusOut: true,
    });

    const options = [
        { type: 0, label: 'Script', description: 'Standard file layout for client/server resource' },
        { type: 1, label: 'NUI', description: 'Standard file layout for NUI resource (web-dev)' },
        { type: 2, label: 'Vehicle', description: 'Standard file layout for Vehicle resource' },
    ];

    const resourceType = await vscode.window.showQuickPick(options, {
        title: 'FiveM Server Creator (2/2)',
        placeHolder: 'Select Resource Type',
        matchOnDescription: true,
        ignoreFocusOut: true,
    });

    return [resourceName, resourceType.type];
}
