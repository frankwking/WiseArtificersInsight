require 'sinatra'
require "sinatra/json"
require 'tilt/haml'
require_relative 'ExaltedCraftingDieRoller'
require_relative "ArrayStatsUtil"

ECDRInstance = ECDRApplication.new

#Main Webpage Display
get '/' do
  haml :index
end

get '/exaltedcraftingdieroller' do
  json ECDRInstance.resultsJson params
end
