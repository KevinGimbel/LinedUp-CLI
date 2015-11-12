# LinedUp CLI
#### Command Line Interface (CLI) to create new entries for [LinedUp](https://github.com/kevingimbel/LinedUp)

The LinedUp CLI is used to communicate with MongoDB to create new concerts for [LinedUp](https://github.com/kevingimbel/LinedUp) from the command line (Terminal; Shell).

### Installation

Install the script globally via [npm](https://npmjs.com).

```js
$ npm install -g linedup-cli
```

### Usage

You need to run the script from the LinedUp directory at the moment. It'll use your `config.js` and `models/concert.js` Model to interact with the database. The Script will prompt you for all the relevant fields. Below is an example of running the script.

```bash
$ cd /path/to/linedup/installation
$ linedup-cli
$ prompt: name:  Skrillex
$ prompt: venue:  Schlachthof
$ prompt: city:  Wiesbaden
$ prompt: country:  (Germany)
$ prompt: date:  2008
$  Name: Skrillex
$  Venue: Schlachthof
$  City: Wiesbaden
$  Country: Germany
$  Date: 2008
$ Concert created!
```
