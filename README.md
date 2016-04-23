## Wise Artificer's Insight
Wise Artificer's Insight is designed to give a player thinking about making an Artifact or other complex project in Exalted 3rd Edition some insight into their likelihood of success.  A master craftsman of any discipline has awareness of their skill and should be able to judge what projects are trivial for them or beyond their skills.  This can be difficult because of the complex die manipulation powers available to Solars in Exalted 3rd Edition.  This program provides the crafter insight into their level of skill by providing a basic statistical analysis on a large number of crafting attempts.

The code is written mostly in Javascript, with a small amount of Ruby to run the Sinatra webserver.

## To Run
bundle exec ruby application.rb

## Files
application.rb: Small ruby wrapper to connect to instantiate the [Sinatra](http://www.sinatrarb.com/) server.
index.haml: Webpage defined using [HAML](http://haml.info/)
index.js: Javascript called when you click the "Roll!" button and submit the webpage form
ExaltedCraftingDieRoller.js: Javascript Crafting Die Roller functions
renderHistogram.js: Draws the histogram using [d3](https://d3js.org/)
ArrayStatsUtil.js: Basic statistics functions
[zepto.js](http://zeptojs.com/): Minimalist to provide basic jQuery API functionality
Gemfile, Gemfile.lock: Use [Ruby Gems](https://rubygems.org/) to install required Ruby libraries

## Depreciated files
ArrayStatsUtil.rb, ExaltedCraftDieRollerTest.m, and ExaltedCraftingDieRoller.rb are from early design of the program and are no longer used.  They are included for posterity.
