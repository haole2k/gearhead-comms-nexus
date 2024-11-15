const { exec } = require('pkg');

async function buildExecutable() {
  try {
    await exec([
      'src/installer/install.js',
      '--target', 'node16-win-x64',
      '--output', 'dist/bacarin-racing-installer.exe'
    ]);
    console.log('Executable built successfully!');
  } catch (error) {
    console.error('Error building executable:', error);
    process.exit(1);
  }
}

buildExecutable();