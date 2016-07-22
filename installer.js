var electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'build/demoRepo-win32-x64',
    outputDirectory: 'build/windows',
    authors: 'My App Inc.',
    exe: 'demoRepo.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));