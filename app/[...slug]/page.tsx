import type { Metadata } from "next"

import { notFound } from "next/navigation"
import { allPages } from "contentlayer/generated"

import { Mdx } from "@/components/mdx-components"

type PageParams = {
  slug: string[]
}

interface PageProps {
  params: PageParams
}

function getPageFromParams(params: PageParams) {
  if (!params?.slug?.length) {
    notFound()
  }

  const slug = params.slug.join("/")
  const page = allPages.find((candidate) => candidate.slugAsParams === slug)

  if (!page) {
    notFound()
  }

  return page
}

export function generateMetadata({ params }: PageProps): Metadata {
  const page = getPageFromParams(params)

  return {
    title: page.title,
    description: page.description,
  }
}

export function generateStaticParams(): PageParams[] {
  return allPages.map((page) => ({
    slug: page.slugAsParams.split("/"),
  }))
}

export default function PagePage({ params }: PageProps) {
  const page = getPageFromParams(params)

  return (
    <article className="py-6 prose dark:prose-invert">
      <h1>{page.title}</h1>
      {page.description && <p className="text-xl">{page.description}</p>}
      <hr />
      <Mdx code={page.body.code} />
    </article>
  )
}
