# Git bootstrap

Created: 2026-05-15

## Purpose

This record documents the initial Git setup for the Terra Classic Website project.

## Project state

- The project is in repository bootstrap / pre-implementation phase.
- No implementation roadmap file exists yet.
- The `- KNOWLEDGE` folder exists locally, but currently contains no project-owner materials relevant to this task.
- No validation scripts, test runner configs, or test files exist yet.

## Git model

- `dev` is the default local working branch for development.
- `main` is the stable publishing branch for future GitHub Pages use.
- No GitHub remote is configured during this bootstrap task.
- Do not push, publish, merge into `main`, or configure live deployment without an explicit owner request.

## Ignore policy

The following project-owner/operator inputs are intentionally kept out of Git:

- `AGENTS.md`
- `PROMPTS.md`
- `- PROMPTS.md`
- `- KNOWLEDGE/`

macOS `.DS_Store` metadata is also ignored.

## Validation

Because no application or test stack exists yet, validation for this task is Git-level:

- confirm Git is initialized;
- confirm both `dev` and `main` exist;
- confirm the working branch remains `dev`;
- confirm ignored paths are excluded by `.gitignore`;
- confirm committed baseline contains only intended public project files.
