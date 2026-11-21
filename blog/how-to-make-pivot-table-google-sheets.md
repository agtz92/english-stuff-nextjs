---
title: 'How to Make a Pivot Table in Google Sheets, Step by Step'
date: '2026-11-21T14:06:41.469Z'
featuredimage: /assets/evergreen/how-to-make-pivot-table-google-sheets.jpg
categoria: Tech
tags:
  - '#Sheets'
  - '#Spreadsheets'
  - '#Productivity'
  - '#Tutorial'
short-description: >-
  Learn how to make a pivot table in Google Sheets step by step: build it,
  group, sum, and filter with sample data, and see what each setting changes.
deals: 'No'
mk1: >-
  Want to know how to make a pivot table in Google Sheets? The short answer:
  select your data, go to **Insert > Pivot table**, and choose where the summary
  should go. Then drag fields into Rows, Columns, and Values to group and add up
  your numbers. Google's [help page on creating and using pivot
  tables](https://support.google.com/docs/answer/1272900?hl=en&co=GENIE.Platform%3DDesktop)
  describes the same menu path.


  The menu path is the easy part. What matters is knowing what each setting
  changes in the output. Below, we build a small sales summary, explain every
  option we use, and cover grouping by month, filtering, and the problems people
  hit most often.


  ## Before you start: prepare your data for a pivot table


  A pivot table reads one block of data, so your source sheet needs a clean
  structure:


  - Give every column a header in the first row. If the header row scrolls out
  of view while you work, see our guide to [freezing rows in Google
  Sheets](https://www.3minread.com/how-to-freeze-rows-google-sheets).

  - Keep the data in one continuous block. A blank row stops the pivot from
  reading past that point.

  - Store dates as real dates, not text. Text dates cannot be grouped by month.

  - Remove duplicate rows you do not want counted. If you need a method, read
  our guide to [removing duplicates in Google
  Sheets](https://www.3minread.com/how-to-remove-duplicates-google-sheets).


  ## Our sample sales data


  We will use this small table, where each row is one sale:


  <table>

  <thead><tr><th>Region</th><th>Salesperson</th><th>Product</th><th>Order
  Date</th><th>Units Sold</th></tr></thead>

  <tbody><tr><td>North</td><td>Ana</td><td>Notebook</td><td>1/5/2026</td><td>12</td></tr><tr><td>North</td><td>Ben</td><td>Desk
  Lamp</td><td>1/9/2026</td><td>4</td></tr><tr><td>South</td><td>Carla</td><td>Notebook</td><td>2/2/2026</td><td>20</td></tr><tr><td>South</td><td>Diego</td><td>Chair</td><td>2/14/2026</td><td>3</td></tr><tr><td>West</td><td>Eva</td><td>Desk
  Lamp</td><td>3/3/2026</td><td>7</td></tr><tr><td>West</td><td>Felix</td><td>Chair</td><td>3/21/2026</td><td>5</td></tr></tbody>

  </table>


  The goal is simple: see how many units each region sold, which products drive
  those numbers, and how sales move from month to month.
mk2: >-
  ## Step 1: Create the pivot table in Google Sheets


  1. Click any cell inside your data. Sheets usually detects the full range on
  its own.

  2. Go to **Insert > Pivot table**.

  3. Check the data range in the dialog. It should cover all rows and include
  the header row.

  4. Choose where the pivot table goes: **New sheet** or **Existing sheet**. A
  new sheet is the safer choice, because the summary will not overlap your
  source data.

  5. Click **Create**.


  A pivot table editor opens on the right. It has four sections: **Rows**,
  **Columns**, **Values**, and **Filters**. Each one controls a different part
  of the output.


  ## Step 2: Set up Rows, Columns, and Values


  Each section does one specific job:


  - **Rows:** every unique value in the field becomes a row label. Add Region
  here.

  - **Columns:** every unique value becomes a column heading. Add Product here
  to compare products side by side.

  - **Values:** the numbers that get calculated where rows and columns meet. Add
  Units Sold here.

  - **Filters:** fields that limit which records the table includes.


  You never type the labels yourself. Sheets reads the unique values from the
  field you pick. If Region contains North, South, and West, you get three row
  labels automatically.


  Try it with Region in Rows and Units Sold in Values. The result looks like
  this:


  <table>

  <thead><tr><th>Region</th><th>Sum of Units Sold</th></tr></thead>

  <tbody><tr><td>North</td><td>16</td></tr><tr><td>South</td><td>23</td></tr><tr><td>West</td><td>12</td></tr><tr><td>Grand
  total</td><td>51</td></tr></tbody>

  </table>


  Notice that Sheets added the numbers for you. Each region's total is the sum
  of its rows in the source data.
mk3: >-
  ## Step 3: Change how values are summarized


  For numeric fields, Sheets sums values by default. You can change that in the
  Values section with the **Summarize by** setting. The options that matter most
  are:


  - **SUM** adds the numbers. Use it for units, revenue, or hours.

  - **COUNTA** counts non-empty cells. Use it to count orders or records, not to
  total quantities.

  - **AVERAGE** returns the mean. Use it to see the typical sale size.

  - **MIN** and **MAX** return the smallest and largest value in each group.


  The other settings change how results are arranged and displayed:


  <table>

  <thead><tr><th>Setting</th><th>What it changes</th><th>When to use
  it</th></tr></thead>

  <tbody><tr><td>Summarize by</td><td>How values combine (SUM, COUNTA,
  AVERAGE)</td><td>Totals versus counts</td></tr><tr><td>Show as</td><td>Raw
  numbers versus a percentage of a row or column total</td><td>Market share
  within a region</td></tr><tr><td>Order and Sort by</td><td>The order of rows
  or columns, by name or by value</td><td>Putting the biggest region
  first</td></tr><tr><td>Show totals</td><td>Adds row and column
  totals</td><td>A quick grand total</td></tr></tbody>

  </table>


  For example, set Sort by to Sum of Units Sold in descending order, and North
  moves to the top because it has the highest total among the three regions.
  Google's [guide to customizing a pivot
  table](https://support.google.com/docs/answer/7572895?hl=en&co=GENIE.Platform%3DDesktop)
  covers these sorting and totals options in more detail.


  ## Step 4: Group dates by month or week


  Monthly totals are one of the most common reasons to build a pivot table. Here
  is how to group dates:


  1. Add Order Date to the **Rows** section.

  2. Right-click any date label in the pivot table.

  3. Choose **Create pivot date group**, then select **Month**.


  Sheets now rolls every sale into its month, so January, February, and March
  appear as separate rows. This only works when the dates are stored as real
  dates. If the grouping option is missing, check the source column first. If
  you also track monthly spending, our [monthly budget
  guide](https://www.3minread.com/how-to-make-a-monthly-budget-in-google-sheets)
  uses a similar month-by-month setup.


  For manual groups, right-click the row labels you want to combine, such as
  North and West, and choose **Create pivot group**. Sheets creates a new group
  label you can rename.


  ### How to group by week


  Sheets does not offer a week option in the date group menu. You need a helper
  column in your source data. In a new column next to Order Date, use this
  formula in the first data row, where A2 holds the date:


  =A2-WEEKDAY(A2,2)+1


  This returns the Monday of the week that contains that date. Format the column
  as a date, then include it in your source range before you create the pivot
  table, or widen the range afterward. You can then add the helper column to
  Rows and sum Units Sold by week.
mk4: >-
  ## Step 5: Filter the pivot table


  The Filters section gives you two ways to narrow the results:


  - **Filter by condition** keeps rows that match a rule, such as "contains" a
  word or "is not empty."

  - **Filter by values** shows a checklist. Uncheck the items you want to hide.


  Use a condition when the rule matters more than the specific items, such as
  all products with the word Desk in their name. Use a value filter when you
  want to pick particular items by hand.


  For example, filter Product by condition with **contains Desk**. The table now
  shows only Desk Lamp sales:


  <table>

  <thead><tr><th>Region</th><th>Sum of Units Sold (Desk Lamp
  only)</th></tr></thead>

  <tbody><tr><td>North</td><td>4</td></tr><tr><td>West</td><td>7</td></tr><tr><td>Grand
  total</td><td>11</td></tr></tbody>

  </table>


  Filter settings are saved with the pivot table. Google's [customization
  guide](https://support.google.com/docs/answer/7572895?hl=en&co=GENIE.Platform%3DDesktop)
  explains how filter settings work in more detail.
mk5: >-
  ## Common pivot table problems and fixes


  ### My total shows a count instead of a sum


  Sheets sometimes defaults to COUNTA when a column mixes data types, such as
  numbers and text in the same field. [Sheets Bootcamp's pivot table
  guide](https://www.sheetsbootcamp.com/pivot-tables/) describes this behavior.
  To fix it, clean the column so it holds only numbers, then set **Summarize
  by** to SUM in the Values section.


  ### New rows do not appear in the pivot table


  A pivot table only reads rows inside its original source range. If you add
  rows below the range, they will not show up. Insert new rows inside the
  existing block, or update the source range so it covers the new data. A blank
  row in the middle of the data has the same effect, because the pivot stops
  reading there.


  ### The pivot table editor disappeared


  Click any cell inside the pivot table. The editor should reopen on the right
  side of the screen.


  ### Do I need to refresh the pivot table?


  In current versions of Sheets, pivot tables recalculate when the source data
  changes, so you usually do not need a manual refresh. [OWOX's complete guide
  to pivot
  tables](https://www.owox.com/blog/articles/pivot-tables-google-sheets) covers
  how the table stays linked to your data.


  ## Frequently asked questions


  ### Can I have two pivot tables in one sheet?


  Yes. Place each pivot table in a separate area that does not overlap with the
  other. Each one needs its own source range, and both can point to the same
  data.


  ### Can I make a pivot table from data on multiple sheets?


  Not directly. A pivot table reads one source range. Combine the data first
  with a formula such as QUERY or an array formula that stacks the sheets, then
  build the pivot table from the combined result.


  ### Can I make a chart from a pivot table?


  Yes. Select the pivot table output, then go to **Insert > Chart**. Sheets does
  not have a separate pivot chart type. The chart uses the pivot output as its
  data range, so it reflects the summary you built, as [OWOX explains in its
  pivot chart
  guide](https://www.owox.com/blog/articles/pivot-charts-google-sheets).


  ### Will deleting a pivot table delete my source data?


  No. The pivot table is only a summary. Your source data stays on its original
  sheet. To remove the summary, select the pivot table cells and clear them.


  ## Final takeaway


  To make a pivot table in Google Sheets, clean your data, go to Insert > Pivot
  table, and then build the summary with Rows, Columns, and Values. Use
  Summarize by to choose how numbers combine, Sort and Show totals to shape the
  layout, and Filters to narrow the results. Once you know what each setting
  does, you can turn a long list of sales rows into a summary you can read in
  seconds.
---

