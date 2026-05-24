/**
 * Antigravity Finance - Pure Calculation Engines
 */

const Calculators = {
  /**
   * Advanced SIP (Systematic Investment Plan) Calculation
   * Supports: Standard & Lumpsum, Annual Step-Up, and Inflation adjustment
   */
  calculateSIP({
    investmentType = 'sip', // 'sip' or 'lumpsum'
    initialAmount,          // Monthly SIP amount or Lumpsum amount
    expectedReturnRate,    // Annual expected return rate (e.g., 12%)
    tenureYears,           // Investment period in years
    annualStepUp = 0,       // Optional annual step-up percentage (e.g., 10%)
    inflationRate = 0      // Optional annual inflation rate (e.g., 6%)
  }) {
    const monthlyRate = expectedReturnRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    const stepUpRate = annualStepUp / 100;
    const annualInflation = inflationRate / 100;
    
    let totalInvested = 0;
    let totalValue = 0;
    let yearlyBreakdown = [];
    
    let currentMonthlyP = initialAmount;
    let yearInvested = 0;
    let yearInterest = 0;
    
    if (investmentType === 'sip') {
      for (let m = 1; m <= totalMonths; m++) {
        // Apply annual step-up at the beginning of each year starting from Year 2
        if (m > 1 && (m - 1) % 12 === 0) {
          currentMonthlyP = currentMonthlyP * (1 + stepUpRate);
        }
        
        // Add monthly payment and compound
        totalInvested += currentMonthlyP;
        yearInvested += currentMonthlyP;
        
        // Compound at the beginning of the month (standard SIP)
        totalValue = (totalValue + currentMonthlyP) * (1 + monthlyRate);
        
        // Record yearly snapshot
        if (m % 12 === 0) {
          const currentYear = m / 12;
          const endOfYearValue = totalValue;
          const cumulativeInvested = totalInvested;
          const cumulativeInterest = endOfYearValue - cumulativeInvested;
          
          yearlyBreakdown.push({
            year: currentYear,
            monthlyInvestment: currentMonthlyP,
            investedThisYear: yearInvested,
            cumulativeInvested: Math.round(cumulativeInvested),
            cumulativeInterest: Math.round(cumulativeInterest),
            futureValue: Math.round(endOfYearValue),
            inflationAdjustedValue: Math.round(endOfYearValue / Math.pow(1 + annualInflation, currentYear))
          });
          
          yearInvested = 0;
        }
      }
    } else {
      // Lumpsum calculation
      totalInvested = initialAmount;
      for (let y = 1; y <= tenureYears; y++) {
        totalValue = totalInvested * Math.pow(1 + expectedReturnRate / 100, y);
        const cumulativeInterest = totalValue - totalInvested;
        
        yearlyBreakdown.push({
          year: y,
          monthlyInvestment: 0,
          investedThisYear: y === 1 ? totalInvested : 0,
          cumulativeInvested: totalInvested,
          cumulativeInterest: Math.round(cumulativeInterest),
          futureValue: Math.round(totalValue),
          inflationAdjustedValue: Math.round(totalValue / Math.pow(1 + annualInflation, y))
        });
      }
      totalValue = totalInvested * Math.pow(1 + expectedReturnRate / 100, tenureYears);
    }
    
    const totalEarnedInterest = totalValue - totalInvested;
    const inflationAdjustedMaturity = totalValue / Math.pow(1 + annualInflation, tenureYears);
    
    return {
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(totalEarnedInterest),
      maturityAmount: Math.round(totalValue),
      inflationAdjustedMaturity: Math.round(inflationAdjustedMaturity),
      yearlyBreakdown
    };
  },

  /**
   * Advanced EMI (Loan) Calculation
   * Supports: Amortization schedule, extra monthly payments, and one-time prepayments
   */
  calculateLoan({
    loanAmount,
    interestRate,
    tenureYears,
    extraMonthly = 0,
    oneTimePrepayment = 0,
    oneTimePrepaymentMonth = 0
  }) {
    const monthlyRate = interestRate / 12 / 100;
    const totalMonths = tenureYears * 12;
    
    // Standard EMI formula
    // EMI = P * r * (1+r)^n / ((1+r)^n - 1)
    let standardEmi = 0;
    if (monthlyRate > 0) {
      standardEmi = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
    } else {
      standardEmi = loanAmount / totalMonths;
    }
    
    let balance = loanAmount;
    let totalInterestPaid = 0;
    let amortizationSchedule = [];
    let monthsElapsed = 0;
    
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;
    
    // Simulate month-by-month to account for extra payments
    for (let m = 1; m <= totalMonths; m++) {
      if (balance <= 0) break;
      
      const interestThisMonth = balance * monthlyRate;
      let principalThisMonth = standardEmi - interestThisMonth;
      
      // If outstanding balance is less than principal portion, cap it
      if (principalThisMonth > balance) {
        principalThisMonth = balance;
      }
      
      // Calculate prepayments
      let extraPaidThisMonth = extraMonthly;
      if (m === oneTimePrepaymentMonth) {
        extraPaidThisMonth += oneTimePrepayment;
      }
      
      // Cap prepayment so it doesn't exceed outstanding principal
      if (principalThisMonth + extraPaidThisMonth > balance) {
        extraPaidThisMonth = balance - principalThisMonth;
      }
      
      const totalPrincipalPaidThisMonth = principalThisMonth + extraPaidThisMonth;
      balance -= totalPrincipalPaidThisMonth;
      totalInterestPaid += interestThisMonth;
      monthsElapsed++;
      
      cumulativePrincipal += totalPrincipalPaidThisMonth;
      cumulativeInterest += interestThisMonth;
      
      amortizationSchedule.push({
        month: m,
        emi: Math.round(standardEmi),
        interestPaid: Math.round(interestThisMonth),
        principalPaid: Math.round(principalThisMonth),
        extraPaid: Math.round(extraPaidThisMonth),
        cumulativeInterest: Math.round(cumulativeInterest),
        cumulativePrincipal: Math.round(cumulativePrincipal),
        remainingBalance: Math.round(Math.max(0, balance))
      });
    }
    
    // Calculate standard loan parameters without prepayments for comparison
    let baselineTotalInterest = 0;
    let baselineBalance = loanAmount;
    for (let m = 1; m <= totalMonths; m++) {
      const interest = baselineBalance * monthlyRate;
      let principal = standardEmi - interest;
      if (principal > baselineBalance) principal = baselineBalance;
      baselineBalance -= principal;
      baselineTotalInterest += interest;
    }
    
    const totalAmountPaid = loanAmount + totalInterestPaid;
    const interestSaved = baselineTotalInterest - totalInterestPaid;
    const monthsSaved = totalMonths - monthsElapsed;
    
    return {
      monthlyEmi: Math.round(standardEmi),
      totalInterest: Math.round(totalInterestPaid),
      totalPayment: Math.round(totalAmountPaid),
      interestSaved: Math.round(Math.max(0, interestSaved)),
      monthsSaved: Math.max(0, monthsSaved),
      actualTenureMonths: monthsElapsed,
      schedule: amortizationSchedule
    };
  },

  /**
   * FIRE (Financial Independence, Retire Early) & Retirement Planner
   * Calculates retirement corpus targets and annual growth paths (accumulation and decumulation)
   */
  calculateFIRE({
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentExpenses, // Monthly current expenses
    inflationRate,    // Annual inflation rate (e.g., 6%)
    currentSavings,
    annualContribution,
    expectedReturnPre, // Investment returns pre-retirement (e.g., 12%)
    expectedReturnPost // Investment returns post-retirement (e.g., 8%)
  }) {
    const yearsToRetire = retirementAge - currentAge;
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const annualInflation = inflationRate / 100;
    
    // 1. Calculate inflation-adjusted annual expense at the year of retirement
    const annualCurrentExpenses = currentExpenses * 12;
    const expenseAtRetirement = annualCurrentExpenses * Math.pow(1 + annualInflation, yearsToRetire);
    
    // 2. Safe Withdrawal Rate capitalization: FIRE Target corpus
    // Standard rule: inflation-adjusted expense / (post-retire return rate - inflation rate)
    // This allows corpus to compound and withstand inflation safely.
    // If post-retire return is lower or equal to inflation, default to 4% rule (25x expenses)
    const netPostReturn = (expectedReturnPost - inflationRate) / 100;
    let fireTarget = 0;
    if (netPostReturn > 0.01) {
      fireTarget = expenseAtRetirement / netPostReturn;
    } else {
      fireTarget = expenseAtRetirement * 25; // 4% Safe Withdrawal Rate fallback
    }
    
    // 3. Accumulation Simulation
    let balance = currentSavings;
    let contribution = annualContribution;
    let accumulationBreakdown = [];
    
    accumulationBreakdown.push({
      age: currentAge,
      contribution: 0,
      savings: Math.round(balance),
      growth: 0
    });
    
    for (let y = 1; y <= yearsToRetire; y++) {
      const age = currentAge + y;
      const growth = balance * (expectedReturnPre / 100);
      balance = balance + growth + contribution;
      
      accumulationBreakdown.push({
        age,
        contribution: Math.round(contribution),
        savings: Math.round(balance),
        growth: Math.round(growth)
      });
      
      // Step up annual savings contribution by inflation rate
      contribution = contribution * (1 + annualInflation);
    }
    
    const savingsAtRetirement = balance;
    
    // 4. Decumulation (Sustainability) Simulation
    let retirementBalance = savingsAtRetirement;
    let retirementExpense = expenseAtRetirement;
    let decumulationBreakdown = [];
    let ageDepleted = null;
    
    for (let y = 1; y <= yearsInRetirement; y++) {
      const age = retirementAge + y;
      
      // Withdraw at beginning of year
      retirementBalance -= retirementExpense;
      
      let growth = 0;
      if (retirementBalance > 0) {
        growth = retirementBalance * (expectedReturnPost / 100);
        retirementBalance += growth;
      } else {
        if (ageDepleted === null) {
          ageDepleted = age;
        }
        retirementBalance = 0;
      }
      
      decumulationBreakdown.push({
        age,
        withdrawal: Math.round(retirementExpense),
        savings: Math.round(retirementBalance),
        growth: Math.round(growth)
      });
      
      // Inflate next year's expense
      retirementExpense = retirementExpense * (1 + annualInflation);
    }
    
    const isSustainable = ageDepleted === null;
    
    return {
      fireTarget: Math.round(fireTarget),
      savingsAtRetirement: Math.round(savingsAtRetirement),
      isSustainable,
      ageDepleted,
      expenseAtRetirement: Math.round(expenseAtRetirement),
      accumulationBreakdown,
      decumulationBreakdown
    };
  },

  /**
   * 50/30/20 Budget Calculator
   * Analyzes split of Needs, Wants, and Savings and integrates custom comparison trackers
   */
  calculateBudget({
    monthlyIncome,
    actualNeeds = 0,
    actualWants = 0,
    actualSavings = 0
  }) {
    const plannedNeeds = monthlyIncome * 0.5;
    const plannedWants = monthlyIncome * 0.3;
    const plannedSavings = monthlyIncome * 0.2;
    
    const diffNeeds = actualNeeds - plannedNeeds;
    const diffWants = actualWants - plannedWants;
    const diffSavings = actualSavings - plannedSavings;
    
    return {
      planned: {
        needs: Math.round(plannedNeeds),
        wants: Math.round(plannedWants),
        savings: Math.round(plannedSavings)
      },
      actual: {
        needs: Math.round(actualNeeds),
        wants: Math.round(actualWants),
        savings: Math.round(actualSavings)
      },
      differences: {
        needs: Math.round(diffNeeds),
        wants: Math.round(diffWants),
        savings: Math.round(diffSavings)
      }
    };
  },

  /**
   * Compound Interest Calculator
   * Supports: Flexible compounding frequencies (daily, monthly, quarterly, annually) and periodic contributions
   */
  calculateCompoundInterest({
    principal,
    monthlyContribution,
    annualInterestRate,
    tenureYears,
    compoundingFrequency // 'daily', 'monthly', 'quarterly', 'annually'
  }) {
    const rateDecimal = annualInterestRate / 100;
    let timesCompoundedPerYear = 12;
    
    if (compoundingFrequency === 'daily') timesCompoundedPerYear = 365;
    else if (compoundingFrequency === 'quarterly') timesCompoundedPerYear = 4;
    else if (compoundingFrequency === 'annually') timesCompoundedPerYear = 1;
    
    const totalMonths = tenureYears * 12;
    let balance = principal;
    let totalInvested = principal;
    let yearlyBreakdown = [];
    
    let yearInvested = 0;
    let yearInterest = 0;
    
    // Simulate month-by-month to allow monthly additions alongside different compounding rates
    for (let m = 1; m <= totalMonths; m++) {
      // Add monthly deposit at start of month
      balance += monthlyContribution;
      totalInvested += monthlyContribution;
      yearInvested += monthlyContribution;
      
      // Calculate compounding interest for this month
      // Note: If compounding frequency is less than monthly (e.g. quarterly or annually),
      // we accumulate interest and compound at the boundary. Otherwise, we compound immediately.
      let monthlyGrowthFactor = 1;
      
      if (compoundingFrequency === 'daily') {
        // Daily rate compounded 30 times in a month
        monthlyGrowthFactor = Math.pow(1 + rateDecimal / 365, 365 / 12);
      } else if (compoundingFrequency === 'monthly') {
        // Standard monthly compounding
        monthlyGrowthFactor = 1 + rateDecimal / 12;
      }
      
      // Compound immediate
      const oldBalance = balance;
      balance = balance * monthlyGrowthFactor;
      
      // If compounding is quarterly, add interest at months 3, 6, 9, 12...
      if (compoundingFrequency === 'quarterly' && m % 3 === 0) {
        // Compounded quarterly: (1 + r/4)
        // Since we are doing a simplified model, let's accrue quarterly interest:
        const interestAccrued = balance * (rateDecimal / 4);
        balance += interestAccrued;
      }
      
      // If compounding is annually, add interest at months 12, 24, 36...
      if (compoundingFrequency === 'annually' && m % 12 === 0) {
        const interestAccrued = balance * rateDecimal;
        balance += interestAccrued;
      }
      
      const interestEarnedThisMonth = balance - oldBalance;
      yearInterest += interestEarnedThisMonth;
      
      if (m % 12 === 0) {
        const currentYear = m / 12;
        yearlyBreakdown.push({
          year: currentYear,
          cumulativeInvested: Math.round(totalInvested),
          cumulativeInterest: Math.round(balance - totalInvested),
          futureValue: Math.round(balance)
        });
        
        yearInvested = 0;
        yearInterest = 0;
      }
    }
    
    return {
      totalInvested: Math.round(totalInvested),
      totalInterest: Math.round(balance - totalInvested),
      futureValue: Math.round(balance),
      yearlyBreakdown
    };
  }
};
