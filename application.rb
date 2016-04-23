require 'sinatra'
require "sinatra/json"
require 'tilt/haml'

#Main Webpage Display
get '/' do
  haml :index
end
