class ECDRApplication
    #Logical structure: pools inside attempts inside dataset
  def initialize
    #Crafting Rules
    @difficulty = 5
    @terminus = 6
    @targetThreshold = 50

    #Per Roll Options
    @fullExcellency = 1
    @willpowerSpend = 1
    @stuntDice = 2
    @stuntSuccesses = 0

    #Character Attributes
    @craftAbility = 5
    @craftArtifact = 5
    @craftAttribute = 5
    @craftSpeciality = 1
    @initialPoolSize = ([@craftAbility, @craftArtifact].max + @craftAttribute)*(1+ @fullExcellency) + @stuntDice + @craftSpeciality
    @essence = 1

    #Charms Used
    @flawlessHandiworkMethod = 1
    @flawlessHandiworkRepurchase = 1

    #Dataset
    @numAttempts = 101
    @meanSuc = 0
    @stdDevSuc = 0
    @medianSuc = 0
    @percentSuc = 0
    @attemptArray = NumArray.new(@numAttempts)
  end

  #Crafting Rules
  attr_accessor :difficulty
  attr_accessor :terminus
  attr_accessor :targetThreshold

  #Per Roll Options
  attr_accessor :fullExcellency
  attr_accessor :willpowerSpend
  attr_accessor :stuntDice
  attr_accessor :stuntSuccesses

  #Character Attributes
  attr_accessor :craftAbility
  attr_accessor :craftArtifact
  attr_accessor :craftAttribute
  attr_accessor :craftSpeciality
  attr_reader :initialPoolSize
  attr_accessor  :essence

  #Charms Used
  attr_accessor :flawlessHandiworkMethod
  attr_accessor :flawlessHandiworkRepurchase

  #Dataset
  attr_accessor :numAttempts
  attr_reader :meanSuc
  attr_reader :stdDevSuc
  attr_reader :medianSuc
  attr_reader :percentSuc

  def resultsJson(params)
    params.each do |key, value|
      send (key+'=').to_sym, value.to_i
    end
    collectAttemptStatistics
    {meanSuc: @meanSuc, medianSuc: @medianSuc, stdDevSuc: @stdDevSuc, percentSuc: @percentSuc, initialPoolSize: @initialPoolSize}
  end

  def collectAttemptStatistics
    @attemptArray = NumArray.new(@numAttempts)
    @attemptArray.fill {|k| rollAttempt}
    @meanSuc = @attemptArray.mean
    @stdDevSuc = @attemptArray.sigma
    @medianSuc = @attemptArray.median
    @percentSuc = @attemptArray.percentGreaterOrEqualThreshold(@targetThreshold)
    @meanSuc
  end

  def rollAttempt
    @initialPoolSize =  ([@craftAbility, @craftArtifact].min + @craftAttribute)*(1 + @fullExcellency) + @stuntDice + @craftSpeciality
    poolArray = Array.new(@terminus)
    poolArray.fill {|j| rollPool -  @difficulty + @willpowerSpend + @stuntSuccesses}
    totSuc = poolArray.inject(0,:+)
  end

  def rollPool
    poolSize = @initialPoolSize

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
        if @flawlessHandiworkRepurchase > 0
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
        if @flawlessHandiworkMethod > 0
            poolSize = poolSize + 1;
        end
      end
    end

    if (successes -  @difficulty) < 0 && resultAry[1].to_i > 0
      sucesses = -1
    end
    successes
  end
end
