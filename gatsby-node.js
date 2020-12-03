const path = require("path");

// Create Slugs for Markdown Files (No Needed for Contentful CMS)
// module.exports.onCreateNode = ({ node, actions }) => {
//     const { createNodeField } = actions

//     if(node.internal.type === "MarkdownRemark") {
//         const slug = path.basename(node.fileAbsolutePath, '.md');
//         createNodeField({
//             node,
//             name: "slug",
//             value: slug
//         })
//     }
// }

// Creating Dynamic Pages with Markdown

// module.exports.createPages = async ({graphql,actions}) => {
//     const {createPage} = actions;

//     const blogTemplate = path.resolve("./src/templates/blog.js");
//     const res = await graphql(`
//         query {
//             allMarkdownRemark {
//                 edges {
//                     node {
//                         fields {
//                             slug
//                         }
//                     }
//                 }
//             }
//         }
//     `)

//     res.data.allMarkdownRemark.edges.forEach((edge) => {
//         createPage({
//             component: blogTemplate,
//             path: `/blog/${edge.node.fields.slug}`,
//             context: {
//                 slug: edge.node.fields.slug
//             }
//         })
//     })
// }

// Creating Dynamic Pages with Contentful

module.exports.createPages = async ({graphql,actions}) => {
    const {createPage} = actions;

    const blogTemplate = path.resolve("./src/templates/blog.js");
    const res = await graphql(`
        query {
            allContentfulBlogPost {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)

    res.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })
}