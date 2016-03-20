%% User Input, Character Statistics
craftAbility = 5;
intAttribute = 5;
specialization = 1;
stuntDice = 2;
stuntSuccesses = 0;
excellencyDice = 10;

%% User Input, Charm use, these are binary, 0 off 1 on.
fullExcellency = 1;
willpowerSpend = 1;
flawlessHandiworkMethod = 1;
flawlessHandiworkRepurchase = 1;

%% Statstics Controls
numTrials = 1000000;

%% Craft Attempt Rules
terminus = 6;
difficulty = 5;
targetTotal = 50;

%% Internal Variables
dicePerRollBase = (1+fullExcellency)*(craftAbility + intAttribute) + specialization +stuntDice;
rollsBotched = 0;

resultsTable = zeros(numTrials,1);
attemptFailCount = 0;
attemptSucceedCount = 0;


%% Make Multipe Trials for Statistics
for k = 1:numTrials;
    if mod(k,10000) == 0
        disp(k);
    end
    accumulatedSuc = 0;
    %% Roll One Extended Attempt Begin
    for j = 1:terminus
        %% Roll One Pool of Dice Begin
        successes = 0 + willpowerSpend + stuntSuccesses;
        rollCount = zeros(10,1);
        dicePerRoll = dicePerRollBase;
        i = 1;
        while i < dicePerRoll
            %% Single Die Begin
            dieRoll = randi(10);
            
            rollCount(dieRoll) = rollCount(dieRoll);
            
            switch dieRoll
                case 1
                case 2
                case 3
                case 4
                case 5
                case 6
                    if flawlessHandiworkRepurchase
                        dicePerRoll = dicePerRoll + 1;
                    end
                case 7
                    successes = successes + 1;
                case 8
                    successes = successes + 1;
                case 9
                    successes = successes + 1;
                case 10
                    successes = successes + 2;
                    if flawlessHandiworkMethod
                        dicePerRoll = dicePerRoll + 1;
                    end
            end
            i = i + 1;
            %Single Die End
        end
        thresholdSuc = successes - difficulty;
        if thresholdSuc < 1
            if rollCount(1) > 0
                disp('Botch!');
                rollsBotched = rollsBotched + 1;
            else
                thresholdSuc = 0;
            end
        end
        accumulatedSuc = accumulatedSuc + thresholdSuc;
        % Roll One Pool of Dice End
    end
    % Roll One Extended Attempt End
    resultsTable(k) = accumulatedSuc;
    if accumulatedSuc < targetTotal
        attemptFailCount = attemptFailCount + 1;
    else
        attemptSucceedCount = attemptSucceedCount + 1;
    end
end
% Trials End
%% Output final statistics
figure(1);
histogram(resultsTable);
attemptMean = mean(resultsTable);
attemptStdDev = std(resultsTable);

percentChance = attemptSucceedCount/numTrials;
attemptMean
attemptStdDev
percentChance