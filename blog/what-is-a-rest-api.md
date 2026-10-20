---
title: What Is a REST API? A Plain-English Explainer for Beginners
date: '2026-10-20T14:08:50.569Z'
featuredimage: /assets/evergreen/what-is-a-rest-api.jpg
categoria: Tech
tags:
  - '#API'
  - '#REST'
  - '#HTTP'
  - '#WebDev'
short-description: >-
  What is a REST API? Learn it with a restaurant analogy, plain-English GET,
  POST, PUT and DELETE examples, and the beginner mistakes to avoid.
deals: 'No'
mk1: >-
  So, what is a REST API? A REST API is an interface that lets one program
  request data or trigger actions in another program over HTTP, the same
  protocol your browser uses to load web pages. It exposes resources at URLs and
  lets clients act on them with a small set of standard verbs: GET, POST, PUT,
  and DELETE. Learn those four and you can read most API documentation.


  ## What Is a REST API, in Plain English


  REST stands for Representational State Transfer. The term comes from Roy
  Fielding's 2000 doctoral dissertation at UC Irvine, where he described an
  architectural style for networked systems. The [Chapter 5 text of the
  dissertation](https://roy.gbiv.com/pubs/dissertation/rest_arch_style.htm) lays
  out those constraints. An API that follows them is called a REST API, or
  "RESTful."


  REST is not a protocol you install or a file format you parse. Red Hat makes
  this point in its [explainer on REST
  APIs](https://www.redhat.com/en/topics/api/what-is-a-rest-api). It is a set of
  design rules. IBM lists six of them in its [overview of REST
  APIs](https://www.ibm.com/think/topics/rest-apis), including a uniform
  interface, which means resources are reached in a consistent way.


  Here is the one thing to remember: every REST API is an API, but not every API
  is REST.
mk2: >-
  ## The Restaurant Analogy


  Think about ordering dinner. You don't walk into the kitchen and start
  cooking. You read the menu, tell the waiter what you want, and the waiter
  brings back a dish. A REST API works the same way:


  - **You** are the client, such as a mobile app or a website.

  - **The menu** is the API documentation, which lists what you can ask for.

  - **The waiter** is the API, carrying your request to the right place and
  bringing back the answer.

  - **The kitchen** is the server, which holds the data and does the work.

  - **Your order** is the HTTP request, and **the dish** is the response,
  usually in JSON.


  For the verbs below, we'll use one imaginary bistro booking system. Each
  reservation lives at its own address, such as /reservations/42, and the verb
  tells the waiter what to do with it. The domain bistro.example is a
  placeholder.


  ### GET: Read Without Changing Anything


  GET asks for information. It's like asking the waiter, "What time is my
  booking?"


  Request: `GET /reservations/42` with no body.


  The server answers with `200 OK` and the current data, for example `{"id": 42,
  "name": "Ana", "party_size": 2, "time": "19:30"}`.


  GET should only read. Calling it ten times should not change anything on the
  server.


  ### POST: Create Something New


  POST adds something new. It's like placing a brand-new booking.


  Request: `POST /reservations` with the body `{"name": "Ana", "party_size": 2,
  "time": "19:30"}`.


  A good response is `201 Created`, with a `Location` header pointing to the new
  record, such as `/reservations/43`. Notice that the server chose the new ID.
  The [HTTP methods guide from REST API
  Tutorial](https://www.restapitutorial.com/introduction/httpmethods) recommends
  this 201 Created pattern for POST.


  ### PUT: Replace Something at a Known Address


  PUT updates an existing item by sending its complete new state. It's like
  telling the waiter, "Change booking 42 to four people at 8:00 PM," but with
  the full booking details, not just the changes.


  Request: `PUT /reservations/42` with the body `{"name": "Ana", "party_size":
  4, "time": "20:00"}`.


  The usual success response is `200 OK`. If you leave out a field, many APIs
  will treat it as missing, so send the full record. Some APIs also let PUT
  create a resource at that exact address when none exists. Check the
  documentation for the API you're using.


  ### DELETE: Remove It


  DELETE cancels the booking.


  Request: `DELETE /reservations/42` with no body.


  A typical success response is `204 No Content`, meaning the request worked and
  there is nothing to send back. If you send the same DELETE again, the
  reservation is still gone, and the server usually answers with `404 Not
  Found`.


  ### Why Repeating a Request Can Be Safe: Idempotency


  A method is idempotent if sending it twice has the same effect as sending it
  once. [Moesif's guide to API
  methods](https://www.moesif.com/blog/technical/api-methods/) lists GET, PUT,
  and DELETE as idempotent and POST as not. That's why retrying a PUT after a
  network glitch is safe, while retrying a POST can create two bookings.


  <table>

  <thead><tr><th>Verb</th><th>What it does</th><th>Typical success
  response</th><th>Idempotent?</th></tr></thead>

  <tbody><tr><td>GET</td><td>Reads a resource</td><td>200
  OK</td><td>Yes</td></tr><tr><td>POST</td><td>Creates a resource</td><td>201
  Created</td><td>No</td></tr><tr><td>PUT</td><td>Replaces a
  resource</td><td>200 OK or 204 No
  Content</td><td>Yes</td></tr><tr><td>DELETE</td><td>Removes a
  resource</td><td>204 No Content</td><td>Yes</td></tr></tbody>

  </table>
mk3: >-
  ## PUT vs. POST: The Trap Most Beginners Hit


  These two confuse almost everyone. The question to ask is: who chooses the
  address of the new thing?


  With POST, you send data to a collection such as /reservations, and the server
  decides the new ID and URL. With PUT, you name the exact address, such as
  /reservations/42, and send the complete state for that item. If you already
  know the ID, PUT is the natural choice. If the server should assign it, use
  POST.


  A simple rule of thumb: POST to the collection to create, and PUT to a
  specific item to replace it.
mk4: >-
  ## Where the Restaurant Analogy Breaks


  The analogy works well until you ask what the waiter remembers. A human waiter
  recalls that you like the window table and that you're allergic to nuts. A
  REST API is stateless, which means the server does not keep track of your
  previous requests between calls. Every request has to carry everything the
  server needs: an authentication token, the resource ID, and the data to
  change.


  In practice, you send your API key with every request, not once at the start
  of a session. Stateless design keeps servers simpler to run and scale, and it
  is one reason REST fits the web so well.
mk5: >-
  ## Common Beginner Mistakes


  1. **Thinking REST means JSON.** REST describes how requests are structured.
  JSON is simply the most common data format used in responses.

  2. **Assuming every API is REST.** SOAP and GraphQL are also API styles, and
  each has its own rules.

  3. **Putting verbs in URLs.** Write `GET /reservations/42`, not
  `/getReservation?id=42`. The method already says the action, so URLs should
  name resources.

  4. **Sending a body with GET.** A GET request has no defined meaning for a
  body, and many servers, proxies, and caches ignore or reject it. Put filters
  in the query string instead, such as `/reservations?party_size=2`.

  5. **Returning 200 OK for errors.** Clients rely on status codes. A failed
  booking should return an error code such as 400 or 404, not a 200 with an
  error message hidden in the body.

  6. **Mixing up PUT and POST.** See the section above for the difference.

  7. **Assuming DELETE can be undone.** Many deletes are permanent. Read the
  documentation before you rely on a restore option.


  ## Frequently Asked Questions


  ### Is a REST API the same as an API?


  No. "API" is the broad category. A REST API is one style of API that follows
  REST constraints and usually runs over HTTP.


  ### Is REST a protocol?


  No. REST is a set of design constraints. It relies on HTTP, which is the
  protocol that carries the requests and responses.


  ### What does REST stand for?


  Representational State Transfer. The name matters less than the idea behind
  it: resources at URLs, accessed through standard methods.


  ### What is the difference between PUT and POST?


  POST creates a new item in a collection and lets the server assign its
  address. PUT replaces an item at an address you specify. When in doubt, check
  the API documentation.


  ## Conclusion


  A REST API lets programs talk to each other through standard HTTP requests.
  Remember the four verbs: GET reads, POST creates, PUT replaces, and DELETE
  removes. Keep URLs focused on nouns, check status codes, and remember that the
  server won't remember you between requests. With those basics, the next API
  documentation you open will be much easier to read.
---

