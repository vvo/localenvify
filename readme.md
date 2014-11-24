# localenvify

[defunctzombie/localenv](https://github.com/defunctzombie/localenv) and [hughsk/envify](https://github.com/hughsk/envify) combined for [substack/node-browserify](https://github.com/substack/node-browserify) modules.

Yes, it's a browserify transform.

“[12factor config](http://12factor.net/config) applied to frontend builds.”

## Installation

```shell
npm install localenvify --save
```

## TL;DR; example

Let's say you have a frontend `index.js`:

```js
var request = require('superagent');
var api = process.env.API_ENDPOINT; // API http endpoint 
request
  .get(api)
  .end(function apiCalled(res) {
    console.log(res.status);
  })
```

And a `.env` file sitting in your current working dir.

```sh
API_ENDPOINT=http://omg-api.com.dev
```

Running browserify with the localenvify transform:

```shell
browserify -t localenvify index.js
# ...
# var request = require("superagent");
# var api = "http://omg-api.com.dev";
# ...
```

Now you don't want to store production environment config files in your repo:

```shell
API_ENDPOINT="http://omg-api.com.production" browserify -t localenvify index.js 
# ...
# var request = require("superagent");
# var api = "http://omg-api.com.production";
# ...
```

## Specifying a custom env file

[defunctzombie/localenv](https://github.com/defunctzombie/localenv) only loads .env files when `NODE_PRODUCTION !== 'production'`.

You can pass transform options to localenvify to load custom .env files.

### Command line

```shell
browserify -t [ localenvify --envfile .env.test  ] index.js 
```

### Package.json

```json
{
  "browserify": {
    "transform": [
      ["localenvify", {"envfile": ".env.test"}]
    ]
  }
}
```

## .env files

As localenvify uses [defunctzombie/localenv](https://github.com/defunctzombie/localenv), if you have a [.env file](https://github.com/defunctzombie/localenv#env-files) in the directory where browserify ran, it will be used.

You should use .env files for developer or test environments, not for production* environments.
