const path = require('path');

// Load Enmap
const Enmap = require('enmap');

// Load EnmapRethink
const EnmapRethink = require(path.join(__dirname, '../index'));

// Initialize the database with the name 'test'
const rethink = new EnmapRethink({
  name: 'test',
  dbName: 'enmap_test',
  host: 'localhost',
  port: 28015
});

// Initialize the Enmap with the provider instance.
const myColl = new Enmap({ provider: rethink, fetchAll: true });

myColl.defer.then(() => {
  // Set Object
  myColl.set('obj', { foo: 'bar' });

  // Set String
  myColl.set('str', 'foo');


  console.log(myColl.get('obj'));
  console.log(myColl.get('str'));
});

