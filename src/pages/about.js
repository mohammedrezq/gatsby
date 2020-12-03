import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Head from "../components/head"

const AboutPage = () => {
  return (
    <Layout>
      <Head title="About" />
      <h1>About Me</h1>
      <p>
        My Name is Mohammed Rezq I can do your website at a very good price.
      </p>
      <p>
        Need a developer. <Link to="/contact">Contact Me</Link>
      </p>
    </Layout>
  )
}

export default AboutPage
