import { buildRewritePrompt } from "../../llm/rewritePrompt.js";
import { rewriteWithLLM } from "../../llm/llmClient.js";

function cleanLLMOutput(text) {
  return text
    .replace(/^.*?##/s, "##")          // remove preamble
    .replace(/\n---[\s\S]*$/, "")      // remove trailing notes
    .trim();
}

export async function rewriteArticle(originalArticle, competitorContents) {
  const prompt = buildRewritePrompt(
    originalArticle,
    competitorContents
  );

  const rawOutput = await rewriteWithLLM(prompt);
  const cleanedOutput = cleanLLMOutput(rawOutput);

  return {
    originalArticleId: originalArticle._id,
    rewrittenContent: cleanedOutput,   
    rewrittenAt: new Date(),
  };
}
