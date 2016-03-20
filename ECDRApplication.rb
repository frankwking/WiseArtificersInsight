class ECDRApplication

  @@difficulty = 5
  @@flawlessHandiworkMethod = 1
  @@flawlessHandiworkRepurchase = 1
  @@willpowerSpend = 1
  @@stuntSuccesses = 0

  def self.collectAttemptStatistics(numAttempts)
    attemptArray = Array.new(numAttempts)
    attemptArray.fill {|k| rollAttempt}
    meanSuc = attemptArray.inject(0,:+) / numAttempts
  end

  def self.rollAttempt
    initialPoolSize = 23
    poolArray = [0,0,0,0,0,0]
    poolArray.fill {|j| rollPool(initialPoolSize) -  @@difficulty + @@willpowerSpend + @@stuntSuccesses}
    totSuc = poolArray.inject(0,:+)
  end

  def self.rollPool(initialPoolSize)
    poolSize = initialPoolSize

    i = 0
    successes = 0
    resultAry = [0,0,0,0,0,0,0,0,0,0]

    while i < poolSize
      i += 1
      die = rand(0..9)
      resultAry[die] = resultAry[die].to_i + 1
      case die
      when 1
      when 2
      when 3
      when 4
      when 5
      when 6
        if @@flawlessHandiworkRepurchase
            poolSize = poolSize + 1;
        end
      when 7
        successes = successes + 1;
      when 8
        successes = successes + 1;
      when 9
        successes = successes + 1;
      when 0
        successes = successes + 2;
        if @@flawlessHandiworkMethod
            poolSize = poolSize + 1;
        end
      end
    end

    if (successes -  @@difficulty) < 0 && resultAry[1].to_i > 0
      sucesses = -1
    end
    successes
  end
end
