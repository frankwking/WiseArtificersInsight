require 'sinatra'
require_relative 'ECDRApplication'

#Main Webpage Display
get '/' do
  haml:index
end
