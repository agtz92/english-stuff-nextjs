---
title: How to Create a Dropdown List in Google Sheets (Step by Step)
date: '2026-10-16T18:18:40.695Z'
featuredimage: >-
  https://images.unsplash.com/photo-1762341110466-7d493b93ab4c?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8c3ByZWFkc2hlZXQlMjBsYXB0b3AlMjBkZXNrJTIwb2ZmaWNlfGVufDF8MHx8fDE3OTIxNzQ1NjZ8MA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Tech
tags:
  - '#Spreadsheets'
  - '#Dropdown'
  - '#Productivity'
  - '#Tutorial'
short-description: >-
  Learn how to create a dropdown list in Google Sheets with two methods, a
  step-by-step inventory example, and tips on choosing chips or classic
  dropdowns.
deals: 'No'
mk1: >-
  <p><small><em>Photo by <a
  href="https://unsplash.com/@zulfugarkarimov?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Zulfugar Karimov</a> on <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  Learning how to create a dropdown list in Google Sheets takes about a minute.
  Select the cells you want to fill, then use **Insert > Dropdown** for a short
  list you type yourself, or use **Data > Data validation** to pull options from
  a range of cells. A dropdown keeps entries consistent, which matters when
  several people edit the same sheet, and it stops typos from breaking filters
  and formulas.


  Quick answer: for a fixed list, type the options directly. For a list you
  update often, point the dropdown to a range on another sheet. Both approaches
  are below, along with a comparison of the two display styles (the classic
  arrow and dropdown chips) and a full inventory example you can copy.
mk2: >-
  ## How to Create a Dropdown List in Google Sheets: Two Methods


  ### Method 1: Create a Classic Dropdown With Data Validation


  Data validation gives you the most control. You choose the list source, the
  cells it applies to, and what happens when someone enters a value that is not
  on the list.


  1. Select the cells that need the list, such as the Status column from C2 to
  C100.

  2. Click **Data > Data validation**.

  3. Click **Add rule** in the side panel.

  4. Under **Criteria**, choose **Dropdown** to type each option yourself, or
  **Dropdown (from a range)** to reference a list elsewhere in the file.

  5. Enter your options, or the range, such as `Lists!A2:A50`.

  6. Under **On invalid data**, choose **Reject input** to block anything not on
  the list, or **Show warning** to let people keep a value while flagging it.

  7. Click **Done**.


  Reject input is the stricter choice, and it suits status columns that feed
  reports. Show warning works better on shared sheets where people sometimes
  need a value that does not exist on the list yet.


  ### Method 2: Use Dropdown Chips


  Dropdown chips are colored labels that sit inside a cell. Google added them to
  Sheets in December 2022, and they are on by default ([Google Workspace
  Updates](https://workspaceupdates.googleblog.com/2022/12/drop-down-chips-google-sheets.html)).


  1. Select the cells.

  2. Use any of three entry points: **Insert > Dropdown**, right-click and
  choose **Dropdown**, or type **@** in a cell and pick **Dropdown** from the
  menu.

  3. Type your options in the panel, or point the chip to a range.

  4. Turn on **Allow multiple selections** if one cell needs more than one
  value.

  5. Assign a color to each option so statuses are easy to scan.


  Multiple selections work only with chip-format dropdowns, according to
  [Google's help page on in-cell
  dropdowns](https://support.google.com/docs/answer/186103?hl=en&co=GENIE.Platform%3DDesktop).
  That same page notes that leading or trailing spaces in an option can block
  multiple selections, so check your list for stray spaces.


  Google has extended chips since launch. In March 2024 it added preset
  dropdowns for common fields such as priority or review status ([Google
  Workspace Updates, March
  2024](https://workspaceupdates.googleblog.com/2024/03/set-up-dropdown-chips-more-easily-google-sheets.html)).
  In May 2024 it added bulk conversion, so an existing range of values can be
  turned into chips through a “Convert to dropdown chips” suggestion. You can
  turn off these suggestions from the Tools menu ([Google Workspace Updates, May
  2024](https://workspaceupdates.googleblog.com/2024/05/easily-convert-data-to-dropdown-chips-google-sheets.html)).
mk3: >-
  ## Chips or Classic Dropdown: When to Use Each


  Both styles are useful, and the right choice depends on what the cell needs to
  hold. The table compares the features that matter most.


  <table>

  <thead><tr><th>Feature</th><th>Classic dropdown (data
  validation)</th><th>Dropdown chips</th></tr></thead>

  <tbody><tr><td>Appearance</td><td>Plain text with an arrow</td><td>Colored
  label inside the cell</td></tr><tr><td>Multiple
  selections</td><td>No</td><td>Yes, with Allow multiple
  selections</td></tr><tr><td>Color per option</td><td>Not built
  in</td><td>Yes</td></tr><tr><td>Where to set it up</td><td>Data &gt; Data
  validation</td><td>Insert &gt; Dropdown, right-click, or
  @</td></tr><tr><td>Reject or warn on invalid
  entries</td><td>Yes</td><td>Yes</td></tr></tbody>

  </table>


  A simple rule of thumb: choose chips when a cell holds a status, a label, or
  several tags, and color helps people scan a long sheet. Choose the classic
  dropdown when each cell should hold one plain value and you want the simplest
  look. Chips are still data validation rules under the hood, a point [Ben
  Collins explains in his smart chips
  guide](https://www.benlcollins.com/spreadsheets/smart-chips-in-google-sheets/),
  so the decision is about how the cell looks and behaves, not how the data is
  validated.
mk4: >-
  ## Example: Building an Inventory Control Sheet


  This setup uses two sheets. A Lists sheet holds your product names and status
  options, and an Inventory sheet uses them. You can build it in about ten
  minutes.


  ### Step 1: Set Up the Lists Sheet


  Put product names in column A, starting at A2. Put the status options in
  column C: In stock, Low stock, and Out of stock. Keep the labels short,
  because each one becomes a chip.


  ### Step 2: Add the Product Dropdown


  On the Inventory sheet, use column A for Product, B for Status, C for
  Quantity, and D for Last checked. Select A2:A500, open **Data > Data
  validation**, choose **Dropdown (from a range)**, and enter `Lists!A2:A500`.
  Set **On invalid data** to **Reject input** so every product matches the
  master list.


  ### Step 3: Add the Status Chips


  Select B2:B500 and insert a dropdown chip. Point it to `Lists!C2:C4` so the
  status options live in one place. Then assign colors: green for In stock,
  yellow for Low stock, and red for Out of stock.


  ### Step 4: Cover the Rows You Will Add


  This is the step most guides skip. A rule set to B2:B11 does not cover row 12,
  so a growing sheet ends up with new rows that have no dropdown at all. Set the
  range to B2:B500, or further if you expect a longer list, from the start. If
  your tracker grows very large, read our breakdown of [Google Sheets' 10
  Million Cell Limit: Powerful Potential or Hidden Trap for Your
  Data?](/google-sheets-10-million-cell-limit-powerful-potential-or-hidden-trap-for-your-data)
  before you commit to a layout.


  ### Step 5: Test the Setup


  Type a status that is not on the list. With Reject input, Sheets blocks the
  entry. With Show warning, the value stays and gets flagged. Pick the behavior
  that fits how your team works.


  Once the rules are in place, every product has one consistent status, and you
  can filter the sheet to find all Out of stock items in seconds.


  ## Keep Your Dropdowns Working as the List Grows


  - **Set generous ranges.** Cover the rows you expect to use, not only the rows
  that have data today.

  - **Check the rule after you edit the source.** Google's help page notes that
  deleting a value from a source range can leave the value, and its color, in
  the criteria. After removing an item, open **Data > Data validation** and
  confirm that only current options remain.

  - **Add new items inside the range.** Keep the source list continuous, with no
  blank rows between entries.

  - **Use a clear placeholder for blanks.** If people need a way to clear a
  status, add a “None” or “Not set” item instead of relying on an empty cell.

  - **Watch for stray spaces.** Trailing spaces can block multiple selections in
  chips.
mk5: >-
  ## Frequently Asked Questions


  ### Can I create a dropdown from a range of cells?


  Yes. Open **Data > Data validation**, choose **Dropdown (from a range)**, and
  enter the range, such as `Lists!A2:A50`. The source list can sit on another
  sheet in the same file.


  ### How do I edit or delete a dropdown list?


  Select the cells, open **Data > Data validation**, and edit the options or
  remove the rule. If the dropdown uses a range, update the items in that range
  and then recheck the rule.


  ### Can people choose more than one option?


  Yes, but only with dropdown chips. Turn on **Allow multiple selections** in
  the chip settings.


  ### Why doesn't my dropdown work in new rows?


  The rule applies only to the range you selected. Extend it to cover the rows
  you expect to use, such as B2:B500, and then test a new row.


  ## Final Takeaway


  - Use **Data > Data validation** when you need full control over the list and
  over invalid-entry behavior.

  - Use dropdown chips when colored labels or multiple selections will help.

  - Cover future rows, and recheck your rules after you edit the source list.


  For more quick Sheets how-tos, browse the Tech section of 3minread. If your
  sheet also needs tick boxes for tasks, read our guide to [checkboxes in Google
  Sheets](/the-ultimate-guide-to-adding-and-using-checkboxes-in-google-sheets-like-a-pro).
  If you plan to collect these entries from respondents, our [Google Forms
  guide](/the-ultimate-google-forms-guide-create-customize-and-automate-surveys-like-a-pro)
  shows how dropdown questions can feed the same sheet.
---

