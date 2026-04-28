/**
 * Simulates AI decomposition of a complex task into micro-goals.
 * In a real app, this would call an LLM API.
 */
export const decomposeTask = async (taskDescription) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  const templates = {
    "report": [
      "Define scope and structure of the report",
      "Identify 3-5 primary academic sources",
      "Draft executive summary and introduction",
      "Develop core arguments with evidence",
      "Proofread for clarity and formatting"
    ],
    "math": [
      "Review core formulas and theorems",
      "Solve 3 practice problems of medium difficulty",
      "Draft the solution steps for the main problem",
      "Double-check calculations and edge cases",
      "Format final solution for submission"
    ],
    "essay": [
      "Finalize thesis statement",
      "Outline body paragraphs with key points",
      "Write first draft of body content",
      "Refine introduction and conclusion",
      "Perform final citation check"
    ]
  };

  // Determine category based on keywords
  const desc = taskDescription.toLowerCase();
  let subtasks = [];

  if (desc.includes("report") || desc.includes("paper")) {
    subtasks = templates.report;
  } else if (desc.includes("math") || desc.includes("calc") || desc.includes("problem")) {
    subtasks = templates.math;
  } else if (desc.includes("essay") || desc.includes("write")) {
    subtasks = templates.essay;
  } else {
    // Generic decomposition if no keyword matches
    subtasks = [
      `Break down "${taskDescription}" into core components`,
      "Research necessary resources and prerequisites",
      "Complete the most difficult 20% of the work",
      "Assemble and refine the remaining components",
      "Final review and polish"
    ];
  }

  return subtasks.map((text, index) => ({
    id: crypto.randomUUID(),
    text,
    completed: false,
    order: index
  }));
};
