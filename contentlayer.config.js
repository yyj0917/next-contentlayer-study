import { defineDocumentType, makeSource } from "contentlayer/source-files"

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: "string",
    resolve: (doc) => {
      const segments = doc._raw.flattenedPath.split("/")
      const normalizedSegments =
        segments[0] === "pages" ? segments.slice(1) : segments
      const pathname = normalizedSegments.join("/")

      if (pathname.length === 0 || pathname === "index") {
        return "/"
      }

      return `/${pathname}`
    },
  },
  slugAsParams: {
    type: "string",
    resolve: (doc) => {
      const [, ...segments] = doc._raw.flattenedPath.split("/")
      const pathname = segments.filter(Boolean).join("/")

      return pathname
    },
  },
}

export const Page = defineDocumentType(() => ({
  name: "Page",
  filePathPattern: `pages/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
  },
  computedFields,
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Page],
})
