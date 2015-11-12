#! /usr/bin/env node
var linedUpPath = process.cwd();
var fs = require('fs');
var mongoose = require('mongoose');
var prompt = require('prompt');

/*
 * Verify that we can access the config.js and models/concert.js files
 * that are needed for the linedup-cli - if this is not the case, we're probably
 * not in a LinedUp installation.
 *
 * It appears there is no (reliable) way to check for a file other than this
 * crap oO
 */
var isConfigAvailable;
var isModelAvailable;
// Check if the config file is available
try {
  var isConfigAvailable = fs.readFileSync(linedUpPath + '/config.js'); 
  isConfigAvailable = true;
} catch(err) {
  isConfigAvailable = false;  
}
// Check if there's a model file
try {
  isModelAvailable = fs.readFileSync(linedUpPath + '/models/concert.js');
  isModelAvailable = true;
} catch(err) {
  isModelAvailable = false;  
}
/*
 * We must stop here, this is boolean land! 
 *
 * But seriously, what the fuck? There must be a better way to cast
 * a Buffer into a boolean. 
 */
if( !(isConfigAvailable && isModelAvailable) ) {
  console.log(' Script run from directory: ' + linedUpPath);
  console.log(' No configuration file found! Expecting file at ' + linedUpPath + '/config.js');
  console.log(' No models file found! Expecting file at ' + linedUpPath + '/models/concert.js');
  console.log(' Did you run linedup-cli from within a LinedUp installation?');
  console.log(' =========================================== ');
  console.log(' See https://github.com/kevingimbel/linedup-cli for more information.');
  // Exit the process.
  process.exit();
} else {
  var config = require(linedUpPath + '/config.js');
  var Concert = require(linedUpPath + '/models/concert');
}

// Connect to the database
mongoose.connect(config.mongodb);

// Schema for input.
var schema = {
   properties: {
     name: {
       pattern: /^[a-zA-Z\s+\-\d+]+$/,
       required: true
     },
     venue: {
       pattern: /^[a-zA-Z\s+\-\d+]+$/,
       required: true
     },
     city: {
       pattern: /^[a-zA-Z\s+\-\d+]+$/,
       required: true
     },
     country: {
       pattern: /^[a-zA-Z\s\-]+$/,
       required: true,
       default: 'Germany'
     },
     date: {
       pattern: /^\d{4}$/,
       required: true
     }
   }
 };

 //
 // Start the prompt
 //
 prompt.start();

 //
 // Get the relevant data from user input
 //
prompt.get(schema, function(err, result) {
  if(err) {
    throw new Error('There has been an error!');
    process.exit();
  }

  console.log('  Name: ' + result.name);
  console.log('  Venue: ' + result.venue);
  console.log('  City: ' + result.city);
  console.log('  Country: ' + result.country);
  console.log('  Date: ' + result.date);

  var concert = new Concert();

  concert.name    = result.name;
  concert.venue   = result.venue;
  concert.date    = result.date;
  concert.country = result.country;
  concert.city    = result.city;

  concert.save(function(err) {
      if(err) {
        console.log('Error saving!');
        // Exit after error.
        process.exit();
      }
    console.log('Concert created!');
    process.exit();
  });
});
