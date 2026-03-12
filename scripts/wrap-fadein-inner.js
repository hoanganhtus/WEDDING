import fs from 'fs';

const path = 'src/App.tsx';
let code = fs.readFileSync(path, 'utf8');

// Step 1: Remove all existing <FadeIn> wrappers from sections to start clean
// (This regex aims to catch cases like <FadeIn>\n  <section... atau <FadeIn><section...)
code = code.replace(/<FadeIn>\s*(<section[\s\S]*?<\/section>)\s*<\/FadeIn>/g, '$1');
code = code.replace(/<FadeIn>\s*(<WishesSection[\s\S]*?\/>)\s*<\/FadeIn>/g, '$1');

// Step 2: Now target inner elements. 
// For typical sections, they often have a top-level div child inside the section.
// We'll wrap all direct children of <section> tags with <FadeIn>
// Using a simple regex to wrap everything inside <section> entries.
// However, since some sections have multiple direct children, wrapping the content of sections is better.

code = code.replace(/(<section[^>]*>)([\s\S]*?)(<\/section>)/g, (match, opening, content, closing) => {
  // If the content is already wrapped or too simple, we might skip, but let's wrap it all for consistency
  // Actually, wrapping EACH child might be even better for a staggered look, but the user asked for children.
  // We'll wrap the immediate children of sections.
  return `${opening}\n  <FadeIn>\n    ${content.trim()}\n  </FadeIn>\n${closing}`;
});

// Also handle the WishesSection which is a standalone component
code = code.replace(/(<WishesSection[\s\S]*?\/>)/g, '<FadeIn>\n  $1\n</FadeIn>');

fs.writeFileSync(path, code);
