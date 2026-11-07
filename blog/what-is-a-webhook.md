---
title: What Is a Webhook? A Plain-English Explainer for Beginners
date: '2026-11-07T14:14:19.523Z'
featuredimage: >-
  https://images.unsplash.com/photo-1609162554108-6490759499ef?ixid=M3wxMTA0MDg1fDB8MXxzZWFyY2h8MXx8d2ViaG9vayUyMGRhdGElMjBub3RpZmljYXRpb258ZW58MXwwfHx8MTc5NDA2MDYyOXww&ixlib=rb-4.1.0&w=1600&h=900&fit=crop&crop=entropy&fm=jpg&q=75
categoria: Tech
tags:
  - '#Webhooks'
  - '#APIs'
  - '#Automation'
  - '#Beginners'
short-description: >-
  What is a webhook? Learn the plain-English definition, a doorbell analogy, a
  real store example, and how webhooks differ from APIs and polling.
deals: 'No'
mk1: >-
  <p><small><em>Photo by <a
  href="https://unsplash.com/@purzlbaum?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Claudio Schwarz</a> on <a
  href="https://unsplash.com/?utm_source=EvergreenSEO&utm_medium=referral"
  rel="noopener">Unsplash</a></em></small></p>


  ## What is a webhook? A simple answer


  So, what is a webhook? A webhook is a way for one app to send information to
  another app automatically, the moment something happens. Instead of your app
  repeatedly asking whether anything has changed, the sending app pushes the
  update to a web address you set up. That address is called an endpoint, and
  the message that arrives is usually a small JSON file describing what
  happened.


  The term sounds more technical than the idea. In this explainer, we use one
  analogy from start to finish, walk through a real two-app example, and finish
  with a test you can run without writing any code.


  ## The doorbell analogy


  Think about your front door. You could spend the afternoon standing at the
  window, checking the street every few minutes for a delivery. Or you could
  wait for the doorbell, which only rings when someone is actually there.


  A webhook works like the doorbell:


  - **The doorstep** is your endpoint, the fixed spot where messages can reach
  you.

  - **The ring** is the HTTP POST request the sending app makes.

  - **The note the visitor hands you** is the payload, the data about what
  happened.

  - **The visitor** is the app that sent the event, such as an online store or a
  code repository.


  Standing at the window every few minutes is what developers call polling. We
  will compare the two shortly.
mk2: >-
  ## A real example: an online store and a team chat


  Imagine a small online shop. Each time a customer places an order, the team
  wants a message in their chat channel so someone can start packing the box.
  Here is how a webhook handles it:


  1. In the store's settings, the owner pastes the address of a small receiver
  the team controls and selects new orders as the event.

  2. A customer checks out, and the store records the order.

  3. The store sends an HTTP POST to the receiver's address, with the order
  details in the body.

  4. The receiver reads the JSON, checks that the request is genuine, and posts
  a short message to the team chat.


  A simplified payload might look like this:


  ```json

  {
    "event": "order.created",
    "order_id": "1042",
    "items": 2,
    "total": "49.90",
    "currency": "USD"
  }

  ```


  Nobody had to check for orders. The message arrived when the order happened,
  and payment and commerce platforms often work this way. Stripe, for example,
  sends webhook events to your app as a JSON payload that includes event
  information, delivered over HTTPS ([Stripe's webhook
  documentation](https://docs.stripe.com/webhooks)).


  ## Webhook vs. API: the short version


  People often ask whether a webhook is an API. The two work together, but they
  play different roles. An API is a set of rules that lets one program request
  data or trigger actions in another. A webhook reverses the direction: the
  source sends data to you when something changes. If you want the
  request-and-response side in detail, our [REST API
  explainer](https://www.3minread.com/what-is-a-rest-api) covers how those calls
  work.
mk3: >-
  ## Webhooks vs. polling: which one should you use?


  Polling means your app checks the source on a schedule, usually with ordinary
  API calls like the ones described in our [REST API
  explainer](https://www.3minread.com/what-is-a-rest-api). Webhooks flip that
  pattern. GitHub's documentation says webhooks require less effort and fewer
  resources than polling an API. When a subscribed event occurs, GitHub sends an
  HTTP request with data about the event to the URL you specified ([GitHub Docs:
  About webhooks](https://docs.github.com/en/webhooks/about-webhooks)).


  <table>

  <thead><tr><th></th><th>Polling</th><th>Webhook</th></tr></thead>

  <tbody><tr><td>Who starts the request</td><td>Your app</td><td>The sending
  app</td></tr><tr><td>When it checks</td><td>On a schedule</td><td>When an
  event happens</td></tr><tr><td>Wasted requests</td><td>Many, if nothing
  changed</td><td>Few</td></tr><tr><td>Setup</td><td>Call the API and read the
  result</td><td>Needs a public endpoint</td></tr><tr><td>Best
  for</td><td>Periodic reports, sources without webhooks</td><td>Time-sensitive
  events like payments or new tickets</td></tr></tbody>

  </table>


  Polling is not wrong. If you only need a daily summary, or the source offers
  no webhooks, a scheduled check is simpler to build. Webhooks shine when timing
  matters.


  ## How a webhook delivery works, step by step


  1. **You register a URL** with the provider.

  2. **An event occurs**, such as a payment or a code push.

  3. **The provider sends an HTTP POST** with a JSON payload.

  4. **Your endpoint returns a success response.**

  5. **Your app processes the data**, often in a background job.


  The response step matters more than beginners expect. GitHub's documentation
  explains that if the server takes too long to respond, GitHub ends the
  connection and treats the delivery as a failure ([GitHub Docs: Handling
  webhook
  deliveries](https://docs.github.com/en/webhooks/using-webhooks/handling-webhook-deliveries)).
  The safe pattern is to accept the message quickly, return a success code, and
  do the heavier work afterward.
mk4: >-
  ## What happens when a webhook fails?


  Failures are normal. Your server could be down for maintenance, a network
  connection could drop, or your code could crash on an unexpected payload. When
  that happens, the message may never reach your app, unless the provider tries
  again.


  Three problems come up again and again:


  - **Missed events.** A delivery fails and nothing retries it. Look for a
  delivery log in your provider's dashboard so you can spot and replay missed
  events.

  - **Duplicates.** The same event can arrive twice, for example after a retry.
  Store each event ID and skip any you have already handled.

  - **Out-of-order arrival.** Event B can reach you before event A. Compare
  timestamps or status fields instead of assuming messages arrive in sequence.


  Good webhook code plans for all three from day one, rather than treating them
  as edge cases.


  ## Is a webhook secure?


  A webhook endpoint is a public URL, so anyone who finds it can send it a
  request. Twilio's explainer describes an endpoint as a publicly reachable URL
  on your server that accepts incoming HTTP POST requests from a provider
  ([Twilio's guide to
  webhooks](https://www.twilio.com/en-us/blog/insights/whats-webhook)). That
  openness is why many providers sign their messages. The sender uses a secret
  key to generate a signature from the payload. Your app recalculates the
  signature and compares the two. If they do not match, you reject the request.


  The most common method is HMAC, a standard way to create signatures using a
  hash function. Keep the secret out of your code and your logs, and reject any
  request that fails the check. Check your provider's documentation for the
  exact steps. Stripe's webhook guide, for instance, explains how endpoints
  receive and verify events.
mk5: >-
  ## Try it yourself: catch a real webhook without code


  You can see a webhook in action in about five minutes:


  1. Open a webhook testing tool such as webhook.site, which gives you a unique
  URL to receive requests.

  2. In a service you control that supports webhooks, such as a code repository
  where you have admin access, open the webhook settings and paste that URL as
  the payload URL.

  3. Trigger an event, such as pushing a small change or opening an issue.

  4. Watch the request appear in the testing tool. Open it and look at the
  method, the headers, and the JSON body.


  Look for three things: the POST method, an event type field, and the data
  itself. You have just seen a webhook from start to finish. Use test
  repositories and dummy data, never real customer information.


  ## Frequently asked questions


  ### Is a webhook the same as a REST API?


  No. A webhook is a notification that one app sends to a URL you control. A
  REST API is a set of rules for requesting data or actions. Many systems use
  both: the webhook tells you something happened, and an API call fetches the
  full details.


  ### Is a webhook just a URL?


  Not quite. The URL is the endpoint, the address that receives messages. The
  webhook is the whole arrangement: the subscription to an event, the HTTP POST,
  and the payload that follows.


  ### When should I use polling instead of a webhook?


  Use polling when the source offers no webhooks, when you only need periodic
  checks, or when your system cannot receive incoming requests, for example
  because it has no public address.


  ### What is an example of a webhook?


  A payment platform notifying your app when a customer pays is a common one. A
  code repository notifying a build system after a push is another. The online
  store example above follows the same pattern.


  ## The takeaway


  A webhook is a doorbell for software. The sending app rings your endpoint when
  something happens, and your app responds. It saves effort compared with
  constant checking, but it requires a reachable endpoint, a plan for failures,
  and signature checks. Start with a test URL, look at a real payload, and build
  from there.
---

