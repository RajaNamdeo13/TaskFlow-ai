export function buildBlueprintPrompt(idea: string): string {
  return `You are a Senior Staff Software Engineer planning a production SaaS application.

Software idea:
"${idea}"

Generate a complete implementation blueprint as strict JSON. Make every section specific to the idea.

Include:
- Software architecture
- Folder structure
- Tech stack recommendation
- Database schema
- API endpoints
- Authentication strategy
- Development roadmap
- Sprint plan
- Task breakdown
- README documentation
- Future enhancements

Quality bar:
- Specific, realistic engineering choices
- Clear separation of frontend, backend, data, auth, AI, and deployment concerns
- No generic filler
- No markdown fences
- Valid JSON only`;
}
