#!/usr/bin/env node

import mediumToMarkdown from 'medium-to-markdown';
import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BLOG_DIR = path.join(__dirname, '..', 'src', 'content', 'blog');

function askQuestion(rl, question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer.trim());
    });
  });
}

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getTodayISO() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

async function main() {
  const mediumUrl = process.argv[2];

  if (!mediumUrl) {
    console.error('❌ Usage: node scripts/import-post.mjs <medium-post-url>');
    console.error('   Example: node scripts/import-post.mjs https://medium.com/@username/my-post-abc123');
    process.exit(1);
  }

  console.log(`\n📥 Fetching post from: ${mediumUrl}\n`);

  let markdown;
  try {
    markdown = await mediumToMarkdown.convertFromUrl(mediumUrl);
  } catch (error) {
    console.error('❌ Failed to fetch or convert the Medium post.');
    console.error('   Make sure the URL is a valid, public Medium post.');
    console.error(`   Error: ${error.message}`);
    process.exit(1);
  }

  if (typeof markdown !== 'string' || !markdown.trim()) {
    console.error('❌ Medium returned no article content. No draft was created.');
    console.error('   Medium may be blocking automated requests. Copy the article manually or use its public RSS feed.');
    process.exit(1);
  }

  // Extract title from the first heading in the markdown
  const titleMatch = markdown.match(/^#\s+(.+)$/m);
  let title = titleMatch ? titleMatch[1].trim() : '';

  // If no heading found, try to extract from URL slug
  if (!title) {
    const urlSlug = mediumUrl.split('/').pop().split('-').slice(0, -1).join(' ');
    title = urlSlug.charAt(0).toUpperCase() + urlSlug.slice(1);
  }

  const slug = slugify(title);
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!slug) {
    console.error('❌ Could not determine a filename from the article title.');
    process.exit(1);
  }

  if (fs.existsSync(filePath)) {
    console.error(`❌ Draft already exists: src/content/blog/${slug}.mdx`);
    console.error('   Edit the existing file or move it before importing again.');
    process.exit(1);
  }

  console.log(`📝 Title: ${title}`);
  console.log(`🔗 Slug: ${slug}\n`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const description = await askQuestion(rl, '📄 Description: ');
  const tagsInput = await askQuestion(rl, '🏷️  Tags (comma-separated): ');
  rl.close();

  const tags = tagsInput
    .split(',')
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `date: "${getTodayISO()}"`,
    `tags: ${JSON.stringify(tags)}`,
    `published: false`,
    `mediumUrl: ${JSON.stringify(mediumUrl)}`,
    '---',
    '',
  ].join('\n');

  // Remove the title heading from the content if it exists (since we have it in frontmatter)
  let content = markdown;
  if (titleMatch) {
    content = content.replace(/^#\s+.+\n*/m, '');
  }

  const fileContent = frontmatter + content;

  // Ensure directory exists
  if (!fs.existsSync(BLOG_DIR)) {
    fs.mkdirSync(BLOG_DIR, { recursive: true });
  }

  fs.writeFileSync(filePath, fileContent, { encoding: 'utf-8', flag: 'wx' });

  console.log(`\n✅ Post saved to src/content/blog/${slug}.mdx — review and set published: true when ready.`);
}

main();
