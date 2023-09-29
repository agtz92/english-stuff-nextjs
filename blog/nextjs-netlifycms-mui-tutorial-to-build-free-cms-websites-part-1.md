---
title: Nextjs + NetlifyCMS + MUI Tutorial to Build Free CMS Websites Part 1
date: 2023-09-29T16:46:50.829Z
featuredimage: /assets/nextjsnetlify.webp
categoria: Tech
deals: Yes
tags:
  - "#netlfiy"
  - "#nextjs"
  - "#techlife"
  - "#programming"
short-description: In this comprehensive tutorial, we'll break down the
  complexities of Next.js, a powerful React framework for building modern web
  applications, and demonstrate how seamlessly it integrates with NetlifyCMS, a
  user-friendly content management system. Whether you're a seasoned developer
  or just starting, our step-by-step guide will help you harness the full
  potential of these tools.
mk1: >-
  📌 What you'll learn:


  * Setting up a Next.js environment for your project

  * Integrating NetlifyCMS for effortless content management

  * Customizing your website's design and functionality

  * Deploying your website to Netlify for free hosting

  * Optimizing SEO and performance for a stellar user experience

    **Part 2 of the tutorial:** Nextjs + NetlifyCMS + MUI Tutorial to Build Free CMS Websites Part 2

  Join us as we empower you with the skills and knowledge to create dynamic, content-driven websites that you can manage with ease. Say goodbye to costly CMS solutions and hello to the future of web development! 💻🌐


  T﻿he inspiration was taken from [this awesome project](https://dev.to/siddharthroy/build-a-free-blog-with-nextjs-and-netlify-cms-125h)
mk2: >-
  ## Get Started


  Enter this command and it will set up a basic Next.js project for you: (optional if you already have a Nextjs project of your own)


  ```

  npx create-next-app nextjs-blog

  # or

  yarn create next-app nextjs-blog

  ```


  A﻿fter the creation of the project is done, use the next command to start the development server


  ```

  yarn dev

  # or

  npm dev

  ```


  As we've chosen MUI as our UI suite, you may want to consider installing it as well. However, please note that this step is entirely optional. If MUI doesn't align with your preferences, feel free to skip any instructions related to it. I personally find it very convenient to work with, but the choice is ultimately yours. You can [learn more about MUI here](https://mui.com/)


  ```

  npm install @mui/material @emotion/react @emotion/styled

  ```


  Test your project by using the next command:


  ```

  npm run dev

  ```
mk3: >-
  B﻿ack to Nextjs, When examining the directory, you'll encounter three distinct
  folders: 


  1. **pages**

  2. **public**

  3. **styles**


  I﻿f they are not shown as above, you'll need to create them in order to follow with this tutorial. This is how my project looks like


  ![Nextjs + NetlifyCMS + MUI Tutorial to Build Free CMS Websites](/assets/tutorialimg2.jpg "Nextjs + NetlifyCMS + MUI Tutorial to Build Free CMS Websites")


  Their purposes are rather self-evident, so there's no need for an extensive explanation.


  Inside the **pages** directory, you may notice an **API** folder. This directory is designated for creating REST APIs, but it won't be utilized in this project. Feel free to remove it if you wish.


  Now, let's delve into the **_app.js** file, which serves as the entry point for our application, akin to **index.js** in a typical **create-react-app** setup.


  In contrast to the conventional **create-react-app** approach, Next.js employs a distinct routing system. Instead of relying on **react-router**, we create new React components within the **pages** directory, with each component's filename serving as the route name.
mk4: >-
  ## F﻿irst Page


  Since we're rolling with MaterialUI to make things easier, here's a simple card component to show off your blog posts on the landing page. If you're MUI-savvy, feel free to jazz it up a bit. This way, you'll whip up a cool landing page in no time! 


  (pages/index.js)


  ```

  import {
      Box,
      Button,
      Card,
      CardActionArea,
      CardContent,
      Grid,
    } from "@mui/material"
    import React from "react"
    
    const index = () => {
      const posts = [
        {
          title: "Post 1",
          description: "Bacon ipsum dolor amet brisket cow rump, capicola",
        },
        {
          title: "Post 2",
          description:
            "Pastrami pig chuck tongue. Boudin venison t-bone picanha ribeye.",
        },
        {
          title: "Post 3",
          description: "Ham hock pork loin capicola, cow tenderloin prosciutto",
        },
        {
          title: "Post 4",
          description: "Beef meatball landjaeger, boudin hamburger buffalo",
        },
      ]
      return (
        <Box sx={{ margin: 20 }}>
          <h1 style={{ width: "100%", textAlign: "center" }}>Test Index</h1>
          <Grid container spacing={4}>
            {posts.map((post) => (
              <Grid key={post.title} item xs={12} md={4}>
                <Card sx={{ padding: 5 }}>
                  <CardContent>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                  </CardContent>
                  <CardActionArea>
                    <Button variant="contained" to="/">
                      Learn more
                    </Button>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )
    }
    
    export default index


    
  ```


  A﻿dd some styling to your project by going to the styles folder at root level if you want it to have a different look. MUI has a lot of integrated styles but most of them can be changed using the sx={{}} attribute or at your styles folder


  (﻿styles/global.css)


  ```


  @import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap");


  /*Styling*/

  html,

  body {
    max-width: 100vw;
    overflow-x: hidden;
    font-family: Merriweather, serif;
    background-color: #f5f5f5;
    color: #000;
  }

  /*MUI buton class*/

  .MuiButtonBase-root{
    font-family: Merriweather, serif;
  }

  ```


  ## W﻿hat I did:


  I've put together an array of objects that mirrors the desired appearance of our blog posts on the index page. Instead of using generic "Lorem Ipsum" text, I've infused a bit of flavor by incorporating my favorite sample text generator from [baconipsum.com](https://baconipsum.com/). Feel free to tap into it to add some zest to your placeholder content. 🥓


  N﻿ow you will have something looking like this:


  ![Nextjs + NetlifyCMS + MUI Tutorial to Build Free CMS Websites](/assets/tutorialimg11.jpg "Nextjs + NetlifyCMS + MUI Tutorial to Build Free CMS Websites")
mk5: >-
  N﻿ow create a folder at root named "posts" and create a new file named
  "my-first-blog.md"


  H﻿ere's the content


  (﻿posts/my-first-blog.md)


  ```

  ---

  title: "My First Blog"

  date: 29, September, 2023


  description: Bacon ipsum dolor amet brisket cow rump, capicola pastrami pi
    Buffalo cow jerky, tail ham hock chicken sirloin meatloaf porchetta prosciutto short ribs beef ribs strip steak. Chicken kielbasa filet mignon, capicola buffalo swine short loin doner corned beef pancetta. Ham hock pork loin capicola, cow tenderloin prosciutto ground round bresaola brisket turducken short ribs filet mignon tongue ribeye.
  ---

  # New Blog


  Spare ribs ball tip beef ribs corned beef leberkas cow. Beef meatball landjaeger, boudin hamburger buffalo bacon turkey tri-tip ham hock turducken andouille strip steak pancetta. Salami tail turducken beef ribs filet mignon. Boudin ball tip sirloin, turkey turducken prosciutto shoulder landjaeger beef ribs burgdoggen. Andouille frankfurter boudin hamburger cow turkey shankle salami beef ribs tenderloin.


  ## Header 2


  Tri-tip meatball pancetta short ribs porchetta doner corned beef salami spare ribs kielbasa ham shankle. Cow rump prosciutto fatback chislic. Picanha pork jerky t-bone porchetta. Pig chuck ground round doner rump chicken ham porchetta tongue spare ribs pork loin drumstick. Strip steak jowl pig chislic rump. Frankfurter pork belly ribeye ball tip bacon jerky chislic tri-tip short ribs cow sirloin leberkas. Chicken shank brisket capicola short loin beef ribs, pork strip steak kielbasa burgdoggen pork loin pork belly tongue turducken jowl.


  > a Tenderloin in a blockquote

  ```


  Now before anything else, you need to install a library that allows your project to read md files


  ```

  npm install gray-matter

  # or

  yarn add gray-matter

  ```


  N﻿ow, we have to modify the index page to get the posts dynamically and reflect the posts that we have created


  ```

  import React from "react"

  import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Grid,
  } from "@mui/material"

  import fs from "fs"

  import matter from "gray-matter"

  import Link from "next/link"

  import Head from "next/head"


  const index = ({posts}) => {

  /*   const posts = [
      {
        title: "Post 1",
        description: "Bacon ipsum dolor amet brisket cow rump, capicola",
      },
      {
        title: "Post 2",
        description:
          "Pastrami pig chuck tongue. Boudin venison t-bone picanha ribeye.",
      },
      {
        title: "Post 3",
        description: "Ham hock pork loin capicola, cow tenderloin prosciutto",
      },
      {
        title: "Post 4",
        description: "Beef meatball landjaeger, boudin hamburger buffalo",
      },
    ] */
    return (
      <Box sx={{ margin: 20 }}>
        <Head>
          <title>My new Blog</title>
        </Head>
        <h1 style={{ width: "100%", textAlign: "center" }}>Test Index</h1>
        <Grid container spacing={4}>
          {posts.map((post) => (
            <Grid key={post.title} item xs={12} md={4}>
              <Card sx={{ padding: 5 }}>
                <CardContent>
                  <h2>{post.title}</h2>
                  <p>{post.description}</p>
                </CardContent>
                <CardActionArea>
                  <Button variant="contained" to="/">
                    Learn more
                  </Button>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    )
  }


  export default index


  export async function getStaticProps() {
      // List of files in blgos folder
      const filesInBlogs = fs.readdirSync('./posts')
    
      // Get the front matter and slug (the filename without .md) of all files
      const posts = filesInBlogs.map(filename => {
        const file = fs.readFileSync(`./posts/${filename}`, 'utf8')
        const matterData = matter(file)
    
        return {
          ...matterData.data, // matterData.data contains front matter
          slug: filename.slice(0, filename.indexOf('.'))
        }
      })
    
      return {
        props: {
          posts
        }
      }
    
    }
  ```


  ### C﻿ontinue this tutorial here: 


  **Part 2 of the tutorial:** Nextjs + NetlifyCMS + MUI Tutorial to Build Free CMS Websites Part 2
---
H﻿ave a great day!