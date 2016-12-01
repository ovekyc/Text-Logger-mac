var app = Application.currentApplication();
app.includeStandardAdditions = true;

function run (input, parameters) {
  var content = input[0];
  writeTextToFile(content);
}

function writeTextToFile (text, file = '/log-file-path/log-file-name.txt', overwriteExistingContent = false) {
  text += '\n ';
  try {
    var fileString = file.toString();
    var openedFile = app.openForAccess(Path(fileString), { writePermission: true });
 
    if (overwriteExistingContent) {
      app.setEof(openedFile, { to: 0 });
    }

    app.write(text, { to: openedFile, startingAt: app.getEof(openedFile) });
    app.closeAccess(openedFile);
    return true;
  } catch(error) {
    try {
      app.closeAccess(file);
    } catch(error) {
      console.log(`Couldn't close file: ${error}`);
    }
    return false;
  }
}
