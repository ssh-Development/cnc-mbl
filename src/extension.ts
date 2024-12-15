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

		vscode.languages.setTextDocumentLanguage(editor.document, "old_sinumerik");
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cnc-mbl.hc0', () => {
		var editor = vscode.window.activeTextEditor;
		if (!editor) {
			return; // No open text editor
		}

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z|I|J|K)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
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

						if (match[1] == "K") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "I$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "I$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "I$2$3$5$6"));
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

						if (match[1] == "I") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "J$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "J$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "J$2$3$5$6"));
								}
							}
						}

						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}

						if (match[1] == "J") {
							eb.replace(range, match[0].replace(pattern, "K$2$3$4$5$6"));
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

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z|I|J|K)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
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

						if (match[1] == "K") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "J$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "J$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "J$2$3$5$6"));
								}
							}
						}

						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}

						if (match[1] == "J") {
							eb.replace(range, match[0].replace(pattern, "K$2$3$4$5$6"));
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

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z|I|J|K)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
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

						if (match[1] == "K") {
							eb.replace(range, match[0].replace(pattern, "I$2$3$4$5$6"));
						}


						if (match[1] == "X") {
							eb.replace(range, match[0].replace(pattern, "Y$2$3$4$5$6"));
						}

						if (match[1] == "I") {
							eb.replace(range, match[0].replace(pattern, "J$2$3$4$5$6"));
						}


						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}

						if (match[1] == "J") {
							eb.replace(range, match[0].replace(pattern, "K$2$3$4$5$6"));
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

		var selection = editor.selection;
		if (selection && !selection.isEmpty) {
			const selectionRange = new vscode.Range(selection.start, selection.end);
			const highlighted = editor.document.getText(selectionRange);
			const highlightedLines = highlighted.split("\r\n");

			editor.edit(eb => {
				highlightedLines.forEach((x, i) => {
					const pattern = /(X|Y|Z|I|J|K)(=|)(\s*|)(-|)(\s*|)([Rr0-9.+-\\*/]+)/g;
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

						if (match[1] == "I") {
							if (match[4] == "-") {
								eb.replace(range, match[0].replace(pattern, "I$2$3$5$6").replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+"));
							} else {
								if (match[6] != "0") {
									eb.replace(range, match[0].replaceAll("-", "M").replaceAll("+", "-").replaceAll("M", "+").replace(pattern, "I$2$3-$5$6"));
								}
								else {
									eb.replace(range, match[0].replace(pattern, "I$2$3$5$6"));
								}
							}
						}

						if (match[1] == "Y") {
							eb.replace(range, match[0].replace(pattern, "Z$2$3$4$5$6"));
						}

						if (match[1] == "J") {
							eb.replace(range, match[0].replace(pattern, "K$2$3$4$5$6"));
						}


						if (match[1] == "Z") {
							eb.replace(range, match[0].replace(pattern, "Y$2$3$4$5$6"));
						}

						if (match[1] == "K") {
							eb.replace(range, match[0].replace(pattern, "J$2$3$4$5$6"));
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
		let i = 0;
		const result = await vscode.window.showQuickPick(['1', '2', '5', '10'], {
			placeHolder: 'Schrittfolge...',
		});

		if (result) {
			var numberSpan = parseInt(result);
			if (Number.isNaN(numberSpan)) {
				return;
			}

			const mpfPattern = /^\s*%MPF\s*(\d+)/i;
			const spfPattern = /^\s*%SPF\s*(\d+)/i;
			const commentPattern = /^\s*\(/g;
			const startWhitespacePattern = /^\s*/g;
			const lineNumberPattern = /^\s*N\s*[0-9]*\s*/i;

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
		}
	}));

	context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider("old_sinumerik", {
		provideDocumentSymbols(document: vscode.TextDocument,
			token: vscode.CancellationToken): Thenable<vscode.DocumentSymbol[]> {
			return new Promise((resolve, reject) => {
				var symbols: vscode.DocumentSymbol[] = [];
				var arcFileSymbols: vscode.DocumentSymbol[] = [];
				var toolCallSymbols: vscode.DocumentSymbol[] = [];

				const toolPattern = /^.*\(\s*WERKZEUG\s*:\s*(([1-9][0-9]{5})|([1-9][0-9]{5})\s+(.+))\s*\)/i;

				const toolInfoPattern = /^.*\(\s*WZ(-|_|)INFO\s*:\s*(.+)\s*\)/i;

				const mpfPattern = /%MPF\s*(\d+)/i;
				const spfPattern = /%SPF\s*(\d+)/i;
				const infoPattern = /INFO:\+(.*)\+/i;

				for (var i = 0; i < document.lineCount; i++) {
					var line = document.lineAt(i);

					var match = toolPattern.exec(line.text);
					if (match) {
						var last = toolCallSymbols.at(-1);
						if (last) {
							last.range = new vscode.Range(last.range.start, line.range.start);
						}

						if (match[2]) {
							var symbol = new vscode.DocumentSymbol('T ' + match[2], '', vscode.SymbolKind.Property, line.range, line.range);
							toolCallSymbols.push(symbol);
							var last = arcFileSymbols.at(-1);
							if (last) {
								last.children.push(symbol);
							}
						}

						if (match[3] && match[4]) {
							var symbol = new vscode.DocumentSymbol('T ' + match[3], match[4], vscode.SymbolKind.Property, line.range, line.range);
							toolCallSymbols.push(symbol);
							var last = arcFileSymbols.at(-1);
							if (last) {
								last.children.push(symbol);
							}
						}

						if (document.lineCount >= i + 2) {
							
							var tempLine = document.lineAt(i + 1);
							match = toolInfoPattern.exec(tempLine.text);
							if (match) {
								
								var symbol = new vscode.DocumentSymbol('Info', match[2], vscode.SymbolKind.File, tempLine.range, tempLine.range);
								var last = toolCallSymbols.at(-1);
								if (last) {
									last.children.push(symbol);
								}
							}

							var tempLine = document.lineAt(i + 2);
							match = toolInfoPattern.exec(tempLine.text);
							if (match) {
								
								var symbol = new vscode.DocumentSymbol('Info', match[2], vscode.SymbolKind.File, tempLine.range, tempLine.range);
								var last = toolCallSymbols.at(-1);
								if (last) {
									last.children.push(symbol);
								}
							}
						}
					}

					var match = mpfPattern.exec(line.text);
					if (match) {
						var last = arcFileSymbols.at(-1);
						if (last) {
							last.range = new vscode.Range(last.range.start, line.range.start);
						}

						var mpfName = match[1];
						var symbol = new vscode.DocumentSymbol('MPF', mpfName, vscode.SymbolKind.Field, line.range, line.range)
						symbols.push(symbol);
						arcFileSymbols.push(symbol);
					}

					var match = spfPattern.exec(line.text);
					if (match) {
						var last = arcFileSymbols.at(-1);
						if (last) {
							last.range = new vscode.Range(last.range.start, line.range.start);
						}

						var spfName = match[1];
						var spfInfo = null;
						if (document.lineCount >= i + 2) {
							match = infoPattern.exec(document.lineAt(i + 1).text);
							if (match) { spfInfo = match[1]; }
							match = infoPattern.exec(document.lineAt(i + 2).text);
							if (match) { spfInfo = match[1]; }
						}

						if (spfInfo) {
							var symbol = new vscode.DocumentSymbol('SPF ' + spfName, spfInfo, vscode.SymbolKind.Module, line.range, line.range)
							symbols.push(symbol);
							arcFileSymbols.push(symbol);
						}
						else {
							var symbol = new vscode.DocumentSymbol('SPF ' + spfName, '', vscode.SymbolKind.Module, line.range, line.range)
							symbols.push(symbol);
							arcFileSymbols.push(symbol);
						}

					}
				}

				resolve(symbols);
			});
		}
	}));

}

// This method is called when your extension is deactivated
export function deactivate() { }
