---
title: How to Make a Monthly Budget in Google Sheets (Step-by-Step)
date: '2026-11-09T14:15:43.988Z'
featuredimage: >-
  https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8aG91c2Vob2xkJTIwYnVkZ2V0JTIwbGFwdG9wJTIwZGVza3xlbnwxfDB8fHwxNzk0MjMzNTY2fDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Tech
tags:
  - '#Budgeting'
  - '#Spreadsheets'
  - '#Finance'
  - '#Productivity'
short-description: >-
  Learn how to make a monthly budget in Google Sheets with a two-tab setup,
  SUMIF and subtraction formulas, and a worked household example you can copy.
deals: 'No'
mk1: >-
  <p><small><em>Photo by <a
  href="https://unsplash.com/@karishea?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Kari Shea</a> on <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Here is how to make a monthly budget in Google Sheets: set up two tabs, Budget
  for your planned amounts and Transactions for every payment you make. A SUMIF
  formula pulls the actual total for each category into Budget, and a simple
  subtraction shows what is left after expenses. Once the formulas are in place,
  you copy the file each month and keep going.


  This guide walks through the setup with a worked household example that shows
  the exact formula in each cell. It also helps you decide between Google's
  built-in template and a sheet you build yourself.


  ## Why use two tabs instead of one


  Keeping the plan and the record apart stops them from blurring together.
  Budget holds what you intend to spend. Transactions holds what actually
  happened. When you log a purchase, the totals on Budget update on their own,
  so you never type the same number twice.
mk2: >-
  ## How to make a monthly budget in Google Sheets: step by step


  ### Step 1: Set up the Budget tab


  Create a new spreadsheet, rename the first tab Budget, and add these headers
  in row 1:


  - A1: Category

  - B1: Planned

  - C1: Actual

  - D1: Left


  In column A, list your expense categories starting in A2. The example below
  uses 11: rent, groceries, utilities, transportation, car insurance, phone and
  internet, subscriptions, dining out, debt payments, savings, and personal and
  misc.


  Type your planned amount for each category in column B. If a bill comes once a
  year, divide it by 12 so you set aside a little every month. A $1,440 annual
  car insurance premium becomes =1440/12 in the planned cell, which is $120 a
  month.


  ### Step 2: Create the Transactions tab


  Add a second tab named Transactions with four columns:


  - A: Date

  - B: Category

  - C: Description

  - D: Amount


  Every purchase or payment gets its own row. Category names must match the
  names on Budget exactly, including spacing. A typo means that transaction is
  not counted. To keep names consistent, use a dropdown. Our [step-by-step guide
  to dropdown lists in Google
  Sheets](https://www.3minread.com/how-to-create-dropdown-list-google-sheets)
  shows how.


  Use the category Income for paychecks so you can total them the same way.


  ### Step 3: Add the SUMIF formula for actual spending


  In cell C2 on the Budget tab, enter:


  =SUMIF(Transactions!B:B, A2, Transactions!D:D)


  The first part is the range to check, the second is the category to match, and
  the third is the amounts to add. In plain terms: find every Transactions row
  whose category matches A2, then add up their amounts. Copy the formula down to
  C12. Each category now updates as you log spending.


  ### Step 4: Subtract to see what is left


  In D2, enter =B2-C2 and copy it down. A positive number means you are under
  plan in that category. A negative number means you overspent, which is your
  cue to adjust.


  Then add the totals in row 13:


  - B13: =SUM(B2:B12)

  - C13: =SUM(C2:C12)

  - D13: =SUM(D2:D12)


  Finally, add income and the bottom line. In row 15, type Take-home income in
  A15, your planned take-home pay in B15, and =SUMIF(Transactions!B:B, "Income",
  Transactions!D:D) in C15. In row 16, type Left to assign in A16, then enter
  =B15-B13 in B16 and =C15-C13 in C16.


  Left to assign is money that does not have a job yet. A positive number is
  your buffer. A negative number means the plan costs more than you earn.
mk3: >-
  ## A worked example: one household month


  The numbers below are hypothetical, chosen to show how the formulas behave.
  Take-home pay is $4,600 a month, and the household rents its home and owns one
  car.


  <table>

  <thead><tr><th>Category</th><th>Planned</th><th>Actual</th><th>Left (Planned −
  Actual)</th></tr></thead>

  <tbody><tr><td>Rent</td><td>$1,500</td><td>$1,500</td><td>$0</td></tr><tr><td>Groceries</td><td>$550</td><td>$612</td><td>-$62</td></tr><tr><td>Utilities</td><td>$180</td><td>$195</td><td>-$15</td></tr><tr><td>Transportation</td><td>$250</td><td>$275</td><td>-$25</td></tr><tr><td>Car
  insurance ($1,440 ÷
  12)</td><td>$120</td><td>$120</td><td>$0</td></tr><tr><td>Phone and
  internet</td><td>$110</td><td>$110</td><td>$0</td></tr><tr><td>Subscriptions</td><td>$45</td><td>$62</td><td>-$17</td></tr><tr><td>Dining
  out</td><td>$150</td><td>$210</td><td>-$60</td></tr><tr><td>Debt
  payments</td><td>$350</td><td>$350</td><td>$0</td></tr><tr><td>Savings</td><td>$400</td><td>$400</td><td>$0</td></tr><tr><td>Personal
  and misc</td><td>$200</td><td>$260</td><td>-$60</td></tr><tr><td><strong>Total
  expenses</strong></td><td><strong>$3,855</strong></td><td><strong>$4,094</strong></td><td><strong>-$239</strong></td></tr><tr><td>Take-home
  income</td><td>$4,600</td><td>$4,600</td><td></td></tr><tr><td><strong>Left to
  assign</strong></td><td><strong>$745</strong></td><td><strong>$506</strong></td><td></td></tr></tbody>

  </table>


  In this month the household spent $239 more than planned, mostly on groceries,
  dining out, and personal spending. It still had $506 left to assign, so the
  plan held. The useful move is deciding where that $506 goes, such as an
  emergency fund or next month's dining budget, rather than letting it drift
  into everyday spending.


  ## How this compares with national averages


  The U.S. Bureau of Labor Statistics reports that average annual spending for
  all consumer units was $81,905 in 2025, up 4.3 percent from 2024, according to
  its [2025 Consumer Expenditures
  release](https://www.bls.gov/news.release/pdf/cesan.pdf). Divided by 12, that
  is about $6,825 a month. Housing averaged $27,790 a year, or 33.9 percent of
  spending, which works out to roughly $2,316 a month.


  These are averages across very different households, so treat them as a
  reference point, not a target. The hypothetical household above spends less
  than both figures, which is a reason to compare your own numbers, not copy
  someone else's. For a plain-language summary of the 2024 to 2025 change, see
  [The Economics
  Daily](https://www.bls.gov/opub/ted/2026/consumer-spending-increased-4-3-percent-from-2024-to-2025.htm).
mk4: >-
  ## Built-in template or build from scratch?


  Google offers a monthly budget template through File, then New, then From
  template gallery. It is a reasonable starting point, but the right choice
  depends on how much you want to control.


  <table>

  <thead><tr><th>Criteria</th><th>Built-in template</th><th>Build from
  scratch</th></tr></thead>

  <tbody><tr><td>Setup time</td><td>Fast: pick it from the
  gallery</td><td>Slower: you create tabs and formulas</td></tr><tr><td>Formula
  learning</td><td>Little, since formulas are already set</td><td>Full: you
  write SUMIF, SUM, and subtraction</td></tr><tr><td>Changing
  categories</td><td>Check that totals still pick up new rows</td><td>You
  control every row and formula</td></tr><tr><td>Main risk</td><td>Less
  transparent when a total looks wrong</td><td>A mistyped category silently
  drops a transaction</td></tr></tbody>

  </table>


  Our verdict: use the built-in template if you need a working sheet today and
  mainly want to read the totals. Build your own if you plan to change
  categories over time or want to understand why the numbers move. The main risk
  of building from scratch is a mismatched category name, which is why the
  dropdown step above matters.


  ## Formulas worth knowing


  - =SUM(B2:B12) adds a range. A plain SUM includes hidden rows.

  - =SUBTOTAL(109, B2:B12) adds only visible rows, which helps when you filter
  the list.

  - SUMIFS adds more conditions. Google's [SUMIFS
  documentation](https://support.google.com/docs/answer/3238496?hl=en) explains
  that a row must meet all criteria to be counted, which matters when you add a
  second condition such as a payment method.

  - To total across monthly tabs, name each sheet and range, for example
  =SUM(Jan!B2:B50, Feb!B2:B50).
mk5: >-
  ## Keep the budget from stalling


  Most budgets do not fail on day one. They fail when transactions stop being
  logged. A few habits help:


  - Log spending on a fixed day each week, such as Sunday.

  - Mark bills as paid with checkboxes so you can see what is still due. Our
  [guide to checkboxes in Google
  Sheets](https://www.3minread.com/the-ultimate-guide-to-adding-and-using-checkboxes-in-google-sheets-like-a-pro)
  covers the setup.

  - At the start of each month, make a copy of the file, rename it, and clear
  the Transactions tab in the copy. This keeps SUMIF counting only the new
  month.

  - Move the Left to assign amount into savings or a planned category before the
  month starts.


  If you tend to start a budget with energy and drop it by week three, treat the
  rebuild as a project. [continuu.it](https://continuu.it) is a project tool
  built around project states: Active, Paused, Killed, or Completed. Tasks live
  inside each project, and notes keep the context you would otherwise have to
  rebuild. A budget rebuild can be marked Paused and picked up later with your
  last steps still visible. It does not replace a spreadsheet or a documentation
  tool like Notion, so keep your numbers in Google Sheets and use continuu.it to
  keep the habit moving. There is a free plan.


  ## Frequently asked questions


  ### Is there a budget template in Google Sheets?


  Yes. Go to File, then New, then From template gallery, and look for a monthly
  budget template. Templates are a fast start, and the two-tab method above
  shows you what each formula does, so you can change it later.


  ### Can I track more than one month in one file?


  Yes, but duplicate the file at the start of each month rather than adding
  every month to the same Transactions tab. Otherwise the category totals mix
  months together.


  ### How do I sum only visible rows?


  Use =SUBTOTAL(109, B2:B12). Plain SUM includes hidden rows, so filtering will
  not change its result.


  ### Can I share the budget with a partner?


  Yes. Click Share and give your partner Editor access so both of you can add
  transactions.


  ### Can SUM add across different sheets?


  Yes, by naming each tab and range, such as =SUM(Jan!B2:B50, Feb!B2:B50).


  ## The bottom line


  A monthly budget in Google Sheets needs only two tabs, one SUMIF formula, and
  a few subtractions. Start with the plan, log every transaction, and check Left
  to assign each week. The method holds up with real numbers, and the weekly
  habit is what keeps it useful.
---

