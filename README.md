# AMO Dashboard

This is a private Mozilla dashboard to view health and performance stats for
[addons.mozilla.org](http://addons.mozilla.org). The stats are collected with
[statsd](https://github.com/etsy/statsd) and the graphs are provided by
[graphite](https://graphite.readthedocs.org/en/latest/).

## Installation

You'll need Node JS for build management. Install and compile the assets:

    npm install
    grunt watch-static

Open `public/index.html` in a browser.

## Developing With The Hot Reloader

The hot reloading server will make changes appear instantly on the page as you
edit React component code. It's pretty hot! Run it like this:

    grunt serve

Open:

    http://localhost:8080/webpack-dev-server/
