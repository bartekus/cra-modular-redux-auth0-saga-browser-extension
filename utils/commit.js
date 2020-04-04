#!/usr/bin/env node
'use strict';

const util = require('util');
const fs = require('fs-extra');
const paths = require('react-scripts/config/paths');
const exec = util.promisify(require('child_process').exec);
const spawn = require('child_process').spawnSync;

async function version(versionType) {
  const { stdout, stderr } = await exec(`npm version ${versionType} --no-git-tag-version --force`);
  if (stderr) throw stderr;
  return stdout;
}

async function updateManifest(npmVersion) {
  const manifest = await JSON.parse(fs.readFileSync(`${paths.appPublic}/manifest.json`, 'utf8'));
  manifest.version = npmVersion.substring(1);
  await fs.writeFileSync(`${paths.appPublic}/manifest.json`, JSON.stringify(manifest, null, 2));
  return null;
}

async function branch() {
  const { stdout, stderr } = await exec(`git rev-parse --abbrev-ref HEAD`);
  if (stderr) throw stderr;
  return stdout;
}

const run = async () => {
  try {
    const versionType = process.argv[2];
    const gitMessage = process.argv[3];

    if (versionType !== 'patch' && versionType !== 'minor' && versionType !== 'major') throw new Error('You need to specify npm version! [patch|minor|major]');
    if (!gitMessage) throw new Error('You need to provide a git commit message!');

    const npmVersion = await version(versionType);
    await updateManifest(npmVersion.trim());
    await spawn('git', ['add', 'package.json', 'yarn.lock', `${paths.appPublic}/manifest.json`], { stdio: 'inherit' });
    await spawn('git', ['commit', '-m', gitMessage.trim()], { stdio: 'inherit' });
    await spawn('git', ['tag', npmVersion.trim()], { stdio: 'inherit' });
    const currentBranch = await branch();
    await spawn('git', ['push', 'origin', '--follow-tags', currentBranch.trim()], { stdio: 'inherit' });
    // await spawn('git', ['status'], { stdio: 'inherit' });

  } catch (err) {
    console.log('Something went wrong:');
    console.error(err.message);
    console.error('\nPlease use this format: \nnpm run commit [patch|minor|major] "Commit message"');
  }
};

run();
