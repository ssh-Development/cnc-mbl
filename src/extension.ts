// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('cnc-mbl.activate', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		vscode.languages.setTextDocumentLanguage(editor.document, "sinumerik");
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cnc-mbl.hc0', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		vscode.languages.setTextDocumentLanguage(editor.document, "sinumerik");

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
					var matches = x.toUpperCase().matchAll(pattern);
					for (const match of matches) {
						if (i == 0) {
							var startPos = new vscode.Position(selection.start.line + i, selection.start.character + match.index);
						}
						else {
							var startPos = new vscode.Position(selection.start.line + i, match.index);
						}

						var endPos = new vscode.Position(selection.start.line + i, startPos.character + match[0].length);
						var range = new vscode.Range(startPos, endPos);

						if (match[1] == "Z") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "X$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "X$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "X$2$3$5$6"));
								}
							}
						}

						if (match[1] == "X") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "Y$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "Y$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "Y$2$3$5$6"));
								}
							}
						}

						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}
					}

					// G42 <-> G41
					const pathPattern = /(\s+)(G41|G42)(\s+)/g;
					var matches = x.toUpperCase().matchAll(pathPattern);
					for (const match of matches) {
						if (i == 0) {
							var startPos = new vscode.Position(selection.start.line + i, selection.start.character + match.index);
						}
						else {
							var startPos = new vscode.Position(selection.start.line + i, match.index);
						}

						var endPos = new vscode.Position(selection.start.line + i, startPos.character + match[0].length);
						var range = new vscode.Range(startPos, endPos);

						if (match[2] == "G41") {
							eb.replace(range, match[0].replace(pathPattern, "$1G42$3"));
						}

						if (match[2] == "G42") {
							eb.replace(range, match[0].replace(pathPattern, "$1G41$3"));
						}
					}
				});
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cnc-mbl.hc90', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		vscode.languages.setTextDocumentLanguage(editor.document, "sinumerik");

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
					var matches = x.toUpperCase().matchAll(pattern);
					for (const match of matches) {
						if (i == 0) {
							var startPos = new vscode.Position(selection.start.line + i, selection.start.character + match.index);
						}
						else {
							var startPos = new vscode.Position(selection.start.line + i, match.index);
						}

						var endPos = new vscode.Position(selection.start.line + i, startPos.character + match[0].length);
						var range = new vscode.Range(startPos, endPos);

						if (match[1] == "Z") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "Y$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "Y$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "Y$2$3$5$6"));
								}
							}
						}

						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}
					}

					// G42 <-> G41
					const pathPattern = /(\s+)(G41|G42)(\s+)/g;
					var matches = x.toUpperCase().matchAll(pathPattern);
					for (const match of matches) {
						if (i == 0) {
							var startPos = new vscode.Position(selection.start.line + i, selection.start.character + match.index);
						}
						else {
							var startPos = new vscode.Position(selection.start.line + i, match.index);
						}

						var endPos = new vscode.Position(selection.start.line + i, startPos.character + match[0].length);
						var range = new vscode.Range(startPos, endPos);

						if (match[2] == "G41") {
							eb.replace(range, match[0].replace(pathPattern, "$1G42$3"));
						}

						if (match[2] == "G42") {
							eb.replace(range, match[0].replace(pathPattern, "$1G41$3"));
						}
					}
				});
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cnc-mbl.hc180', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		vscode.languages.setTextDocumentLanguage(editor.document, "sinumerik");

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
					var matches = x.toUpperCase().matchAll(pattern);
					for (const match of matches) {
						if (i == 0) {
							var startPos = new vscode.Position(selection.start.line + i, selection.start.character + match.index);
						}
						else {
							var startPos = new vscode.Position(selection.start.line + i, match.index);
						}

						var endPos = new vscode.Position(selection.start.line + i, startPos.character + match[0].length);
						var range = new vscode.Range(startPos, endPos);


						if (match[1] == "Z") {
							eb.replace(range, match[0].replace(pattern, "X$2$3$4$5$6"));
						}

						if (match[1] == "X") {
							eb.replace(range, match[0].replace(pattern, "Y$2$3$4$5$6"));
						}

						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}
					}
				});
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cnc-mbl.hc270', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		vscode.languages.setTextDocumentLanguage(editor.document, "sinumerik");

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
					var matches = x.toUpperCase().matchAll(pattern);
					for (const match of matches) {
						if (i == 0) {
							var startPos = new vscode.Position(selection.start.line + i, selection.start.character + match.index);
						}
						else {
							var startPos = new vscode.Position(selection.start.line + i, match.index);
						}

						var endPos = new vscode.Position(selection.start.line + i, startPos.character + match[0].length);
						var range = new vscode.Range(startPos, endPos);

						if (match[1] == "X") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "X$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "X$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "X$2$3$5$6"));
								}
							}
						}

						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}

						if (match[1] == "Z") {
							eb.replace(range, match[0].replace(pattern, "Y$2$3$4$5$6"));
						}
					}
				});
			});
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cnc-mbl.number', async () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		var document = editor.document;

		vscode.languages.setTextDocumentLanguage(editor.document, "sinumerik");

		let i = 0;
		const result = await vscode.window.showQuickPick(['1', '2', '5', '10'], {
			placeHolder: 'Schrittfolge...',
		});

		if (result)
			var numberSpan = parseInt(result);

		const mpfPattern = /^\s*%MPF\s*(\d+)/g;
		const spfPattern = /^\s*%SPF\s*(\d+)/g;
		const commentPattern = /^\s*\(/g;
		const startWhitespacePattern = /^\s*/g;
		const lineNumberPattern = /^\s*[Nn]\s*[0-9]*\s*/g;

		editor.edit(eb => {
			var lineNumber = numberSpan;
			for (var i = 0; i < document.lineCount; i++) {
				var line = document.lineAt(i);

				if (line.text.match(mpfPattern)) {
					lineNumber = numberSpan;
					continue;
				}

				if (line.text.match(spfPattern)) {
					lineNumber = numberSpan;
					continue;
				}

				var match = line.text.match(lineNumberPattern);
				if (match) {
					var range = new vscode.Range(i, 0, i, match[0].length);
					eb.replace(range, 'N' + lineNumber + ' ');
					lineNumber += numberSpan;
				}
				else {
					if (!line.text.match(commentPattern)) {
						var match = line.text.match(startWhitespacePattern);
						if (match) {
							var range = new vscode.Range(i, 0, i, match[0].length);
							eb.replace(range, 'N' + lineNumber + ' ');
							lineNumber += numberSpan;
						}
						else {
							var position = new vscode.Position(i, 0);
							eb.insert(position, 'N' + lineNumber + ' ');
							lineNumber += numberSpan;
						}
					}
				}
			}
		});
	}));

	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider("sinumerik", {
		provideDocumentSymbols(document: vscode.TextDocument,
			token: vscode.CancellationToken): Thenable<vscode.SymbolInformation[]> {
			return new Promise((resolve, reject) => {
				var symbols: vscode.SymbolInformation[] = [];

				const mpfPattern = /%MPF\s*(\d+)/g;
				const spfPattern = /%SPF\s*(\d+)/g;
				const infoPattern = /INFO:\+(.*)\+/g;

				for (var i = 0; i < document.lineCount; i++) {
					var line = document.lineAt(i);

					var match = mpfPattern.exec(line.text);
					if (match) {
						var mpfName = match[1];
						symbols.push({
							containerName: "mpf",
							name: "MPF " + mpfName,
							kind: vscode.SymbolKind.Field,
							location: new vscode.Location(document.uri, line.range)
						})
					}

					var match = spfPattern.exec(line.text);
					if (match) {
						var spfName = match[1];
						var spfInfo = null;
						if (document.lineCount >= i + 2) {
							match = infoPattern.exec(document.lineAt(i + 1).text);
							if (match) { spfInfo = match[1]; }
							match = infoPattern.exec(document.lineAt(i + 2).text);
							if (match) { spfInfo = match[1]; }
						}


						symbols.push({
							containerName: "spf",
							name: "SPF " + spfName + ": " + spfInfo,
							kind: vscode.SymbolKind.Package,
							location: new vscode.Location(document.uri, line.range)
						})
					}
				}

				resolve(symbols);
			});
		}
	}));

}

// This method is called when your extension is deactivated
export function deactivate() { }
