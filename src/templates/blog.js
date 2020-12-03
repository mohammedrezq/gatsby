import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
// import { Video } from 'gatsby-video'
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"

import Layout from "../components/layout"
import Head from "../components/head"

// Markdown Blog post creating

// export const query = graphql`
//   query($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       frontmatter {
//         title
//         date
//       }
//       html
//     }
//   }
// `

/* <h1>
{props.data.markdownRemark.frontmatter.title}
</h1>
<p>
{props.data.markdownRemark.frontmatter.date}
</p>
<div dangerouslySetInnerHTML={{__html: props.data.markdownRemark.html}}></div> */

export const query = graphql`
  query($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      publishedDate(formatString: "MMMM Do, YYYY")
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            title
            file {
              url
            }
            fluid(maxWidth: 750) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
// Soruce : https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-contentful/CHANGELOG.md
const Blog = props => {
  console.log(props)
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        console.log(node)
          return (<Img alt={node.data.target.title} {...node.data.target} />)
    },
    [INLINES.HYPERLINK]: vid => {
      console.log(vid)
      if ( vid.data.uri.indexOf('youtube.com') !== -1 ) {
        return(
          <iframe title="video about gatsby" width="714" height="430" src={vid.data.uri}  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
        )
      }
    }
    },
  }

  // const options = {
  //   renderNode: {
  //     [INLINES.ENTRY_HYPERLINK]: ({
  //       data: {
  //         target: { slug, title },
  //       },
  //     }) => <Link to={slug}>{title}</Link>,
  //     [BLOCKS.EMBEDDED_ASSET]: node => <Img {...node.data.target} />,
  //   },
  // }
  const { title, publishedDate, body } = props.data.contentfulBlogPost
  // const item = JSON.parse(body.raw); using import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
  return (
    <Layout>
      <Head title={title} />
      <h1>{title}</h1>
      <p>{publishedDate}</p>
      {/* Source: https://qiita.com/hey1007/items/6261c374529c482863af */}
      {/* <div>{body.raw}</div> */}
      {/* Source: https://github.com/gatsbyjs/gatsby/discussions/28098
      https://github.com/gatsbyjs/gatsby/discussions/28098#discussioncomment-133393
       */}
      {renderRichText(body,options)}
    </Layout>
  )
}

export default Blog