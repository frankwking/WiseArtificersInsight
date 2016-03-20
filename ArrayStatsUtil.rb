class Array
	def mean(array)
		array.inject(0,:+) / array.size.to_f
	end

	def median(array, already_sorted=false)
	  return nil if array.empty?
	  array = array.sort unless already_sorted
	  m_pos = array.size / 2
	  return array.size % 2 == 1 ? array[m_pos] : mean(array[m_pos-1..m_pos])
	end

	def mode(array)
		histogram = array.inject(Hash.new(0)) { |h,n| h[n] += 1; h}
		modes = nil
		histogram.each_pair do |item, times|
			modes << item if modes && times == modes[0] and find_all
			modes = [times, item] if (!modes && times >1) or (modes && times>modes[0])
		end
		return modes ? modes[1...modes.size] : modes
	end

	def varaince(array)
		m = mean(array)
		var = array.inject(0) { |var, x| var += (x-m)**2}
		var/((array.size-1).to_f)
	end

	def sigma(array)
		Math.sqrt(variance(x))
	end
end
