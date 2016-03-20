require 'sinatra'
require 'tilt/haml'
require_relative 'ECDRApplication'
require_relative "ArrayStatsUtil"

ECDRInstance = ECDRApplication.new

#Main Webpage Display
get '/' do
  haml:index
end
