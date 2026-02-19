# Convert .docx Feature Spec to Markdown

Converts a `.docx` feature specification document into a structured markdown product spec.

## Usage

Invoke this skill when the user asks to convert a `.docx` file to a feature spec, or says things like "convert this spec", "generate spec from docx", "docx to markdown spec".

The user will provide a path to a `.docx` file.

## Steps

### Step 1: Extract text from the .docx file

Run the extraction script to get the document content as markdown:

```bash
node <plugin-base-dir>/skills/docx-to-markdown-spec/extract.js "<path-to-docx>"
```

The script auto-installs its dependencies (mammoth, turndown) on first run. Capture the output — this is the raw document content.

### Step 2: Convert to structured spec

Using the extracted content, generate a structured product specification with these sections:

1. **Executive Summary** — Brief overview (2-3 sentences)
2. **Problem Statement** — What problem, why important, who is affected
3. **User Stories** — Format: "As a [user type], I want [goal] so that [benefit]" (3-5 stories)
4. **Functional Requirements** — Numbered (FR-1, FR-2), with priority (Must-have, Should-have, Nice-to-have)
5. **Design Reference** — Figma links, design decisions, responsive behavior
6. **User Experience Flow** — Step-by-step journey, interactions, error states, accessibility
7. **Acceptance Criteria** — Format: "Given [context], When [action], Then [expected result]" (suitable for Playwright automation, include happy path and error scenarios)
8. **Success Metrics** — KPIs, user engagement, business metrics
9. **Scope** — What we are explicitly NOT doing
10. **Dependencies & Constraints** — Existing features, teams, reusable components, timeline
11. **Open Questions** — Unresolved items needing clarification

### Guidelines for writing the spec

- Be specific and actionable
- Use clear, concise language
- Avoid jargon unless necessary
- Include examples where helpful
- Flag assumptions clearly
- Focus on user outcomes, not technical implementation
- Use proper markdown formatting (headers, lists, tables)
- Include a table of contents if the spec is long
- Use tables for comparing options or listing requirements
- Use bold for emphasis on key points

### Step 3: Save the output

Save the generated markdown file in the **same directory** as the source `.docx` file, with the same filename but a `.md` extension.

For example: `/path/to/Feature-Spec.docx` → `/path/to/Feature-Spec.md`

After saving, tell the user the output path.
