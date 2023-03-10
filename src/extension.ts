import * as vscode from "vscode";
import * as path from "path";

var fs = require("file-system");

export function activate(context: vscode.ExtensionContext) {
  console.log("My extension is now active!");

  let disposable = vscode.commands.registerCommand("petmycode.start", () => {
    // ? This create a new webview panel to display the extension
    const panel = vscode.window.createWebviewPanel(
      "phaserGame",
      "Pet My Code",
      vscode.ViewColumn.Active,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(context.extensionPath, "dist")),
        ],
      }
    );

    // ? Here we have the HTML path to show in the window
    const htmlPath = path.join(
      context.extensionPath,
      "src",
      "app",
      "index.html"
    );
    console.log(htmlPath);
    const htmlContent = fs.readFileSync(htmlPath, "utf8");

    // ? Load the Phaser game in the webview panel
    panel.webview.html = htmlContent;
  });

  context.subscriptions.push(disposable);
}

export function deactivate() {
  // ! Clean up any resources used by the extension here
}
