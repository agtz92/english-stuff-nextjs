---
title: 'XLOOKUP vs VLOOKUP: Which Formula Should You Use?'
date: '2026-11-06T14:06:03.646Z'
featuredimage: >-
  https://images.unsplash.com/photo-1686061592689-312bbfb5c055?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8c3ByZWFkc2hlZXQlMjBkYXRhJTIwZ3JpZHxlbnwxfDB8fHwxNzkzOTczNzU3fDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Tech
tags:
  - '#Excel'
  - '#XLOOKUP'
  - '#VLOOKUP'
  - '#Spreadsheets'
short-description: >-
  XLOOKUP vs VLOOKUP compared on syntax, left-side lookups, and Excel version
  support, with a clear verdict for each situation.
deals: 'No'
mk1: >-
  <p><small><em>Photo by <a
  href="https://unsplash.com/@1981digital?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">1981 Digital</a> on <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  If you are choosing between **XLOOKUP vs VLOOKUP**, here is the short answer:
  use XLOOKUP when your file lives in Microsoft 365 or a recent Excel version
  and you need left-side lookups, built-in not-found handling, or a return
  column that doesn't depend on a column number. Keep VLOOKUP when the workbook
  has to open cleanly on Excel 2019 or earlier, or when an existing exact-match
  formula already works and nobody needs to change it.


  Below, we compare the syntax, show where each function breaks, and finish with
  a decision table so you can pick the right formula for your situation.


  ## XLOOKUP vs VLOOKUP at a glance


  <table>

  <thead><tr><th>Criteria</th><th>VLOOKUP</th><th>XLOOKUP</th></tr></thead>

  <tbody><tr><td>Basic syntax</td><td><code>=VLOOKUP(lookup, table, col_index,
  [range_lookup])</code></td><td><code>=XLOOKUP(lookup, lookup_array,
  return_array, [if_not_found], [match_mode],
  [search_mode])</code></td></tr><tr><td>Default match</td><td>Approximate if
  the last argument is left out</td><td>Exact match</td></tr><tr><td>Lookups to
  the left</td><td>Not possible directly</td><td>Yes, the return array is
  independent</td></tr><tr><td>Column insertions</td><td>The column number can
  point to the wrong field</td><td>References move with the
  columns</td></tr><tr><td>Not-found handling</td><td>Wrap the formula in
  IFERROR</td><td>Built-in if_not_found argument</td></tr><tr><td>Duplicate
  matches</td><td>First match only</td><td>First match by default; last match
  with search_mode -1</td></tr><tr><td>Wildcards</td><td>Work in exact
  match</td><td>Work only with match_mode 2</td></tr><tr><td>Version
  support</td><td>Every version you are likely to open</td><td>Microsoft 365,
  Excel 2021, Excel 2024, Excel for the web</td></tr></tbody>

  </table>
mk2: >-
  ## How does VLOOKUP work, and where does it break?


  VLOOKUP searches the first column of a table for your lookup value and returns
  a value from a column you choose by number. A typical exact-match formula
  looks like this:


  `=VLOOKUP(A2, Sheet2!$A$2:$D$500, 4, FALSE)`


  Three things make it fragile:


  - **The column number is hard-coded.** If someone inserts a column inside the
  table, the `4` now points to a different field, and the formula returns the
  wrong value without an error.

  - **The key must be the first column.** VLOOKUP can only look to the right. If
  your employee ID sits in column C and the name you need sits in column A, you
  have to rearrange the data or use another approach.

  - **The last argument is easy to forget.** Leave it out, or type TRUE, and
  VLOOKUP runs an approximate match. That mode assumes the first column is
  sorted in ascending order, and unsorted data can return a wrong answer with no
  warning.


  For most lookups, FALSE (exact match) is the safe choice. [Microsoft's VLOOKUP
  function
  page](https://support.microsoft.com/en-us/excel/functions/vlookup-function)
  documents how each argument behaves.


  ## How is the XLOOKUP syntax different?


  XLOOKUP takes the lookup value, a lookup array, and a return array. The
  optional arguments handle the not-found message, the match type, and the
  search direction. The same lookup becomes:


  `=XLOOKUP(A2, Sheet2!$A$2:$A$500, Sheet2!$D$2:$D$500, "Not found")`


  A few details matter here:


  - The lookup and return arrays are separate references, so the key does not
  have to be the first column.

  - The default is exact match, so you never need to type FALSE or 0.

  - The if_not_found argument replaces the IFERROR wrapper that most VLOOKUP
  formulas need.

  - Wildcards need an explicit setting. Match mode 2 turns them on, while
  VLOOKUP accepts wildcards in exact match by default. The [Microsoft XLOOKUP
  function
  page](https://support.microsoft.com/en-us/excel/functions/xlookup-function)
  lists all match modes and search modes.


  ## Left-side lookups: the clearest difference


  Imagine Sheet2 holds employee names in column A and employee IDs in column C.
  On your main sheet, cell C2 contains an ID, and you want the matching name.


  VLOOKUP cannot do this directly, because the name sits to the left of the ID.
  You would need a helper column, a restructured table, or INDEX/MATCH. XLOOKUP
  handles it in one step:


  `=XLOOKUP(C2, Sheet2!$C$2:$C$500, Sheet2!$A$2:$A$500, "Not found")`


  For most people with a current version, this single capability is the
  strongest reason to switch. Your formula no longer depends on how the source
  table is arranged.
mk3: >-
  ## Which Excel versions can open your formula?


  XLOOKUP is available in Microsoft 365, Excel 2021, Excel 2024, and Excel for
  the web. Excel 2019 and earlier perpetual versions do not include it. [Excel
  University's XLOOKUP basics
  page](https://www.excel-university.com/xlookup-basics/) covers the supported
  versions in detail. VLOOKUP works in every version you are likely to open.


  To check your own version quickly, type `=XLOOKUP` into a blank cell. If you
  see #NAME?, your version doesn't support the function.


  The real risk shows up when a colleague on an older version opens a shared
  file. The XLOOKUP cells display #NAME? errors, and the workbook loses the
  results it was built to show.


  ### A checklist for shared workbooks


  1. Ask every collaborator which Excel version they use before you build with
  XLOOKUP.

  2. Press Ctrl+F, open the Options, set Look in to Formulas, and search for
  XLOOKUP to find every affected cell.

  3. Replace those formulas with VLOOKUP or INDEX/MATCH, then spot-check a
  sample of rows.

  4. Save a copy before you change anything, and note the Excel version in the
  file name or a cover sheet.


  If you need a fallback that works widely, INDEX/MATCH is a strong option.
  According to [SmartsheetLab's 100,000-row speed
  test](https://smartsheetlab.com/speed-test-vlookup-vs-indexmatch-vs-xlookup-on-100000-rows),
  it works in Excel versions from 2003 onward and has no leftward-lookup limit.


  ## Is XLOOKUP faster than VLOOKUP?


  The published benchmarks disagree. An older [Professor Excel
  test](https://professor-excel.com/performance-of-xlookup-how-fast-is-the-new-xlookup-vs-vlookup/)
  found that XLOOKUP needed about 40% longer to calculate than VLOOKUP.
  SmartsheetLab's 100,000-row test reported that XLOOKUP with whole-column
  references ran roughly 2.3 times faster than VLOOKUP, but a VLOOKUP with a
  bounded range beat the whole-column XLOOKUP.


  A useful reading of both results is that range size often matters more than
  the function. Whole-column references force Excel to consider a much larger
  area, and in these tests the range changed the outcome more than the function
  name did.


  If speed matters for your model, test it on your own file:


  1. Fill a sheet with 100,000 rows of sample data.

  2. In Windows Excel, press Ctrl+Alt+F9 to force a full recalculation, and time
  it with a stopwatch.

  3. Repeat the test with a bounded range such as $A$2:$A$100001, then with
  whole columns, and compare the times for each function.


  Compare the timings for your own ranges, not the function names.


  ## What about duplicates and wildcards?


  Both functions return the first match by default. If you need the last match,
  XLOOKUP's search_mode of -1 searches from the bottom up:


  `=XLOOKUP(A2, Sheet2!$A$2:$A$500, Sheet2!$D$2:$D$500, "Not found", 0, -1)`


  If you need every match, Microsoft 365 users can use FILTER, which returns all
  rows that meet a condition.


  For partial text, XLOOKUP needs match mode 2. This example finds the first
  name that starts with "Mar":


  `=XLOOKUP("Mar*", Sheet2!$A$2:$A$500, Sheet2!$B$2:$B$500, "Not found", 2)`


  Don't forget that the lookup and return arrays must be the same size. If they
  are not, XLOOKUP returns a #VALUE! error.
mk4: >-
  ## Which formula should you use? A decision table


  <table>

  <thead><tr><th>Scenario</th><th>Use</th><th>Why</th></tr></thead>

  <tbody><tr><td>Shared file with colleagues on Excel 2019 or
  earlier</td><td>VLOOKUP or INDEX/MATCH</td><td>XLOOKUP shows #NAME? for
  them</td></tr><tr><td>New lookup in Microsoft 365, used by you
  alone</td><td>XLOOKUP</td><td>Shorter syntax, exact match by default, built-in
  not-found text</td></tr><tr><td>The key column sits to the right of the return
  column</td><td>XLOOKUP</td><td>No need to restructure the
  table</td></tr><tr><td>You need the last match, not the first</td><td>XLOOKUP
  with search_mode -1</td><td>Built in, no extra helper
  column</td></tr><tr><td>You need several columns from one
  match</td><td>XLOOKUP</td><td>A multi-column return array spills into adjacent
  cells in Microsoft 365</td></tr><tr><td>Columns get inserted into the table
  often</td><td>XLOOKUP</td><td>References move with the
  columns</td></tr><tr><td>A large model with whole-column
  references</td><td>Test both</td><td>Benchmarks disagree, and range size
  matters most</td></tr><tr><td>A working legacy workbook with no planned
  edits</td><td>Keep VLOOKUP</td><td>Rewriting adds risk without a visible
  gain</td></tr></tbody>

  </table>


  **Our verdict:** For new work on a current version, XLOOKUP is the better
  default. For shared files that must open on older Excel, keep VLOOKUP or
  switch to INDEX/MATCH until everyone has upgraded.


  ## How do you migrate from VLOOKUP to XLOOKUP?


  1. Identify the four parts of your old formula: the lookup value, the table,
  the column number, and the match type.

  2. Make the first column of the table the lookup array, and the column you
  want to return the return array. Use the same row range for both.

  3. Replace the IFERROR wrapper with the if_not_found argument.

  4. Compare the old and new results on about 20 rows, including a few rows you
  know are missing from the source table.


  If the old formula is unfamiliar, review the [VLOOKUP guide on
  3minread](https://www.3minread.com/mastering-vlookup-in-excel-your-ultimate-guide-to-finding-data-like-a-pro)
  before you start the rewrite.


  Here is a before and after example:


  Before: `=IFERROR(VLOOKUP(A2, Sheet2!$A$2:$D$500, 4, FALSE), "Not found")`


  After: `=XLOOKUP(A2, Sheet2!$A$2:$A$500, Sheet2!$D$2:$D$500, "Not found")`
mk5: >-
  ## Is VLOOKUP still worth knowing?


  Yes. Microsoft's VLOOKUP page points readers toward XLOOKUP for newer work,
  but it still documents VLOOKUP as a working function and does not describe it
  as deprecated. [Exceljet](https://exceljet.net/articles/xlookup-vs-vlookup)
  describes VLOOKUP as limited rather than broken, and that is a fair way to
  think about it. Many existing workbooks depend on VLOOKUP, so you will keep
  meeting it.


  If you need the basics before comparing the two, our [VLOOKUP guide on
  3minread](https://www.3minread.com/mastering-vlookup-in-excel-your-ultimate-guide-to-finding-data-like-a-pro)
  covers how the function works from the start.


  Google Sheets also includes both functions, so the logic in this comparison
  carries over, although the version rules you need to check are Excel's.


  ## Frequently asked questions


  ### Is XLOOKUP better than VLOOKUP?


  For most new work in a current version, yes. XLOOKUP handles left-side
  lookups, has built-in not-found handling, and doesn't rely on column numbers.
  VLOOKUP remains the safer choice when a file must work on Excel 2019 or
  earlier.


  ### Can XLOOKUP look to the left?


  Yes. Its return array can sit anywhere in the sheet, so the key column does
  not need to be first. The employee example above shows the formula.


  ### Does XLOOKUP work in Excel 2019?


  No. Excel 2019 and earlier perpetual versions do not include XLOOKUP. If
  colleagues use those versions, keep VLOOKUP or INDEX/MATCH in any shared file.


  ### Why does my XLOOKUP show #NAME?


  The most common causes are an Excel version that doesn't support the function
  or a misspelled name. Retype the formula first. If the error stays, check your
  version and whether the workbook was built in a newer Excel.


  ### Can XLOOKUP return multiple columns?


  Yes, in Microsoft 365 and recent versions. If the return array spans several
  columns, the results spill into the cells next to the formula. VLOOKUP returns
  a single column per formula.


  ## Takeaway


  Use XLOOKUP for new work in Microsoft 365 or a recent Excel, especially when
  you need left-side lookups or a formula that survives column changes. Keep
  VLOOKUP or INDEX/MATCH for shared files that must open on Excel 2019 or
  earlier. If speed matters, test both functions on your own ranges, because
  range size often decides the result.


  For a quick refresher on the lookup basics first, revisit our [VLOOKUP guide
  on
  3minread](https://www.3minread.com/mastering-vlookup-in-excel-your-ultimate-guide-to-finding-data-like-a-pro).
---

