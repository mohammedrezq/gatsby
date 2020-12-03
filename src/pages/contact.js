import React from "react"
import Head from "../components/head"

import Layout from "../components/layout"

const ContactPage = () => {
  return (
    <Layout>
      <Head title="Contact" />
      <h1>Contact Me</h1>
      <p>
        You can contact me in social media on{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://twitter.com/mohammedrezq2"
        >
          @mohammedrezq2
        </a>{" "}
        Twitter Account
      </p>
    </Layout>
  )
}

export default ContactPage
