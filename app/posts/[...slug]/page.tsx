import type { Metadata } from "next"

import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

type PostParams = {
  slug: string[]
}

interface PostProps {
  params: PostParams
}

function getPostFromParams(params: PostParams) {
  if (!params?.slug?.length) {
    notFound()
  }

  const slug = params.slug.join("/")
  const post = allPosts.find((candidate) => candidate.slugAsParams === slug)

  if (!post) {
    notFound()
  }

  return post
}

export function generateMetadata({ params }: PostProps): Metadata {
  const post = getPostFromParams(params)

  return {
    title: post.title,
    description: post.description,
  }
}

export function generateStaticParams(): PostParams[] {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default function PostPage({ params }: PostProps) {
  const post = getPostFromParams(params)

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1 className="mb-2">{post.title}</h1>
      {post.description && (
        <p className="text-xl mt-0 text-slate-700 dark:text-slate-200">
          {post.description}
        </p>
      )}
      <hr className="my-4" />
      <Mdx code={post.body.code} />
    </article>
  )
}
