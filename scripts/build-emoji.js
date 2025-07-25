import fs from 'fs';

// Read the JSON file
const jsonPath = './node_modules/unicode-emoji-json/data-by-group.json';
const groups = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Create simple groups with just emoji characters
const simpleGroups = groups.map(group => ({
  name: group.name,
  emojis: group.emojis.map(emoji => emoji.emoji)
}));

// Generate TypeScript content
const tsContent = `// Auto-generated emoji data
// Generated on: ${new Date().toISOString()}

export interface EmojiGroup {
  name: string;
  emojis: string[];
}

export const emojiGroups: EmojiGroup[] = ${JSON.stringify(simpleGroups, null, 2)};
`;

// Write to TypeScript file
const outputPath = './src/components/pickers/emojis.ts';
fs.writeFileSync(outputPath, tsContent, 'utf8');

console.log(`✅ Emoji data written to: ${outputPath}`);
console.log(`📊 Total groups: ${simpleGroups.length}`);
console.log(`😀 Total emojis: ${simpleGroups.reduce((total, group) => total + group.emojis.length, 0)}`);

