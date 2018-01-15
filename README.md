## Wise Artificer's Insight
Wise Artificer's Insight is designed to give a player thinking about making an Artifact or other complex project in [Exalted 3rd Edition](http://theonyxpath.com/category/worlds/exalted/) some insight into their likelihood of success.  A master craftsman of any discipline has awareness of their skill and should be able to judge what projects are trivial for them or beyond their skills.  This can be difficult because of the complex die manipulation powers available to Solars in Exalted 3rd Edition.  This program provides the crafter insight into their level of skill by providing a basic statistical analysis on a large number of crafting attempts.

The code is written mostly in Javascript.

The live website can be found at [http://frankwking.github.io/WiseArtificersInsight/](http://frankwking.github.io/WiseArtificersInsight/).

## Files
File Name | File Contents
---- | ----
arrayStatsUtil.js | Basic statistics functions
exaltedCraftingDieRoller.js | Javascript Crafting Die Roller functions
index.haml | Webpage defined using [HAML](http://haml.info/)
index.html | Webpage defined html, generated from HAML
index.js | Javascript called when you click the "Roll!" button and submit the webpage form
license.md | code use license
README.md | this file
renderHistogram.js | Draws the histogram using [d3](https://d3js.org/)
style.css | defines webpage styling
[zepto.js](http://zeptojs.com/) | Minimalist to provide basic jQuery API functionality
