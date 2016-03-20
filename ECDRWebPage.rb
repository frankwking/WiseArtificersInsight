require 'sinatra'
require_relative 'ECDRApplication'

meanSuc = ECDRApplication.collectAttemptStatistics(101)

#Main Webpage Display
get '/' do
  "Exalted Crafting Die Roller Test. MeanSuc:  #{meanSuc}"
end
