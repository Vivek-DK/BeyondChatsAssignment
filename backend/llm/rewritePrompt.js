export function buildRewritePrompt(originalArticle, competitorContents) {
  return `
You are a professional technical content writer.

TASK:
Rewrite the following article using the competitor content as reference.
The final article must be original, well-structured, and SEO-friendly.

RULES:
- Do NOT copy sentences from competitor articles
- Do NOT mention competitors
- Improve clarity and depth
- Keep a professional blog tone
- Output in Markdown

STRUCTURE:
1. Title
2. Introduction
3. What is it
4. Why it matters
5. How it works
6. Applications
7. Conclusion

ORIGINAL ARTICLE:
Title: ${originalArticle.title}
Content:
${originalArticle.content}

COMPETITOR REFERENCES:
${competitorContents.join("\n\n---\n\n")}
`;
}
