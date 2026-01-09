import slugify from 'slugify'
import { Root } from 'mdast'
import { toString } from 'mdast-util-to-string'

export type Section = {
  id: string
  title: string
  depth: number
}

export const extractToc = (root: Root): Section[] => {
  const sections: Section[] = []
  for (const node of root.children) {
    if (node.type === 'heading') {
      const title = toString(node)
      const id = slugify(title, {
        lower: true,
        strict: true,
      })
        // Remove leading digits and any remaining invalid ID characters
        // This ensures the ID is valid for HTML anchors (IDs cannot start with digits)
        .replaceAll(/(^\d)|[^a-zA-Z0-9-_]/g, '')
      sections.push({ id, title, depth: node.depth })
    }
  }
  return sections
}
