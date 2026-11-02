---
title: 'How to Speed Up a Slow WordPress Site: 7 Fixes'
date: '2026-11-02T14:09:00.048Z'
featuredimage: >-
  https://images.unsplash.com/photo-1544474560-5b2a788d024a?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8d2Vic2l0ZSUyMGxvYWRpbmclMjBzcGVlZCUyMGxhcHRvcHxlbnwxfDB8fHwxNzkzNjI4MzIxfDA&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Tech
tags:
  - '#WordPress'
  - '#Performance'
  - '#Hosting'
  - '#Tutorial'
short-description: >-
  Learn how to speed up a slow WordPress site with 7 fixes ranked by effort and
  impact, from image compression to caching, plus how to measure each one.
deals: 'No'
mk1: >-
  <p><small><em>Photo by <a
  href="https://unsplash.com/@rumanamin?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Rumman Amin</a> on <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  If you want to know how to speed up a slow WordPress site, start with three
  moves: turn on page caching, compress your images, and update PHP and
  WordPress. Those changes fix most slowdowns for most sites, and they can be
  done in an afternoon. Below, we rank seven fixes by effort and impact, and we
  show which metric to check after each one so you know what actually worked.


  Most slow sites lose time in one of three places. The server takes too long to
  build the page, the browser downloads too much before the main content
  appears, or the page runs heavy code. Each fix below targets one of those
  problems, so you can match the fix to the symptom instead of guessing.


  ## Seven fixes at a glance


  <table>

  <thead><tr><th>Rank</th><th>Fix</th><th>Effort</th><th>Typical
  impact</th><th>Metric to check</th></tr></thead>

  <tbody><tr><td>1</td><td>Turn on page
  caching</td><td>Low</td><td>High</td><td>TTFB</td></tr><tr><td>2</td><td>Compress
  and resize images</td><td>Low to
  medium</td><td>High</td><td>LCP</td></tr><tr><td>3</td><td>Update PHP and
  WordPress</td><td>Low to medium</td><td>Medium to
  high</td><td>TTFB</td></tr><tr><td>4</td><td>Audit and remove
  plugins</td><td>Medium</td><td>Medium to high</td><td>TTFB and
  INP</td></tr><tr><td>5</td><td>Fix lazy loading for the hero
  image</td><td>Low</td><td>Medium</td><td>LCP</td></tr><tr><td>6</td><td>Add a
  CDN</td><td>Medium</td><td>Medium, depends on your
  visitors</td><td>LCP</td></tr><tr><td>7</td><td>Move to better
  hosting</td><td>High</td><td>High if the server is the
  bottleneck</td><td>TTFB</td></tr></tbody>

  </table>


  TTFB means time to first byte, the delay before the server starts sending the
  page. LCP means Largest Contentful Paint, the time until the main content
  appears. The impact column is our estimate for a typical WordPress site. Your
  theme, plugins, and traffic will change the results.
mk2: >-
  ## Set a baseline before you change anything


  Without a baseline, you cannot tell whether a change helped. Run these steps
  first:


  1. Pick three URLs: your homepage, a typical blog post, and your most
  important landing or product page.

  2. Test each one in Google PageSpeed Insights on both mobile and desktop.

  3. Record LCP, INP, CLS, and TTFB, along with the date and time.


  Use these thresholds to read the results. For field data, measured at the 75th
  percentile of real visits, a good score means LCP of 2.5 seconds or less, INP
  of 200 milliseconds or less, and CLS of 0.1 or less. Poor means LCP above 4
  seconds, INP above 500 milliseconds, or CLS above 0.25, according to [Anderson
  Collaborative's Core Web Vitals
  guide](https://www.andersoncollaborative.com/knowledge-base/what-are-core-web-vitals-2026-guide/).


  INP, or Interaction to Next Paint, replaced First Input Delay as a Core Web
  Vital in March 2024. It measures how quickly the page responds when someone
  clicks or taps. LCP breaks into four parts: time to first byte, resource load
  delay, resource load duration, and element render delay. Knowing which part is
  slow tells you which fix to try first. Server work shows up in TTFB, while a
  heavy hero image shows up in resource load duration.


  ## 1. Turn on page caching (low effort, high impact)


  Without caching, WordPress builds every page from PHP and database queries
  each time someone visits. A caching plugin saves a finished copy of the page
  and serves that copy to visitors. Popular options include WP Rocket and W3
  Total Cache. Turn on page caching first, then check that the plugin clears the
  cache when you publish or update content, so visitors never see outdated
  pages.


  Caching mostly improves TTFB. Test it while logged out, because most caching
  plugins skip the cache for logged-in users, including you when you manage the
  site.


  **What to measure:** TTFB on your homepage before and after. If TTFB drops
  sharply while the rest of the page stays the same, caching did its job.


  ## 2. Compress and resize your images (low to medium effort, high impact)


  Images are often the heaviest part of a page, and the largest one above the
  fold is frequently your LCP element. Start with size. A 3000-pixel photo
  displayed at 800 pixels sends far more data than the screen needs. Resize each
  image to its display width, compress it, and use a modern format such as WebP.
  WebP files are often smaller than JPEG files at similar quality, though the
  savings vary from image to image.


  Most image optimization plugins can compress your media library in bulk. Keep
  copies of the originals so you can re-export them later if you change your
  layout.


  **What to measure:** LCP on the pages with the biggest images. PageSpeed
  Insights also lists image opportunities in its diagnostics, so you can see
  exactly which files are the worst offenders.
mk3: >-
  ## 3. Update PHP and WordPress (low to medium effort, medium to high impact)


  Newer PHP versions generally run WordPress faster, and most hosts let you
  switch the PHP version from the control panel. Choose a version that your
  theme and plugins support, then update WordPress core, your theme, and every
  plugin. Back up your site first and test on a staging copy when you can,
  because a jump in PHP version can break older plugins.


  **What to measure:** TTFB. Changes in server processing appear there first.


  ## 4. Audit and remove plugins (medium effort, medium to high impact)


  Every plugin adds code to your pages, and some run database queries on every
  load. Deactivate and delete anything you do not use. Look for overlaps, such
  as two SEO plugins or two caching plugins competing with each other. For each
  plugin you keep, confirm that it still does something you actually need.


  Change one plugin at a time. Disable one, retest, and then decide whether to
  keep it. This turns a messy cleanup into a clear list of what helped and what
  did not.


  **What to measure:** TTFB for server-side plugin work, and INP for scripts
  that make the page slow to respond when someone clicks.


  ## 5. Fix lazy loading for the hero image (low effort, medium impact)


  WordPress 5.5 and later lazy loads images natively, which means images further
  down the page load only as readers scroll toward them. That saves bandwidth.
  The trap is the image at the top of the page. If your hero image is lazy
  loaded, the browser waits before fetching it, and that delays LCP.


  Keep lazy loading for images below the fold, and make sure the first large
  image loads right away. Some themes and plugins apply lazy loading to every
  image, so check the page source for your hero image.


  **What to measure:** LCP. If PageSpeed Insights flags a resource load delay on
  your main image, lazy loading is a likely cause.


  ## 6. Add a CDN (medium effort, impact depends on your visitors)


  A content delivery network, or CDN, stores copies of your static files, such
  as images, CSS, and JavaScript, on servers around the world. Visitors download
  those files from a nearby location instead of from your main server. The gain
  is largest when many visitors live far from your host. If most of your
  audience sits close to your server, expect a smaller improvement.


  A CDN mainly speeds up resource load duration. It helps less with HTML that is
  generated fresh for each visitor, unless the CDN also caches full pages.


  **What to measure:** LCP, compared before and after the change on the same
  pages.
mk4: >-
  ## 7. Move to better hosting (high effort, high impact when the server is the
  bottleneck)


  Hosting comes last because it takes the most work. A migration means copying
  files and databases, updating DNS, and checking everything afterward. But if
  TTFB stays high after caching, updates, and plugin cleanup, the server itself
  is probably the bottleneck. Crowded shared servers often show this pattern.


  Look for hosts that offer server-level caching, a current PHP version, and
  enough resources for your traffic. Ask the host directly how it handles
  caching and whether it provides staging. Then compare the new host's TTFB with
  your baseline using the same pages. If you are still deciding which platform
  to build on, read our [Webflow vs WordPress
  comparison](https://www.3minread.com/webflow-vs-wordpress-which-platform-reigns-supreme-for-your-next-website)
  before you commit to a hosting plan.


  **What to measure:** TTFB before and after the move. If TTFB does not improve,
  the problem is more likely in your theme, plugins, or database than in the
  host.


  ## Also worth checking: the Heartbeat API and database cleanup


  The WordPress Heartbeat API keeps the editor and dashboard in sync by sending
  regular AJAX requests to admin-ajax.php. These requests are normal, but on a
  server with limited resources they add load while you edit. Some optimization
  plugins let you slow Heartbeat down or limit it to certain screens. Database
  cleanup, such as removing spam comments and expired transients, also helps,
  though the gains are usually smaller than the seven fixes above.


  ## How to measure changes without fooling yourself


  Measurement is where most speed projects go wrong. Keep these rules in mind:


  - **Change one thing at a time.** Make a single change, retest the same URLs,
  and write down the result.

  - **Lab results come first.** PageSpeed Insights lab data is collected in a
  controlled test on a mid-tier mobile device over a simulated mobile network,
  so you can see a change within minutes.

  - **Field data takes time.** PageSpeed Insights field data uses a rolling
  28-day collection period, so a fix can take weeks to appear. Google's
  PageSpeed Insights documentation explains how the two data types differ.

  - **Lab improved but field is still poor?** Do not assume the fix failed.
  Field data reflects real visitors on many devices and networks, and it covers
  a 28-day window. Give it time before you judge.

  - **Low-traffic sites need a different approach.** If your site does not get
  enough visits for Google to collect field data, rely on lab tests. Run each
  test several times and compare typical results, not one lucky run.


  Ahrefs also recommends testing changes on a staging copy first and comparing
  before-and-after results, as covered in its [WordPress speed
  guide](https://ahrefs.com/blog/speed-up-wordpress/).
mk5: >-
  ## Frequently asked questions


  ### Can I speed up WordPress without a plugin?


  Yes, partly. You can update PHP and WordPress, remove unused plugins and
  themes, resize images before you upload them, and choose a host with caching
  built in. Page caching is easiest with a plugin, although some hosts provide
  it at the server level.


  ### Is it safe to delete the cache?


  Yes. WordPress and your caching plugin rebuild the cache on the next visit.
  The first few visitors after clearing may see a slightly slower page, which is
  normal. Clear the cache after major design or content changes.


  ### Do I need a developer to speed up my WordPress site?


  Probably not for caching, image compression, updates, or plugin cleanup, since
  those are settings and uploads. A developer can help with hosting migrations,
  custom theme code, or database work, especially if your site handles orders or
  memberships. If you are still choosing a platform, our [Webflow vs WordPress
  comparison](https://www.3minread.com/webflow-vs-wordpress-which-platform-reigns-supreme-for-your-next-website)
  covers the trade-offs.


  ### Why is my mobile score lower than my desktop score?


  Mobile tests use a slower simulated device and a slower network, so the
  numbers are harder to hit. Compare mobile results with earlier mobile results,
  not with desktop.


  ### How long until field data shows my changes?


  Field data uses a rolling 28-day window, so expect several weeks. Lab results
  update almost immediately after each test.


  ## The takeaway


  Start with page caching, image compression, and updates, since they deliver
  the biggest gains for the least work. Then clean up plugins and fix lazy
  loading for your hero image. Add a CDN or change hosts only if your numbers
  point to that bottleneck. Measure each change on the same URLs, one at a time,
  and give field data a few weeks. That approach tells you exactly what worked.
---

