import type { ComponentType } from "react"
import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

const components = {
  Image,
} satisfies Record<string, ComponentType<unknown>>

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return <Component components={components} />
}
