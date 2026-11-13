# SkillUp — Product & Frontend Specification (v0.1)

## Product statement
SkillUp is a self-directed learning progress tracker. It helps a learner choose a skill, follow a structured roadmap, record notes, and see progress in one place.

## Decisions locked for this prototype
- Audience: everyone interested in learning a new skill.
- Appearance: light mode and dark mode.
- Complexity: medium.
- Authentication: demo login only; no real account or password validation.
- Skill catalog: bundled preset skills plus user-created skills.
- Persistence: browser Local Storage through Zustand persist.
- Project boundary: frontend only; no custom backend, database, payments, live chat, video hosting, or AI tutor.

## Primary user journey
1. Open the app and enter a display name in the demo login.
2. Review the dashboard and current learning progress.
3. Explore the preset skill catalog or create a custom learning path.
4. Open a skill detail page and enroll in a preset skill if needed.
5. Mark roadmap milestones complete; progress is recalculated automatically.
6. Create, edit, search, or delete learning notes.
7. Switch between light and dark mode; preferences persist locally.

## Functional requirements
| ID | Requirement | Acceptance criteria |
|---|---|---|
| FR-01 | Demo login | User can enter a display name and open the app without a backend. |
| FR-02 | Dashboard | Summary reflects enrolled skills and completed milestones. |
| FR-03 | Explore | Search and category filters narrow the skill catalog. |
| FR-04 | Custom skill | User can create a skill with category, level, description, and milestones. |
| FR-05 | Enrollment | User can add/remove a preset skill from My Learning. |
| FR-06 | Roadmap | Skill detail displays ordered milestones and durations. |
| FR-07 | Completion | Enrolled skill milestones can be marked complete/incomplete. |
| FR-08 | Progress | Progress percentage is recalculated from completed milestones. |
| FR-09 | Notes | User can create, edit, search, and delete notes. |
| FR-10 | Theme | Light/dark mode applies across the app and persists locally. |
| FR-11 | Profile | User can update the local demo display name. |

## Non-functional requirements
- Responsive layout for phone, tablet, and desktop.
- TypeScript for typed application data and components.
- Accessible labels for key inputs and icon-only controls.
- Empty states for filters or lists without results.
- No secret keys or credentials stored in the frontend.
- User-generated demo data remains in the current browser profile only.

## Frontend stack
React, TypeScript, Vite, TailwindCSS, Ant Design, React Router (HashRouter), Zustand, TanStack Query, React Hook Form, and Zod.

## Data model (initial)
- User: name, email (demo only).
- Skill: title, category, description, level, estimated weeks, enrollment status.
- Milestone: title, description, duration, completed state.
- LearningNote: title, content, optional related skill, update timestamp.

## Known prototype limitations
- Demo login is not authentication and must not be used for private data.
- Local Storage does not sync across browsers or devices.
- Learning streak is currently a display placeholder; reliable streak logic needs date-based activity records.
- Achievement badges are calculated from a subset of local progress and some remain illustrative.
- TanStack Query is used for the local catalog query in this starter; a real API can replace the query function later.
