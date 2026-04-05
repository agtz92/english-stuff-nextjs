import { Box } from "@mui/material"
import Head from "next/head"
import React from "react"
import { sitename, sitedomain } from "../components/siteData"

const Privacy = () => {
  return (
    <Box sx={{ paddingLeft: 20, paddingRight: 20 }}>
      <Head>
        <title>Privacy Policy | {sitename}</title>
        <meta name="description" content={`Privacy Policy for ${sitename}. Learn how we collect, use, and protect your personal information.`} />
        <link rel="canonical" href={`${sitedomain}/privacy`} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Privacy Policy | ${sitename}`} />
        <meta property="og:url" content={`${sitedomain}/privacy`} />
        <meta property="og:site_name" content={sitename} />
      </Head>
      <h1>Privacy Policy</h1>
      <p>Effective Date: 10/5/2023</p>

      <h2>1. Introduction</h2>
      <p>
        Welcome to 3minread.com (the `&quot;`Website`&quot;`). At 3minread.com, we respect
        your privacy and are committed to protecting your personal information.
        This Privacy Policy explains how we collect, use, and disclose
        information that we obtain from visitors to our Website.
      </p>

      <h2>2. Information We Collect</h2>
      <p>
        We may collect the following types of information when you visit our
        Website:
      </p>
      <ul>
        <li>
          Personal Information: This may include your name, email address, and
          any other information you voluntarily provide when using our services.
        </li>
        <li>
          Log Data: We collect information that your browser sends whenever you
          visit our Website. This may include your IP address, browser type, the
          pages of our Website that you visit, and other statistics.
        </li>
        <li>
          Cookies: We use cookies to enhance your user experience. You can
          configure your browser to refuse all cookies or to indicate when a
          cookie is being sent.
        </li>
      </ul>

      <h2>3. How We Use Your Information</h2>
      <p>
        We may use the information we collect for various purposes, including:
      </p>
      <ul>
        <li>To provide, maintain, and improve our services.</li>
        <li>
          To communicate with you, respond to your inquiries, and send you
          updates and promotional materials.
        </li>
        <li>To monitor and analyze usage patterns on our Website.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>4. Disclosure of Your Information</h2>
      <p>
        We may share your information with third parties only in the following
        circumstances:
      </p>
      <ul>
        <li>With your consent.</li>
        <li>To comply with legal obligations.</li>
        <li>To protect our rights, privacy, safety, or property.</li>
      </ul>

      <h2>5. Your Choices</h2>
      <p>
        You have the right to access, correct, or delete your personal
        information. You can do so by contacting us at [email address].
      </p>

      <h2>6. Security</h2>
      <p>
        We take reasonable measures to protect your personal information, but
        please be aware that no method of transmission over the internet is 100%
        secure.
      </p>

      <h2>7. Changes to this Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new Privacy Policy on this page.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy, please
        contact us at [contact information].
      </p>

      <p>This Privacy Policy was last updated on 10/5/2023.</p>
    </Box>
  )
}

export default Privacy
