import fs from 'fs';

const path = 'src/App.tsx';
let code = fs.readFileSync(path, 'utf8');

if (!code.includes('import FadeIn')) {
  code = code.replace(
    'import { motion } from "framer-motion";',
    'import { motion } from "framer-motion";\nimport FadeIn from "./components/FadeIn";'
  );
}

code = code.replace(/(<section[\s\S]*?<\/section>)/g, '<FadeIn>\n  $1\n</FadeIn>');
code = code.replace(/(<WishesSection[\s\S]*?\/>)/g, '<FadeIn>\n  $1\n</FadeIn>');

fs.writeFileSync(path, code);
