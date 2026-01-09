// lib/docs/extract-metadata.ts
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import { remarkPlugins } from "@prose-ui/core";

// lib/docs/extract-toc.ts
import slugify from "slugify";
import { toString } from "mdast-util-to-string";
var extractToc = (root) => {
  const sections = [];
  for (const node of root.children) {
    if (node.type === "heading") {
      const title = toString(node);
      const id = slugify(title, {
        lower: true,
        strict: true
      }).replaceAll(/(^\d)|[^a-zA-Z0-9-_]/g, "");
      sections.push({ id, title, depth: node.depth });
    }
  }
  return sections;
};

// lib/docs/extract-title.ts
import { toString as toString2 } from "mdast-util-to-string";
var extractTitle = (root) => {
  for (const node of root.children) {
    if (node.type === "heading" && node.depth === 1) {
      return toString2(node);
    }
  }
  return null;
};

// lib/docs/extract-metadata.ts
var extractMetadata = async (mdx) => {
  let processor = remark().use(remarkMdx);
  for (const plugin of remarkPlugins()) {
    processor = processor.use(plugin);
  }
  const ast = processor.parse({ value: mdx });
  return { toc: extractToc(ast), title: extractTitle(ast) };
};

// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { remarkPlugins as remarkPlugins2 } from "@prose-ui/core";
import { z } from "zod";
var pages = defineCollection({
  name: "pages",
  directory: "content/documentation",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string().optional(),
    content: z.string()
  }),
  transform: async (page, ctx) => {
    const { toc, title } = await extractMetadata(page.content);
    const content = await compileMDX(ctx, page, {
      remarkPlugins: remarkPlugins2()
    });
    let path;
    if (page._meta.path === "index") {
      path = "";
    } else if (page._meta.path.endsWith("/index")) {
      path = page._meta.path.slice(0, -6);
    } else {
      path = page._meta.path;
    }
    return {
      ...page,
      path: `/${path}`,
      toc,
      title: page.title ?? title,
      content
    };
  }
});
var allPages = pages;
var content_collections_default = defineConfig({
  collections: [pages]
});
export {
  allPages,
  content_collections_default as default
};
