# Grunt Demo

A talk for ABQ Web Geeks on getting started with Grunt.

The branches in this repo correspond to sequential steps in getting familiar
with Grunt.


## Notes

Branch 3 (BrowserSync plugin setup) and onwards use a JSON file stored outside source control.
This app_config.json file contains the proxy setting for BrowserSync, taking the following
format:

    {
      "proxy": "http://grunt-demo.dev"
    }

Alternatively, the `proxy` setting in BrowserSync's section of the
Gruntfile.js can be edited to include a proxy address directly:

    proxy: "http://grunt-demo.dev"


Slides for this talk are available at:
http://www.slideshare.net/SheelahBrennan/automate-all-the-things-with-grunt
