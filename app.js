/**
 * FinanceToolsHub - Core Application Controller
 */

// Localize currency rules
const CURRENCY_CONFIGS = {
  USD: { symbol: '$', locale: 'en-US' },
  INR: { symbol: '₹', locale: 'en-IN' },
  EUR: { symbol: '€', locale: 'de-DE' },
  GBP: { symbol: '£', locale: 'en-GB' },
  JPY: { symbol: '¥', locale: 'ja-JP' }
};

// Logical scale benchmarks for each currency to make sliders feel natural
const CURRENCY_SCALES = {
  INR: {
    sip: { amount: 10000, min: 1000, max: 200000, step: 1000, stepup: 10, inflation: 6 },
    loan: { amount: 5000000, min: 100000, max: 20000000, step: 100000, extra: 5000, extraMax: 100000, extraStep: 1000, prepay: 0 },
    fire: { expenses: 50000, expensesMin: 5000, expensesMax: 500000, expensesStep: 5000, savings: 1000000, savingsMax: 20000000, savingsStep: 50000, addition: 200000, additionMax: 2000000, additionStep: 10000 },
    budget: { income: 100000, incomeMax: 1000000, incomeStep: 5000 },
    compound: { principal: 500000, principalMax: 10000000, principalStep: 50000, monthly: 15000, monthlyMax: 500000, monthlyStep: 5000 }
  },
  USD: {
    sip: { amount: 500, min: 10, max: 10000, step: 10, stepup: 10, inflation: 3 },
    loan: { amount: 100000, min: 1000, max: 500000, step: 1000, extra: 100, extraMax: 5000, extraStep: 50, prepay: 0 },
    fire: { expenses: 3000, expensesMin: 100, expensesMax: 15000, expensesStep: 100, savings: 25000, savingsMax: 500000, savingsStep: 1000, addition: 12000, additionMax: 100000, additionStep: 500 },
    budget: { income: 4000, incomeMax: 25000, incomeStep: 100 },
    compound: { principal: 10000, principalMax: 100000, principalStep: 500, monthly: 200, monthlyMax: 5000, monthlyStep: 10 }
  },
  EUR: {
    sip: { amount: 500, min: 10, max: 10000, step: 10, stepup: 10, inflation: 2 },
    loan: { amount: 100000, min: 1000, max: 500000, step: 1000, extra: 100, extraMax: 5000, extraStep: 50, prepay: 0 },
    fire: { expenses: 2500, expensesMin: 100, expensesMax: 12000, expensesStep: 100, savings: 20000, savingsMax: 400000, savingsStep: 1000, addition: 10000, additionMax: 80000, additionStep: 500 },
    budget: { income: 3500, incomeMax: 20000, incomeStep: 100 },
    compound: { principal: 10000, principalMax: 100000, principalStep: 500, monthly: 200, monthlyMax: 5000, monthlyStep: 10 }
  },
  GBP: {
    sip: { amount: 400, min: 10, max: 8000, step: 10, stepup: 10, inflation: 2.5 },
    loan: { amount: 90000, min: 1000, max: 400000, step: 1000, extra: 90, extraMax: 4000, extraStep: 50, prepay: 0 },
    fire: { expenses: 2200, expensesMin: 100, expensesMax: 10000, expensesStep: 100, savings: 18000, savingsMax: 350000, savingsStep: 1000, addition: 9000, additionMax: 70000, additionStep: 500 },
    budget: { income: 3000, incomeMax: 18000, incomeStep: 100 },
    compound: { principal: 8000, principalMax: 80000, principalStep: 500, monthly: 150, monthlyMax: 4000, monthlyStep: 10 }
  },
  JPY: {
    sip: { amount: 50000, min: 1000, max: 1000000, step: 1000, stepup: 10, inflation: 1.5 },
    loan: { amount: 10000000, min: 100000, max: 50000000, step: 100000, extra: 10000, extraMax: 500000, extraStep: 5000, prepay: 0 },
    fire: { expenses: 300000, expensesMin: 10000, expensesMax: 1500000, expensesStep: 10000, savings: 2500000, savingsMax: 50000000, savingsStep: 100000, addition: 1200000, additionMax: 10000000, additionStep: 50000 },
    budget: { income: 400000, incomeMax: 2500000, incomeStep: 10000 },
    compound: { principal: 1000000, principalMax: 10000000, principalStep: 50000, monthly: 20000, monthlyMax: 500000, monthlyStep: 1000 }
  }
};

// Premium stock advice and personal finance blogs data
const ARTICLES = [
  {
    id: 1,
    category: "Stock Advice",
    badgeClass: "badge-stock",
    readTime: "6 Min Read",
    author: "FinanceToolsHub Advisory",
    title: "Practical Stock Market Advice: Indexing, Dividends & Compounding",
    excerpt: "Demystify investing in equities. Discover safe methods to diversify your capital, avoid speculation, and identify high-quality wealth compounders.",
    image: "assets/stock_guide.png",
    content: `
      <h2>Introduction: The Foundations of Equities</h2>
      <p>Investing in the stock market is arguably the most powerful mechanism ever created to compound personal savings. However, the majority of retail investors lose capital not because of market cycles, but due to speculatory trading and emotional panic. Practical stock market advice prioritizes structural safety, low cost, and long-term holding timelines.</p>
      
      <div class="article-callout">
        "The stock market is a device for transferring money from the active to the patient." — Warren Buffett
      </div>
      
      <h2>1. The Bedrock Strategy: Low-Cost Index Funds</h2>
      <p>Before selecting individual equities, every investor should establish a solid foundation using Index Funds or Exchange Traded Funds (ETFs) that track major market benchmarks (like the Nifty 50 or S&P 500). Indexing guarantees:</p>
      <ul>
        <li><strong>Instant Diversification:</strong> Spreads your risk across the top 50 to 500 industry leaders.</li>
        <li><strong>Minimal Management Expense:</strong> Index funds have expense ratios under 0.2%, leaving more capital to compound in your portfolio.</li>
        <li><strong>Consistent Performance:</strong> Over 85% of active mutual fund managers underperform standard broad indices over a 15-year horizon.</li>
      </ul>
      
      <h2>2. Identifying High-Quality Dividend Compounders</h2>
      <p>For investors allocating capital to individual stocks, seek out companies with robust structural moats. Look for businesses that possess:</p>
      <ol>
        <li><strong>Consistently High Return on Equity (ROE):</strong> A measure of how efficiently management reinvests shareholder earnings (aim for > 15%).</li>
        <li><strong>Low Debt-to-Equity Ratios:</strong> Keep leverage low to ensure survivability in recessionary periods.</li>
        <li><strong>Strong Cash Flows:</strong> Free cash flow supports dividend payouts and capital reinvestments.</li>
      </ol>
      
      <h2>Diversified Asset Allocation Model</h2>
      <table>
        <thead>
          <tr>
            <th>Asset Type</th>
            <th>Recommended Weight</th>
            <th>Core Vehicle</th>
            <th>Risk Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Broad Market Index</td>
            <td>50% - 60%</td>
            <td>Mutual Funds / ETFs</td>
            <td>Moderate-High</td>
          </tr>
          <tr>
            <td>Blue-Chip Compounders</td>
            <td>20% - 30%</td>
            <td>Individual Stocks</td>
            <td>High</td>
          </tr>
          <tr>
            <td>Fixed Income / Debt</td>
            <td>10% - 20%</td>
            <td>Government Bonds</td>
            <td>Low</td>
          </tr>
        </tbody>
      </table>
      
      <h2>3. The Golden Rule: Avoid Speculation & Leverage</h2>
      <p>Do not trade options, futures, or utilize margin leverage. Speculatory trading incurs high frictional costs (brokerage, taxes) and exposes you to complete capital loss. Stick to systematic monthly investments (SIPs) in broad asset classes to smooth out volatility through Rupee/Dollar Cost Averaging.</p>
    `
  },
  {
    id: 2,
    category: "Personal Finance",
    badgeClass: "",
    readTime: "4 Min Read",
    author: "Personal Finance Team",
    title: "The Step-Up SIP Secret: Doubling Your Projected Wealth",
    excerpt: "Learn the mathematics of incremental Systematic Investment Plans. Discover how a simple 10% annual contribution step-up exponentially boosts final maturity returns.",
    image: "assets/sip_guide.png",
    content: `
      <h2>The Core Dilemma: Flat SIP Contributions</h2>
      <p>Many investors initiate a Systematic Investment Plan (SIP) and leave the contribution flat for 10, 15, or 20 years. While this builds substantial capital, it ignores a fundamental reality: your annual income generally increases over time. Maintaining a flat SIP represents a massive missed opportunity due to the exponential nature of compounding.</p>
      
      <h2>What is a Step-Up SIP?</h2>
      <p>A Step-Up SIP is an investment strategy where you increase your monthly contribution by a fixed percentage (e.g., 5% or 10%) once every year. This simple adjustment ensures your savings keep pace with salary growth and multiplies your final wealth outcome.</p>
      
      <div class="article-callout">
        <strong>The Math of Increment:</strong> In a 20-year span at 12% expected annual return, a flat SIP of ₹10,000 monthly builds a final wealth of <strong>₹99.9 Lakhs</strong>. By introducing a modest 10% annual Step-Up, the final wealth skyrockets to <strong>₹2.12 Crores</strong>! You more than double your wealth while barely noticing the yearly adjustment in your budget.
      </div>
      
      <h2>Flat SIP vs. 10% Step-Up Comparison</h2>
      <table>
        <thead>
          <tr>
            <th>Tenure</th>
            <th>Flat SIP (₹10,000/mo)</th>
            <th>10% Step-Up SIP</th>
            <th>Difference Gained</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>5 Years</td>
            <td>₹8,24,864</td>
            <td>₹9,63,412</td>
            <td>+ ₹1,38,548</td>
          </tr>
          <tr>
            <td>10 Years</td>
            <td>₹23,23,391</td>
            <td>₹34,16,211</td>
            <td>+ ₹10,92,820</td>
          </tr>
          <tr>
            <td>15 Years</td>
            <td>₹50,45,761</td>
            <td>₹94,00,891</td>
            <td>+ ₹43,55,130</td>
          </tr>
          <tr>
            <td>20 Years</td>
            <td>₹99,91,479</td>
            <td>₹2,12,35,462</td>
            <td>+ ₹1,12,43,983</td>
          </tr>
        </tbody>
      </table>
      
      <h2>Actionable Takeaways</h2>
      <ul>
        <li><strong>Automate It:</strong> Most investment platforms permit you to configure an automatic yearly step-up directly. Activate it.</li>
        <li><strong>Align with Salary Increases:</strong> Schedule the step-up month to match your annual appraisal month.</li>
        <li><strong>Inflation Protection:</strong> A step-up SIP acts as an excellent shield against the purchasing power erosion of inflation.</li>
      </ul>
    `
  },
  {
    id: 3,
    category: "Retirement Planning",
    badgeClass: "",
    readTime: "5 Min Read",
    author: "FIRE Society",
    title: "FIRE Framework: Achieving Early Financial Independence",
    excerpt: "Demystifying Safe Withdrawal Rates, inflation erosion, post-retirement returns, and establishing your sustainable corpus target.",
    image: "assets/hero.png",
    content: `
      <h2>The Core Philosophy of FIRE</h2>
      <p>The <strong>FIRE (Financial Independence, Retire Early)</strong> movement is built on a simple, liberating principle: savings discipline paired with passive compound income can buy you time and independence decades before traditional retirement age. To retire early, you do not need extreme wealth—you need a clear mathematical framework.</p>
      
      <h2>1. The Safe Withdrawal Rate & 25x Rule</h2>
      <p>The foundational concept of retirement planning is the <strong>4% Safe Withdrawal Rate (SWR)</strong>, derived from extensive historical market studies (e.g., the Trinity Study). SWR suggests that if you withdraw 4% of your initial portfolio in Year 1, and adjust that sum for inflation every year, your portfolio is highly likely to last 30+ years.</p>
      <ul>
        <li><strong>The 25x Rule:</strong> Your target FIRE corpus must be at least 25 times your annual living expenses. If your family requires ₹6,00,000 per year, your target corpus is ₹1,50,00,000.</li>
        <li><strong>Buffer for Early Retirement:</strong> If you retire at 35 or 40, your decumulation period is 50+ years. In this case, aim for a conservative SWR of 3% to 3.5% (roughly 30x to 33x expenses) to insulate against catastrophic inflation.</li>
      </ul>
      
      <h2>2. Accounting for Inflation & Post-Retire Return</h2>
      <p>A common error is neglecting the compound impact of inflation. If inflation stands at 6%, your expenses will double in 12 years. Therefore:</p>
      <ol>
        <li><strong>Pre-Retirement:</strong> Invest in high-growth equity classes (returns > 11%) to outpace inflation.</li>
        <li><strong>Post-Retirement:</strong> Do not shift entirely to fixed deposits. Maintain a balanced allocation (e.g. 40% equity, 60% debt) to compound your remaining capital at a rate superior to inflation.</li>
      </ol>
      
      <h2>FIRE Planning Strategy</h2>
      <div class="article-callout">
        <strong>Sustainability Tip:</strong> Always run a year-by-year decumulation simulator. Ensure your remaining capital continues to compound during distribution, compensating for annual living expenses which inflate every year. Use the interactive FIRE Planner on our Calculators Hub to plot your curve.
      </div>
      
      <p>Begin by calculating your monthly savings rate. Boosting your savings from 20% to 50% reduces your time to financial independence from 37 years to just 17 years! Discipline and mathematical tracking are your ultimate wealth builders.</p>
    `
  }
];

const app = {
  currentPortalView: 'home',
  currentCalculator: 'sip',
  currentCurrency: 'INR', // Default set to Rupee
  charts: {},
  loanTableMode: 'year', // 'year' or 'month'
  fireTableMode: 'acc',   // 'acc' or 'dec'
  advancedStatus: {
    sip: false,
    loan: false,
    fire: false
  },

  init() {
    // Set dynamic prefixes on start
    this.updateCurrencyPrefixes();
    
    // Adjust all scales for the default currency (Rupee) on initial load
    this.adjustInputScales();
    
    // Bind all initial calculations
    this.updateSIP();
    this.updateLoan();
    this.updateFIRE();
    this.updateBudget();
    this.updateCompound();
    
    // Bind Home Page interactive slider
    this.syncHomeGrowth('slider');
    
    // Load articles on pages
    this.loadArticles();
  },

  setCurrency(currencyCode) {
    this.currentCurrency = currencyCode;
    this.updateCurrencyPrefixes();
    
    // Dynamically adjust inputs to make sense for the new currency scale
    this.adjustInputScales();
    
    // Update Home Page Growth Slider limits
    const scale = CURRENCY_SCALES[this.currentCurrency];
    const homeSlider = document.getElementById('home-growth-range');
    const homeInput = document.getElementById('home-growth-amount');
    
    homeSlider.min = scale.sip.min;
    homeSlider.max = scale.sip.max;
    homeSlider.step = scale.sip.step;
    homeSlider.value = scale.sip.amount;
    homeInput.value = scale.sip.amount;
    
    // Recalculate home widget
    this.syncHomeGrowth('slider');
    
    // Recalculate everything to update formatting
    this.updateSIP();
    this.updateLoan();
    this.updateFIRE();
    this.updateBudget();
    this.updateCompound();
  },

  updateCurrencyPrefixes() {
    const config = CURRENCY_CONFIGS[this.currentCurrency];
    const prefixes = document.querySelectorAll('.currency-prefix');
    prefixes.forEach(el => {
      el.innerText = config.symbol;
    });
  },

  adjustInputScales() {
    const scale = CURRENCY_SCALES[this.currentCurrency];
    if (!scale) return;

    // 1. SIP Scale Adjustments
    const sipAmt = document.getElementById('sip-amount');
    const sipAmtRange = document.getElementById('sip-amount-range');
    sipAmtRange.min = scale.sip.min;
    sipAmtRange.max = scale.sip.max;
    sipAmtRange.step = scale.sip.step;
    sipAmt.value = scale.sip.amount;
    sipAmtRange.value = scale.sip.amount;

    // 2. Loan Scale Adjustments
    const loanAmt = document.getElementById('loan-amount');
    const loanAmtRange = document.getElementById('loan-amount-range');
    loanAmtRange.min = scale.loan.min;
    loanAmtRange.max = scale.loan.max;
    loanAmtRange.step = scale.loan.step;
    loanAmt.value = scale.loan.amount;
    loanAmtRange.value = scale.loan.amount;

    const loanExtra = document.getElementById('loan-extra');
    const loanExtraRange = document.getElementById('loan-extra-range');
    loanExtraRange.min = 0;
    loanExtraRange.max = scale.loan.extraMax;
    loanExtraRange.step = scale.loan.extraStep;
    loanExtra.value = 0;
    loanExtraRange.value = 0;

    document.getElementById('loan-prepay').value = scale.loan.prepay;

    // 3. FIRE Scale Adjustments
    const fireExp = document.getElementById('fire-expenses');
    const fireExpRange = document.getElementById('fire-expenses-range');
    fireExpRange.min = scale.fire.expensesMin;
    fireExpRange.max = scale.fire.expensesMax;
    fireExpRange.step = scale.fire.expensesStep;
    fireExp.value = scale.fire.expenses;
    fireExpRange.value = scale.fire.expenses;

    const fireSavings = document.getElementById('fire-savings');
    const fireSavingsRange = document.getElementById('fire-savings-range');
    fireSavingsRange.min = 0;
    fireSavingsRange.max = scale.fire.savingsMax;
    fireSavingsRange.step = scale.fire.savingsStep;
    fireSavings.value = scale.fire.savings;
    fireSavingsRange.value = scale.fire.savings;

    const fireAdd = document.getElementById('fire-addition');
    const fireAddRange = document.getElementById('fire-addition-range');
    fireAddRange.min = 0;
    fireAddRange.max = scale.fire.additionMax;
    fireAddRange.step = scale.fire.additionStep;
    fireAdd.value = scale.fire.addition;
    fireAddRange.value = scale.fire.addition;

    // 4. Budget Scale Adjustments
    const budInc = document.getElementById('budget-income');
    const budIncRange = document.getElementById('budget-income-range');
    budIncRange.min = scale.fire.expensesMin; // reuse
    budIncRange.max = scale.budget.incomeMax;
    budIncRange.step = scale.budget.incomeStep;
    budInc.value = scale.budget.income;
    budIncRange.value = scale.budget.income;

    // Clear actual comparative budget spends to prevent confusion during scale swap
    document.getElementById('budget-act-needs').value = 0;
    document.getElementById('budget-act-wants').value = 0;
    document.getElementById('budget-act-savings').value = 0;

    // 5. Compound Scale Adjustments
    const compPr = document.getElementById('compound-principal');
    const compPrRange = document.getElementById('compound-principal-range');
    compPrRange.min = 0;
    compPrRange.max = scale.compound.principalMax;
    compPrRange.step = scale.compound.principalStep;
    compPr.value = scale.compound.principal;
    compPrRange.value = scale.compound.principal;

    const compMth = document.getElementById('compound-monthly');
    const compMthRange = document.getElementById('compound-monthly-range');
    compMthRange.min = 0;
    compMthRange.max = scale.compound.monthlyMax;
    compMthRange.step = scale.compound.monthlyStep;
    compMth.value = scale.compound.monthly;
    compMthRange.value = scale.compound.monthly;
  },

  formatVal(value) {
    const config = CURRENCY_CONFIGS[this.currentCurrency];
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: this.currentCurrency,
      maximumFractionDigits: 0
    }).format(value);
  },

  // Portal Level Navigation Routing (Home vs Calculators vs Blogs)
  navigatePortal(viewId) {
    // Switch navigation button states
    document.querySelectorAll('.nav-link-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Switch active display containers
    document.querySelectorAll('.portal-view-container').forEach(panel => {
      panel.classList.remove('active');
    });

    const activeBtn = document.getElementById(`port-nav-${viewId}`);
    if (activeBtn) activeBtn.classList.add('active');

    const activeView = document.getElementById(`portal-view-${viewId}`);
    if (activeView) activeView.classList.add('active');

    this.currentPortalView = viewId;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Resize active charts to avoid rendering artifacts
    setTimeout(() => this.resizeCharts(), 100);
  },

  // Calculators Sub-Tab Routing
  switchCalculator(calcId) {
    // Tab active style toggle
    document.querySelectorAll('#portal-view-calculators .segment-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    const activeTab = document.getElementById(`tab-btn-${calcId}`);
    if (activeTab) activeTab.classList.add('active');

    // Panel display toggle
    document.querySelectorAll('#portal-view-calculators .calculator-view').forEach(panel => {
      panel.classList.remove('active');
    });
    const activeCalc = document.getElementById(`view-${calcId}`);
    if (activeCalc) activeCalc.classList.add('active');

    this.currentCalculator = calcId;
    setTimeout(() => this.resizeCharts(), 50);
  },

  resizeCharts() {
    Object.keys(this.charts).forEach(key => {
      if (this.charts[key]) {
        this.charts[key].resize();
      }
    });
  },

  toggleAdvanced(calcKey) {
    this.advancedStatus[calcKey] = !this.advancedStatus[calcKey];
    const panel = document.getElementById(`${calcKey}-adv-panel`);
    const btn = document.getElementById(`${calcKey}-adv-toggle`);
    
    if (this.advancedStatus[calcKey]) {
      panel.classList.add('visible');
      btn.querySelector('span').innerText = 'Hide Advanced Parameters';
      btn.querySelector('svg').style.transform = 'rotate(180deg)';
    } else {
      panel.classList.remove('visible');
      
      // Reset input values to zero/defaults when disabled
      if (calcKey === 'sip') {
        document.getElementById('sip-stepup').value = 0;
        document.getElementById('sip-stepup-range').value = 0;
        document.getElementById('sip-inflation').value = 0;
        document.getElementById('sip-inflation-range').value = 0;
        this.updateSIP();
      } else if (calcKey === 'loan') {
        document.getElementById('loan-extra').value = 0;
        document.getElementById('loan-extra-range').value = 0;
        document.getElementById('loan-prepay').value = 0;
        this.updateLoan();
      }
      
      btn.querySelector('span').innerText = calcKey === 'sip' 
        ? 'Show Advanced Parameters (Step-Up & Inflation)' 
        : calcKey === 'loan' 
        ? 'Model Extra Prepayments (Accelerate Payoff)' 
        : 'Customize Returns, Life Expectancy & Inflation';
      btn.querySelector('svg').style.transform = 'rotate(0deg)';
    }
  },

  // ----------------------------------------------------
  // HOMEPAGE COMPONENT REWRITE: LIVE PREVIEWER
  // ----------------------------------------------------
  syncHomeGrowth(trigger) {
    const input = document.getElementById('home-growth-amount');
    const range = document.getElementById('home-growth-range');
    
    if (trigger === 'input') {
      range.value = input.value;
    } else {
      input.value = range.value;
    }

    const initialAmount = parseFloat(input.value) || 0;
    
    // Fast compounding calculations: 15 Years, 12% returns, 10% Stepup
    const results = Calculators.calculateSIP({
      investmentType: 'sip',
      initialAmount,
      expectedReturnRate: 12,
      tenureYears: 15,
      annualStepUp: 10,
      inflationRate: 0
    });

    document.getElementById('home-growth-maturity').innerText = this.formatVal(results.maturityAmount);
  },

  // ----------------------------------------------------
  // DYNAMIC ARTICLES RENDER ENGINE
  // ----------------------------------------------------
  loadArticles() {
    const homeGrid = document.getElementById('home-blog-grid');
    const fullGrid = document.getElementById('full-blog-grid');
    
    if (!homeGrid || !fullGrid) return;
    
    homeGrid.innerHTML = '';
    fullGrid.innerHTML = '';

    ARTICLES.forEach((art, i) => {
      // Build blog element template
      const htmlCard = `
        <article class="blog-card">
          <div class="blog-image-box">
            <img src="${art.image}" alt="${art.title} illustration image" loading="lazy">
          </div>
          <div class="blog-info">
            <div class="blog-header-meta">
              <span class="blog-badge ${art.badgeClass}">${art.category}</span>
              <span class="blog-read-time">${art.readTime}</span>
            </div>
            <h3 class="blog-title">${art.title}</h3>
            <p class="blog-excerpt">${art.excerpt}</p>
          </div>
          <div class="blog-card-footer">
            <span class="blog-author">${art.author}</span>
            <span class="blog-link-arrow" onclick="app.readArticle(${art.id})">Read Article &rarr;</span>
          </div>
        </article>
      `;

      // Home only gets trending (first 2)
      if (i < 2) {
        homeGrid.innerHTML += htmlCard;
      }
      
      // Full grid gets all articles
      fullGrid.innerHTML += htmlCard;
    });
  },

  // Article Modal overlay managers
  readArticle(articleId) {
    const art = ARTICLES.find(a => a.id === articleId);
    if (!art) return;

    const modalBody = document.getElementById('modal-article-body');
    modalBody.innerHTML = `
      <article class="article-header">
        <div class="blog-header-meta" style="justify-content: flex-start; gap: 1rem;">
          <span class="blog-badge ${art.badgeClass}">${art.category}</span>
          <span class="blog-read-time">${art.readTime}</span>
        </div>
        <h1 class="article-main-title">${art.title}</h1>
        <div class="article-author-row">
          <span>By: <strong>${art.author}</strong></span>
          <span>• Published: May 2026</span>
          <span>• SEO Verified Advisory</span>
        </div>
      </article>
      <div class="article-content">
        ${art.content}
      </div>
    `;

    document.getElementById('article-reader-modal').classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scroll
  },

  closeArticle(event) {
    document.getElementById('article-reader-modal').classList.remove('active');
    document.body.style.overflow = ''; // Restore background scroll
  },

  // ----------------------------------------------------
  // SIP CALCULATOR SYNC & RENDER
  // ----------------------------------------------------
  syncSIP(trigger) {
    const amtInput = document.getElementById('sip-amount');
    const amtRange = document.getElementById('sip-amount-range');
    const rateInput = document.getElementById('sip-rate');
    const rateRange = document.getElementById('sip-rate-range');
    const tenInput = document.getElementById('sip-tenure');
    const tenRange = document.getElementById('sip-tenure-range');
    
    const stepInput = document.getElementById('sip-stepup');
    const stepRange = document.getElementById('sip-stepup-range');
    const infInput = document.getElementById('sip-inflation');
    const infRange = document.getElementById('sip-inflation-range');

    if (trigger === 'amount') amtRange.value = amtInput.value;
    else if (trigger === 'amount-range') amtInput.value = amtRange.value;
    else if (trigger === 'rate') rateRange.value = rateInput.value;
    else if (trigger === 'rate-range') rateInput.value = rateRange.value;
    else if (trigger === 'tenure') tenRange.value = tenInput.value;
    else if (trigger === 'tenure-range') tenInput.value = tenRange.value;
    else if (trigger === 'stepup') stepRange.value = stepInput.value;
    else if (trigger === 'stepup-range') stepInput.value = stepRange.value;
    else if (trigger === 'inflation') infRange.value = infInput.value;
    else if (trigger === 'inflation-range') infInput.value = infRange.value;

    this.updateSIP();
  },

  updateSIP() {
    const type = document.getElementById('sip-type').value;
    const initialAmount = parseFloat(document.getElementById('sip-amount').value) || 0;
    const expectedReturnRate = parseFloat(document.getElementById('sip-rate').value) || 0;
    const tenureYears = parseInt(document.getElementById('sip-tenure').value) || 0;
    const annualStepUp = parseFloat(document.getElementById('sip-stepup').value) || 0;
    const inflationRate = parseFloat(document.getElementById('sip-inflation').value) || 0;

    // Adjust label depending on type
    const labelEl = document.getElementById('sip-amount-label');
    if (type === 'sip') {
      labelEl.innerText = 'Monthly Investment';
    } else {
      labelEl.innerText = 'One-time Investment';
    }

    const results = Calculators.calculateSIP({
      investmentType: type,
      initialAmount,
      expectedReturnRate,
      tenureYears,
      annualStepUp,
      inflationRate
    });

    // Write metric outputs
    document.getElementById('sip-res-invested').innerText = this.formatVal(results.totalInvested);
    document.getElementById('sip-res-interest').innerText = this.formatVal(results.totalInterest);
    document.getElementById('sip-res-total').innerText = this.formatVal(results.maturityAmount);

    const inflationBlock = document.getElementById('sip-inflation-block');
    const tableInflationHeader = document.getElementById('sip-table-inflation-header');
    
    if (inflationRate > 0) {
      inflationBlock.style.display = 'block';
      tableInflationHeader.style.display = 'table-cell';
      document.getElementById('sip-res-adjusted').innerText = this.formatVal(results.inflationAdjustedMaturity);
    } else {
      inflationBlock.style.display = 'none';
      tableInflationHeader.style.display = 'none';
    }

    // Render YoY Table
    const tableBody = document.getElementById('sip-table-body');
    tableBody.innerHTML = '';
    results.yearlyBreakdown.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>Year ${row.year}</td>
        <td class="text-right">${this.formatVal(row.cumulativeInvested)}</td>
        <td class="text-right">${this.formatVal(row.cumulativeInterest)}</td>
        <td class="text-right" style="color: var(--text-primary); font-weight: 600;">${this.formatVal(row.futureValue)}</td>
        ${inflationRate > 0 ? `<td class="text-right" style="color: var(--warning);">${this.formatVal(row.inflationAdjustedValue)}</td>` : ''}
      `;
      tableBody.appendChild(tr);
    });

    // Render/Update Chart
    this.renderSIPChart(results);
  },

  renderSIPChart(data) {
    const ctx = document.getElementById('sip-chart').getContext('2d');
    
    if (this.charts.sip) {
      this.charts.sip.destroy();
    }

    const labels = data.yearlyBreakdown.map(r => `Yr ${r.year}`);
    const investedData = data.yearlyBreakdown.map(r => r.cumulativeInvested);
    const growthData = data.yearlyBreakdown.map(r => r.futureValue);

    const gradInvested = ctx.createLinearGradient(0, 0, 0, 240);
    gradInvested.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
    gradInvested.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    const gradGrowth = ctx.createLinearGradient(0, 0, 0, 240);
    gradGrowth.addColorStop(0, 'rgba(5, 150, 105, 0.25)');
    gradGrowth.addColorStop(1, 'rgba(5, 150, 105, 0.0)');

    this.charts.sip = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Total Value',
            data: growthData,
            borderColor: '#059669',
            backgroundColor: gradGrowth,
            fill: true,
            tension: 0.3,
            borderWidth: 3,
            pointBackgroundColor: '#059669'
          },
          {
            label: 'Amount Invested',
            data: investedData,
            borderColor: '#4f46e5',
            backgroundColor: gradInvested,
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: '#4f46e5'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#475569', font: { family: 'Inter', weight: 500 } }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            borderColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatVal(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569' } },
          y: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569', callback: (v) => this.formatVal(v) } }
        }
      }
    });
  },

  // ----------------------------------------------------
  // LOAN CALCULATOR SYNC & RENDER
  // ----------------------------------------------------
  syncLoan(trigger) {
    const amtInput = document.getElementById('loan-amount');
    const amtRange = document.getElementById('loan-amount-range');
    const rateInput = document.getElementById('loan-rate');
    const rateRange = document.getElementById('loan-rate-range');
    const tenInput = document.getElementById('loan-tenure');
    const tenRange = document.getElementById('loan-tenure-range');
    const extInput = document.getElementById('loan-extra');
    const extRange = document.getElementById('loan-extra-range');

    if (trigger === 'amount') amtRange.value = amtInput.value;
    else if (trigger === 'amount-range') amtInput.value = amtRange.value;
    else if (trigger === 'rate') rateRange.value = rateInput.value;
    else if (trigger === 'rate-range') rateInput.value = rateRange.value;
    else if (trigger === 'tenure') tenRange.value = tenInput.value;
    else if (trigger === 'tenure-range') tenInput.value = tenRange.value;
    else if (trigger === 'extra') extRange.value = extInput.value;
    else if (trigger === 'extra-range') extInput.value = extRange.value;

    this.updateLoan();
  },

  updateLoan() {
    const loanAmount = parseFloat(document.getElementById('loan-amount').value) || 0;
    const interestRate = parseFloat(document.getElementById('loan-rate').value) || 0;
    const tenureYears = parseInt(document.getElementById('loan-tenure').value) || 0;
    const extraMonthly = parseFloat(document.getElementById('loan-extra').value) || 0;
    const oneTimePrepayment = parseFloat(document.getElementById('loan-prepay').value) || 0;
    const oneTimePrepaymentMonth = parseInt(document.getElementById('loan-prepay-month').value) || 0;

    const results = Calculators.calculateLoan({
      loanAmount,
      interestRate,
      tenureYears,
      extraMonthly,
      oneTimePrepayment,
      oneTimePrepaymentMonth
    });

    document.getElementById('loan-res-emi').innerText = this.formatVal(results.monthlyEmi);
    document.getElementById('loan-res-principal').innerText = this.formatVal(loanAmount);
    document.getElementById('loan-res-interest').innerText = this.formatVal(results.totalInterest);

    const blockTime = document.getElementById('loan-savings-time');
    const blockInt = document.getElementById('loan-savings-interest');

    if (results.monthsSaved > 0) {
      blockTime.style.display = 'block';
      blockInt.style.display = 'block';
      
      const yrs = Math.floor(results.monthsSaved / 12);
      const mos = results.monthsSaved % 12;
      let durationStr = '';
      if (yrs > 0) durationStr += `${yrs} Yr${yrs > 1 ? 's' : ''} `;
      if (mos > 0 || yrs === 0) durationStr += `${mos} Mo${mos > 1 ? 's' : ''}`;
      
      document.getElementById('loan-res-timesaved').innerText = durationStr;
      document.getElementById('loan-res-interestsaved').innerText = this.formatVal(results.interestSaved);
    } else {
      blockTime.style.display = 'none';
      blockInt.style.display = 'none';
    }

    this.renderLoanTable(results);
    this.renderLoanChart(results);
  },

  toggleLoanTableMode(mode) {
    this.loanTableMode = mode;
    document.getElementById('loan-table-btn-year').classList.toggle('active', mode === 'year');
    document.getElementById('loan-table-btn-month').classList.toggle('active', mode === 'month');
    this.updateLoan();
  },

  renderLoanTable(results) {
    const tableHeader = document.getElementById('loan-table-header');
    const tableBody = document.getElementById('loan-table-body');
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (this.loanTableMode === 'year') {
      tableHeader.innerHTML = `
        <tr>
          <th>Year</th>
          <th class="text-right">Principal Paid</th>
          <th class="text-right">Interest Paid</th>
          <th class="text-right">Extra Paid</th>
          <th class="text-right">Outstanding Balance</th>
        </tr>
      `;

      // Aggregate schedule into yearly lines
      let yearlyAggregates = {};
      results.schedule.forEach(row => {
        const yr = Math.ceil(row.month / 12);
        if (!yearlyAggregates[yr]) {
          yearlyAggregates[yr] = {
            principal: 0,
            interest: 0,
            extra: 0,
            balance: 0
          };
        }
        yearlyAggregates[yr].principal += row.principalPaid;
        yearlyAggregates[yr].interest += row.interestPaid;
        yearlyAggregates[yr].extra += row.extraPaid;
        yearlyAggregates[yr].balance = row.remainingBalance; // Latest balance in the year
      });

      Object.keys(yearlyAggregates).forEach(yr => {
        const row = yearlyAggregates[yr];
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>Year ${yr}</td>
          <td class="text-right">${this.formatVal(row.principal)}</td>
          <td class="text-right">${this.formatVal(row.interest)}</td>
          <td class="text-right" style="color: var(--success); font-weight: 500;">${this.formatVal(row.extra)}</td>
          <td class="text-right" style="color: var(--text-primary); font-weight: 600;">${this.formatVal(row.balance)}</td>
        `;
        tableBody.appendChild(tr);
      });

    } else {
      // Monthly Mode
      tableHeader.innerHTML = `
        <tr>
          <th>Month</th>
          <th class="text-right">EMI Portion</th>
          <th class="text-right">Principal Paid</th>
          <th class="text-right">Interest Paid</th>
          <th class="text-right">Extra Paid</th>
          <th class="text-right">Outstanding Balance</th>
        </tr>
      `;

      results.schedule.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>Month ${row.month}</td>
          <td class="text-right">${this.formatVal(row.emi)}</td>
          <td class="text-right">${this.formatVal(row.principalPaid)}</td>
          <td class="text-right">${this.formatVal(row.interestPaid)}</td>
          <td class="text-right" style="color: var(--success); font-weight: 500;">${this.formatVal(row.extraPaid)}</td>
          <td class="text-right" style="color: var(--text-primary); font-weight: 600;">${this.formatVal(row.remainingBalance)}</td>
        `;
        tableBody.appendChild(tr);
      });
    }
  },

  renderLoanChart(data) {
    const ctx = document.getElementById('loan-chart').getContext('2d');
    
    if (this.charts.loan) {
      this.charts.loan.destroy();
    }

    // Chart every 12 months for visual spacing if schedule is long, or every month if short
    const step = data.schedule.length > 36 ? 12 : 1;
    let chartPoints = data.schedule.filter((r, i) => i % step === 0 || i === data.schedule.length - 1);
    
    const labels = chartPoints.map(r => `Mo ${r.month}`);
    const remainingData = chartPoints.map(r => r.remainingBalance);
    const cumulativeIntData = chartPoints.map(r => r.cumulativeInterest);

    this.charts.loan = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Outstanding Principal',
            data: remainingData,
            borderColor: '#4f46e5',
            backgroundColor: 'transparent',
            tension: 0.1,
            borderWidth: 3,
            pointBackgroundColor: '#4f46e5'
          },
          {
            label: 'Cumulative Interest Paid',
            data: cumulativeIntData,
            borderColor: '#dc2626',
            backgroundColor: 'transparent',
            tension: 0.1,
            borderWidth: 2,
            pointBackgroundColor: '#dc2626'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#475569', font: { family: 'Inter', weight: 500 } }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            borderColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatVal(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569' } },
          y: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569', callback: (v) => this.formatVal(v) } }
        }
      }
    });
  },

  // ----------------------------------------------------
  // FIRE RETIREMENT PLANNER SYNC & RENDER
  // ----------------------------------------------------
  syncFIRE(trigger) {
    const expInput = document.getElementById('fire-expenses');
    const expRange = document.getElementById('fire-expenses-range');
    const savInput = document.getElementById('fire-savings');
    const savRange = document.getElementById('fire-savings-range');
    const addInput = document.getElementById('fire-addition');
    const addRange = document.getElementById('fire-addition-range');

    if (trigger === 'expenses') expRange.value = expInput.value;
    else if (trigger === 'expenses-range') expInput.value = expRange.value;
    else if (trigger === 'savings') savInput.value = savInput.value; // self sync
    else if (trigger === 'savings-range') savInput.value = savRange.value;
    else if (trigger === 'addition') addRange.value = addInput.value; // self sync
    else if (trigger === 'addition-range') addInput.value = addRange.value;

    this.updateFIRE();
  },

  updateFIRE() {
    const currentAge = parseInt(document.getElementById('fire-age').value) || 0;
    const retirementAge = parseInt(document.getElementById('fire-retire-age').value) || 0;
    const lifeExpectancy = parseInt(document.getElementById('fire-expectancy').value) || 0;
    const currentExpenses = parseFloat(document.getElementById('fire-expenses').value) || 0;
    const currentSavings = parseFloat(document.getElementById('fire-savings').value) || 0;
    const annualContribution = parseFloat(document.getElementById('fire-addition').value) || 0;
    
    const expectedReturnPre = parseFloat(document.getElementById('fire-pre-return').value) || 0;
    const expectedReturnPost = parseFloat(document.getElementById('fire-post-return').value) || 0;
    const inflationRate = parseFloat(document.getElementById('fire-inflation').value) || 0;

    // Safety checks
    if (retirementAge <= currentAge) {
      document.getElementById('fire-res-target').innerText = 'Check Age Inputs';
      document.getElementById('fire-res-actual').innerText = '—';
      return;
    }

    const results = Calculators.calculateFIRE({
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentExpenses,
      inflationRate,
      currentSavings,
      annualContribution,
      expectedReturnPre,
      expectedReturnPost
    });

    document.getElementById('fire-res-target').innerText = this.formatVal(results.fireTarget);
    document.getElementById('fire-res-actual').innerText = this.formatVal(results.savingsAtRetirement);

    // Style the portfolio sustainability status
    const statusBox = document.getElementById('fire-status-box');
    const statusLabel = document.getElementById('fire-res-status-label');
    const statusVal = document.getElementById('fire-res-status');

    if (results.isSustainable) {
      statusBox.style.background = 'rgba(5, 150, 105, 0.05)';
      statusBox.style.borderColor = 'rgba(5, 150, 105, 0.2)';
      statusLabel.style.color = 'var(--success)';
      statusVal.style.color = 'var(--success)';
      statusVal.innerText = 'Highly Sustainable Plan';
    } else {
      statusBox.style.background = 'rgba(220, 38, 220, 0.05)';
      statusBox.style.borderColor = 'rgba(220, 38, 220, 0.2)';
      statusLabel.style.color = 'var(--accent)';
      statusVal.style.color = 'var(--accent)';
      statusVal.innerText = `Fund Depleted at Age ${results.ageDepleted}`;
    }

    this.renderFIRETable(results);
    this.renderFIREChart(results, currentAge, retirementAge, lifeExpectancy);
  },

  toggleFIRETableMode(mode) {
    this.fireTableMode = mode;
    document.getElementById('fire-table-btn-acc').classList.toggle('active', mode === 'acc');
    document.getElementById('fire-table-btn-dec').classList.toggle('active', mode === 'dec');
    this.updateFIRE();
  },

  renderFIRETable(results) {
    const tableHeader = document.getElementById('fire-table-header');
    const tableBody = document.getElementById('fire-table-body');
    tableHeader.innerHTML = '';
    tableBody.innerHTML = '';

    if (this.fireTableMode === 'acc') {
      tableHeader.innerHTML = `
        <tr>
          <th>Age</th>
          <th class="text-right">Contribution (Annual)</th>
          <th class="text-right">Interest Gained</th>
          <th class="text-right">Accumulated Portfolio</th>
        </tr>
      `;

      results.accumulationBreakdown.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>Age ${row.age}</td>
          <td class="text-right">${this.formatVal(row.contribution)}</td>
          <td class="text-right">${this.formatVal(row.growth)}</td>
          <td class="text-right" style="color: var(--text-primary); font-weight: 600;">${this.formatVal(row.savings)}</td>
        `;
        tableBody.appendChild(tr);
      });
    } else {
      tableHeader.innerHTML = `
        <tr>
          <th>Age</th>
          <th class="text-right">Annual Living Withdrawal</th>
          <th class="text-right">Remaining Growth</th>
          <th class="text-right">Remaining Portfolio Balance</th>
        </tr>
      `;

      results.decumulationBreakdown.forEach(row => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>Age ${row.age}</td>
          <td class="text-right" style="color: var(--danger);">${this.formatVal(row.withdrawal)}</td>
          <td class="text-right">${this.formatVal(row.growth)}</td>
          <td class="text-right" style="color: var(--text-primary); font-weight: 600;">${this.formatVal(row.savings)}</td>
        `;
        tableBody.appendChild(tr);
      });
    }
  },

  renderFIREChart(data, startAge, retireAge, lifeAge) {
    const ctx = document.getElementById('fire-chart').getContext('2d');

    if (this.charts.fire) {
      this.charts.fire.destroy();
    }

    // Combine accumulation + decumulation schedules for one overarching full curve
    let fullAges = [];
    let fullSavings = [];
    let boundaryIndex = 0;

    data.accumulationBreakdown.forEach(row => {
      fullAges.push(`Age ${row.age}`);
      fullSavings.push(row.savings);
    });

    boundaryIndex = fullAges.length - 1;

    data.decumulationBreakdown.forEach(row => {
      fullAges.push(`Age ${row.age}`);
      fullSavings.push(row.savings);
    });

    const targetCorpusDataset = Array(fullAges.length).fill(data.fireTarget);

    this.charts.fire = new Chart(ctx, {
      type: 'line',
      data: {
        labels: fullAges,
        datasets: [
          {
            label: 'Net Worth Assets',
            data: fullSavings,
            borderColor: '#4f46e5',
            backgroundColor: 'transparent',
            borderWidth: 3.5,
            tension: 0.1,
            segment: {
              borderColor: ctx => ctx.p0.parsed.x > boundaryIndex ? '#dc2626' : '#059669' // Green on build up, Red on draw down
            }
          },
          {
            label: 'FIRE Target Corpus',
            data: targetCorpusDataset,
            borderColor: 'rgba(192, 38, 211, 0.45)',
            borderDash: [5, 5],
            backgroundColor: 'transparent',
            borderWidth: 2,
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#475569', font: { family: 'Inter', weight: 500 } }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            borderColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatVal(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569', maxTicksLimit: 12 } },
          y: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569', callback: (v) => this.formatVal(v) } }
        }
      }
    });
  },

  // ----------------------------------------------------
  // 50/30/20 BUDGET ALLOCATOR SYNC & RENDER
  // ----------------------------------------------------
  syncBudget(trigger) {
    const incInput = document.getElementById('budget-income');
    const incRange = document.getElementById('budget-income-range');

    if (trigger === 'income') incRange.value = incInput.value;
    else if (trigger === 'income-range') incInput.value = incRange.value;

    this.updateBudget();
  },

  updateBudget() {
    const monthlyIncome = parseFloat(document.getElementById('budget-income').value) || 0;
    const actualNeeds = parseFloat(document.getElementById('budget-act-needs').value) || 0;
    const actualWants = parseFloat(document.getElementById('budget-act-wants').value) || 0;
    const actualSavings = parseFloat(document.getElementById('budget-act-savings').value) || 0;

    const results = Calculators.calculateBudget({
      monthlyIncome,
      actualNeeds,
      actualWants,
      actualSavings
    });

    // Write numerical progress details
    document.getElementById('budget-bar-val-needs').innerText = `${this.formatVal(results.actual.needs)} / Target: ${this.formatVal(results.planned.needs)}`;
    document.getElementById('budget-bar-val-wants').innerText = `${this.formatVal(results.actual.wants)} / Target: ${this.formatVal(results.planned.wants)}`;
    document.getElementById('budget-bar-val-savings').innerText = `${this.formatVal(results.actual.savings)} / Target: ${this.formatVal(results.planned.savings)}`;

    // Set widths of comparison bars
    const getPercentWidth = (act, plan) => {
      if (plan === 0) return 0;
      return Math.min(100, (act / plan) * 100);
    };

    document.getElementById('budget-bar-fill-needs').style.width = `${getPercentWidth(results.actual.needs, results.planned.needs)}%`;
    document.getElementById('budget-bar-fill-wants').style.width = `${getPercentWidth(results.actual.wants, results.planned.wants)}%`;
    document.getElementById('budget-bar-fill-savings').style.width = `${getPercentWidth(results.actual.savings, results.planned.savings)}%`;

    this.renderBudgetChart(results);
  },

  renderBudgetChart(data) {
    const ctx = document.getElementById('budget-chart').getContext('2d');

    if (this.charts.budget) {
      this.charts.budget.destroy();
    }

    const hasActuals = (data.actual.needs > 0 || data.actual.wants > 0 || data.actual.savings > 0);

    const labels = hasActuals 
      ? ['Needs Plan', 'Needs Actual', 'Wants Plan', 'Wants Actual', 'Savings Plan', 'Savings Actual'] 
      : ['Needs (50%)', 'Wants (30%)', 'Savings (20%)'];

    const chartData = hasActuals
      ? [data.planned.needs, data.actual.needs, data.planned.wants, data.actual.wants, data.planned.savings, data.actual.savings]
      : [data.planned.needs, data.planned.wants, data.planned.savings];

    const bgColors = hasActuals
      ? ['rgba(79, 70, 229, 0.45)', '#4f46e5', 'rgba(192, 38, 211, 0.45)', '#c026d3', 'rgba(5, 150, 105, 0.45)', '#059669']
      : ['#4f46e5', '#c026d3', '#059669'];

    this.charts.budget = new Chart(ctx, {
      type: hasActuals ? 'bar' : 'doughnut',
      data: {
        labels,
        datasets: [{
          data: chartData,
          backgroundColor: bgColors,
          borderWidth: 1,
          borderColor: 'rgba(0, 0, 0, 0.05)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: !hasActuals, // Only show for doughnut
            labels: { color: '#475569', font: { family: 'Inter', weight: 500 } }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            borderColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` Allocated: ${this.formatVal(ctx.parsed.y || ctx.parsed)}`
            }
          }
        },
        scales: hasActuals ? {
          x: { grid: { display: false }, ticks: { color: '#475569' } },
          y: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569', callback: (v) => this.formatVal(v) } }
        } : {}
      }
    });
  },

  // ----------------------------------------------------
  // COMPOUND INTEREST SYNC & RENDER
  // ----------------------------------------------------
  syncCompound(trigger) {
    const priInput = document.getElementById('compound-principal');
    const priRange = document.getElementById('compound-principal-range');
    const mthInput = document.getElementById('compound-monthly');
    const mthRange = document.getElementById('compound-monthly-range');
    const ratInput = document.getElementById('compound-rate');
    const ratRange = document.getElementById('compound-rate-range');
    const tenInput = document.getElementById('compound-tenure');
    const tenRange = document.getElementById('compound-tenure-range');

    if (trigger === 'principal') priRange.value = priInput.value;
    else if (trigger === 'principal-range') priInput.value = priRange.value;
    else if (trigger === 'monthly') mthRange.value = mthInput.value;
    else if (trigger === 'monthly-range') mthInput.value = mthRange.value;
    else if (trigger === 'rate') ratRange.value = ratInput.value;
    else if (trigger === 'rate-range') ratInput.value = ratRange.value;
    else if (trigger === 'tenure') tenRange.value = tenInput.value;
    else if (trigger === 'tenure-range') tenInput.value = tenRange.value;

    this.updateCompound();
  },

  updateCompound() {
    const principal = parseFloat(document.getElementById('compound-principal').value) || 0;
    const monthlyContribution = parseFloat(document.getElementById('compound-monthly').value) || 0;
    const annualInterestRate = parseFloat(document.getElementById('compound-rate').value) || 0;
    const tenureYears = parseInt(document.getElementById('compound-tenure').value) || 0;
    const compoundingFrequency = document.getElementById('compound-freq').value;

    const results = Calculators.calculateCompoundInterest({
      principal,
      monthlyContribution,
      annualInterestRate,
      tenureYears,
      compoundingFrequency
    });

    document.getElementById('comp-res-invested').innerText = this.formatVal(results.totalInvested);
    document.getElementById('comp-res-interest').innerText = this.formatVal(results.totalInterest);
    document.getElementById('comp-res-total').innerText = this.formatVal(results.futureValue);

    // Build compound table
    const tableBody = document.getElementById('compound-table-body');
    tableBody.innerHTML = '';
    results.yearlyBreakdown.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>Year ${row.year}</td>
        <td class="text-right">${this.formatVal(row.cumulativeInvested)}</td>
        <td class="text-right">${this.formatVal(row.cumulativeInterest)}</td>
        <td class="text-right" style="color: var(--text-primary); font-weight: 600;">${this.formatVal(row.futureValue)}</td>
      `;
      tableBody.appendChild(tr);
    });

    this.renderCompoundChart(results);
  },

  renderCompoundChart(data) {
    const ctx = document.getElementById('compound-chart').getContext('2d');

    if (this.charts.compound) {
      this.charts.compound.destroy();
    }

    const labels = data.yearlyBreakdown.map(r => `Yr ${r.year}`);
    const investedData = data.yearlyBreakdown.map(r => r.cumulativeInvested);
    const growthData = data.yearlyBreakdown.map(r => r.futureValue);

    const gradInvested = ctx.createLinearGradient(0, 0, 0, 240);
    gradInvested.addColorStop(0, 'rgba(99, 102, 241, 0.25)');
    gradInvested.addColorStop(1, 'rgba(99, 102, 241, 0.0)');

    const gradGrowth = ctx.createLinearGradient(0, 0, 0, 240);
    gradGrowth.addColorStop(0, 'rgba(5, 150, 105, 0.25)');
    gradGrowth.addColorStop(1, 'rgba(5, 150, 105, 0.0)');

    this.charts.compound = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Total Growth Portfolio',
            data: growthData,
            borderColor: '#059669',
            backgroundColor: gradGrowth,
            fill: true,
            tension: 0.25,
            borderWidth: 3,
            pointBackgroundColor: '#059669'
          },
          {
            label: 'Principal Contributions',
            data: investedData,
            borderColor: '#4f46e5',
            backgroundColor: gradInvested,
            fill: true,
            tension: 0.25,
            borderWidth: 2,
            pointBackgroundColor: '#4f46e5'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { color: '#475569', font: { family: 'Inter', weight: 500 } }
          },
          tooltip: {
            backgroundColor: '#0f172a',
            titleColor: '#fff',
            bodyColor: '#e5e7eb',
            borderColor: 'rgba(99, 102, 241, 0.1)',
            borderWidth: 1,
            callbacks: {
              label: (ctx) => ` ${ctx.dataset.label}: ${this.formatVal(ctx.parsed.y)}`
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569' } },
          y: { grid: { color: 'rgba(99, 102, 241, 0.04)' }, ticks: { color: '#475569', callback: (v) => this.formatVal(v) } }
        }
      }
    });
  }
};

// Initialize the dashboard app once DOM is complete
window.addEventListener('DOMContentLoaded', () => {
  app.init();
});
