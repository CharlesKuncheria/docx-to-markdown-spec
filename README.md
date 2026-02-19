# docx-to-markdown-spec

A [Claude Code](https://claude.ai/claude-code) plugin that converts `.docx` feature specification documents into structured markdown product specs.

Unlike generic file converters, this plugin doesn't just convert formats — it restructures your document into a **well-organized product specification** ready for engineering handoff.

## What it generates

By default, the plugin generates these sections:

| Section | Description |
|---------|-------------|
| Executive Summary | Brief overview (2-3 sentences) |
| Problem Statement | What problem, why important, who is affected |
| User Stories | "As a [user], I want [goal] so that [benefit]" |
| Functional Requirements | Numbered (FR-1, FR-2) with priority levels |
| Design Reference | Figma links, design decisions, responsive behavior |
| User Experience Flow | Step-by-step journey, interactions, error states |
| Acceptance Criteria | Given/When/Then format (Playwright-ready) |
| Success Metrics | KPIs, user engagement, business metrics |
| Scope | What we are explicitly NOT doing |
| Dependencies & Constraints | Existing features, teams, timeline |
| Open Questions | Unresolved items needing clarification |

You can override these sections by providing a **template file** (see [Custom Templates](#custom-templates) below).

## Installation

### Using `--plugin-dir` (for testing)

```bash
claude --plugin-dir /path/to/docx-to-markdown-spec/
```

### From GitHub

```bash
claude plugin install docx-to-markdown-spec@CharlesKuncheria/docx-to-markdown-spec
```

## Usage

In Claude Code, invoke the skill:

```
/docx-to-markdown-spec
```

Then provide the path to your `.docx` file. The plugin will:

1. Extract content from the `.docx` using mammoth (docx → HTML) and turndown (HTML → Markdown)
2. Restructure it into a formatted product specification
3. Save the `.md` file in the same directory as the source

## Custom Templates

You can optionally provide a **template file** (`.md`) to define your own output structure instead of the default sections.

```
/docx-to-markdown-spec
```

When prompted, provide both:
- The path to your `.docx` file
- The path to your template `.md` file

The template should be a markdown file with the headings and structure you want in the output. The plugin will use your template's sections, heading hierarchy, and formatting as the blueprint, and populate each section using the content extracted from the `.docx`.

### Example template

```markdown
# Project Name

## Overview
<!-- Brief summary of the project -->

## Requirements
<!-- Numbered list of requirements -->

## Timeline
<!-- Key milestones and dates -->

## Risks
<!-- Known risks and mitigations -->
```

If no template is provided, the plugin falls back to the [default sections](#what-it-generates).

## Dependencies

Dependencies are auto-installed on first run — no manual setup needed.

- [mammoth](https://www.npmjs.com/package/mammoth) — .docx to HTML conversion
- [turndown](https://www.npmjs.com/package/turndown) — HTML to Markdown conversion

## License

MIT
