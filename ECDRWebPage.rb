require 'sinatra'
require 'tilt/haml'
require_relative 'ECDRApplication'
require_relative "ArrayStatsUtil"

ECDRInstance = ECDRApplication.new

#Main Webpage Display
get '/' do
  haml:index
end

get '/script/index.js' do
  send_file 'script/index.js'
end
