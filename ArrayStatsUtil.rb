class NumArray < Array
	def mean
		inject(0,:+) / size.to_f
	end

	def median
	  return nil if empty?
	  sort!
	  m_pos = size / 2
	  return size % 2 == 1 ? self[m_pos] : mean(self[m_pos-1..m_pos])
	end

	def histogram
		inject(Hash.new(0)) { |h,n| h[n] += 1; h}
	end

	def mode
		hist = histogram
		modes = nil
		histogram.each_pair do |item, times|
			modes << item if modes && times == modes[0] and find_all
			modes = [times, item] if (!modes && times >1) or (modes && times>modes[0])
		end
		return modes ? modes[1...modes.size] : modes
	end

	def variance
		m = mean
		var = inject(0) { |var, x| var += (x-m)**2}
		var/((size-1).to_f)
	end

	def sigma
		Math.sqrt(variance)
	end

	def percentGreaterOrEqualThreshold(threshold)
		select {|num| num >= threshold}.length/length.to_f
	end
end
