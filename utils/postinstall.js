#!/usr/bin/env node
'use strict';

const fs = require('fs');

try {
  if(fs.existsSync('.env')) {
    console.log('The .env file already exists, skipping postinstall.');
  } else {
    console.log('The .env file does not exist, so it will be created from the .env-example template.');
    fs.copyFileSync('.env-example', '.env')
  }

} catch (err) {
  console.log('Something went wrong during postinstall');
  console.error(err.message);
}
