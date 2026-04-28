import { IntentType, IntentExtractedData } from '../types';

export interface IntentResult {
  type: IntentType;
  confidence: number;
  extractedData?: IntentExtractedData;
}

export function classifyIntent(text: string): IntentResult {
  const lowerText = text.toLowerCase();
  
  // Check for action items
  const actionScore = checkActionItem(lowerText);
  if (actionScore.confidence > 0.7) {
    return actionScore;
  }
  
  // Check for decisions
  const decisionScore = checkDecision(lowerText);
  if (decisionScore.confidence > 0.7) {
    return decisionScore;
  }
  
  // Check for questions
  const questionScore = checkQuestion(lowerText);
  if (questionScore.confidence > 0.7) {
    return questionScore;
  }
  
  // Check for references
  const referenceScore = checkReference(lowerText);
  if (referenceScore.confidence > 0.5) {
    return referenceScore;
  }
  
  // Default to reference if nothing else matches
  return { type: 'reference', confidence: 0.3 };
}

function checkActionItem(text: string): IntentResult {
  const actionPatterns = [
    /\b(need to|should|must|have to|got to)\b/gi,
    /\b(create|build|fix|implement|design|develop|write|test|deploy|review)\b/gi,
    /\b(assign to|assigned to|by \w+day|by \w+date|deadline|due)\b/gi,
    /\b(action item|todo|to-do|task)\b/gi
  ];
  
  let score = 0;
  let extractedData: IntentExtractedData = {};
  
  actionPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      score += matches.length * 0.3;
    }
  });
  
  // Extract assignee
  const assigneeMatch = text.match(/(?:assign(?:ed)? to)\s+(\w+)/i);
  if (assigneeMatch) {
    extractedData.assignee = assigneeMatch[1];
    score += 0.2;
  }
  
  // Extract deadline
  const deadlineMatch = text.match(/by\s+((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday|\w+day|\d+(?:st|nd|rd|th)?\s+\w+))/i);
  if (deadlineMatch) {
    extractedData.deadline = deadlineMatch[1];
    score += 0.2;
  }
  
  // Extract priority
  if (/\b(urgent|high priority|critical|asap)\b/i.test(text)) {
    extractedData.priority = 'high';
    score += 0.2;
  } else if (/\b(low priority|when possible|eventually)\b/i.test(text)) {
    extractedData.priority = 'low';
    score += 0.1;
  } else {
    extractedData.priority = 'medium';
  }
  
  return {
    type: 'action_item',
    confidence: Math.min(score, 1.0),
    extractedData
  };
}

function checkDecision(text: string): IntentResult {
  const decisionPatterns = [
    /\b(decided|agreed|finalized|chose|selected)\b/gi,
    /\b(we'll use|we will use|going with|stick with)\b/gi,
    /\b(conclusion|decision|resolution|verdict)\b/gi,
    /\b(approved|rejected|accepted|declined)\b/gi
  ];
  
  let score = 0;
  
  decisionPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      score += matches.length * 0.35;
    }
  });
  
  return {
    type: 'decision',
    confidence: Math.min(score, 1.0)
  };
}

function checkQuestion(text: string): IntentResult {
  const questionPatterns = [
    /\?/g,
    /\b(how|what|why|when|where|who|which)\b/gi,
    /\b(should we|can we|could we|would it|is it|are we)\b/gi,
    /\b(unclear|unknown|unsure|question)\b/gi
  ];
  
  let score = 0;
  
  questionPatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      score += matches.length * 0.3;
    }
  });
  
  return {
    type: 'question',
    confidence: Math.min(score, 1.0)
  };
}

function checkReference(text: string): IntentResult {
  const referencePatterns = [
    /https?:\/\/[^\s]+/g,
    /\b(see|reference|docs|documentation|according to|based on)\b/gi,
    /\b(link|url|resource|article|guide)\b/gi
  ];
  
  let score = 0;
  
  referencePatterns.forEach(pattern => {
    const matches = text.match(pattern);
    if (matches) {
      score += matches.length * 0.3;
    }
  });
  
  return {
    type: 'reference',
    confidence: Math.min(score, 1.0)
  };
}
