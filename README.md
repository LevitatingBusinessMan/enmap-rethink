# Enmap-Rethink

Enmap-Rethink is a provider for the [Enmap](https://www.npmjs.com/package/enmap) module. It enables the use of a persistent data structure using RethinkDB as a backend (well, `rethinkdbdash` really). 

# This Enmap-Rethink fork
Enmap-Rethink saves objects to Rethink in Stringified JSON format even though RethinkDB is a JSON based database. This fork changes the behaviour of Enmap-Rethink by having it save objects to RethinkDB natively for better use with the official drivers and the online DataExplorer. Non-Objects (integers, strings, arrays etc.) can still be saved via Enmap though, but will end up as a property called data. 
Do note that this fork will add the key you have Enmap identify your variable with as a property called id when saving objects.

So
```js
  myColl.set('obj', { foo: 'bar' });

  myColl.set('str', 'foo');
```
will be saved in the DB as: 
```js
{
"foo":  "bar" ,
"id":  "obj"
}

{
"data":  "foo" ,
"enmapNonObj": true ,
"id":  "str"
}
```
Whereas previously they'd be saved as:
```js
{
"data":  "{"foo": "bar"}" ,
"id": "obj"
}

{
"data":  "foo" ,
"id":  "str"
}
```

## Installation

To install enmap-rethink simply run `npm i enmap-rethink`. You need to have a RethinkDB server already installed, this module does not install it for you. 

## Usage

```js
// Load Enmap
const Enmap = require('enmap');
 
// Load EnmapRethink
const EnmapRethink = require('enmap-rethink');
 
// Initialize the database with the name "test"
const rethink = new EnmapRethink({ name: 'test' });
 
// Initialize the Enmap with the provider instance.
const myColl = new Enmap({ provider: rethink });
```

Shorthand declaration: 

```js
const Enmap = require('enmap');
const EnmapRethink = require('enmap-rethink');
const myColl = new Enmap({ provider: new EnmapRethink({ name: 'test' }); });
```

> Enmap-Rethink will automatically create a separate database (default dbName: `enmap`) when loading, assuming it has permissions to do so.

## Options

```js
// Example with all options.
const rethink = new EnmapRethink({ 
  name: 'test',
  dbName: 'enmap',
  host: 'localhost',
  port: 28015
});
```

### name

The `name` option is mandatory and defines the name of the table where the data is stored. 

### dbName

The `dbName` is optional and defines the database name in the rethink server where data is stored. If multiple enmap instances connect to the same database, the same database is used with different table names. The default dbName is `enmap`.

### host

The `host` is optional and defines which host this module attempts to connect to. The default host is `localhost`.

### port

The `port` is optional and defines which port is used to connect to the Rethink DB. The default port is `28015`.