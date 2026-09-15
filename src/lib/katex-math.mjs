import katex from 'katex';

/**
 * Render maths with KaTeX at build time.
 *
 * Sätteri parses maths but ships no renderer, so these two plugins hand each
 * expression to KaTeX and put its HTML back in the tree. There are two because
 * the two shapes need splicing at different stages:
 *
 *   display  `$$ ... $$` with its dollars on their own lines → a block `math` node
 *   inline   `$ ... $`                                       → `inlineMath` in a paragraph
 *
 * - `katexDisplay` runs in the mdast phase. A block splice is safe there, and it
 *   must happen that early: Astro wraps display maths in `<pre><code>` for the
 *   hast phase, and its Shiki plugin (registered ahead of every user hast plugin)
 *   would highlight that as plaintext before we ever saw it.
 * - `katexInline` runs in the hast phase. An mdast `{ raw }` is re-parsed as
 *   Markdown, and splicing inline HTML that way splits the surrounding paragraph
 *   in two; a hast `raw` node is inserted as-is.
 *
 * `mdxExpressions: false` keeps the braces in KaTeX's HTML literal, which MDX
 * would otherwise read as JSX expressions. `throwOnError: false` renders a bad
 * expression in red rather than failing the build, so a typo is visible without
 * blocking the deploy.
 *
 * Both are plain objects rather than imports from `satteri`: the plugin shape is
 * structural, so nothing needs to be a dependency here.
 */
export const katexDisplay = {
  name: 'katex-display',
  math: (node) => ({
    // Wrapped in a <div> so the re-parsed block starts with a block-level tag:
    // spliced bare, KaTeX's <span> would be read as inline HTML and wrapped in a
    // <p>, whose paragraph margins would stack on KaTeX's own.
    raw: `<div class="math-block">${katex.renderToString(node.value, {
      displayMode: true,
      throwOnError: false,
    })}</div>`,
    mdxExpressions: false,
  }),
};

export const katexInline = {
  name: 'katex-inline',
  element: {
    filter: ['code'],
    visit(node, ctx) {
      const classes = node.properties?.className;
      if (!Array.isArray(classes) || !classes.includes('math-inline')) return;

      return /** @type {import('satteri').HastNode} */ ({
        type: 'raw',
        value: katex.renderToString(ctx.textContent(node), {
          displayMode: false,
          throwOnError: false,
        }),
      });
    },
  },
};
