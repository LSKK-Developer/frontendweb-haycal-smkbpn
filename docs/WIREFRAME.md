# SkillUp — Wireframe awal

Dokumen ini menggambarkan struktur dan prioritas komponen pada versi frontend medium. Wireframe bersifat low-fidelity; ukuran, warna, dan detail visual final dapat disesuaikan saat implementasi UI.

## 1. Login demo

```text
┌──────────────────────────────┬─────────────────────────────────┐
│ BRAND / VALUE PROPOSITION    │ SkillUp                          │
│                              │ Welcome to SkillUp               │
│ Make progress.               │ Display name                     │
│ One skill at a time.         │ [____________________________]   │
│                              │ [ Continue with demo account ]   │
│ ✓ Clear learning paths       │                                  │
│ ✓ Progress that feels real   │ Demo environment / Local Storage│
└──────────────────────────────┴─────────────────────────────────┘
```

## 2. App shell / dashboard

```text
┌───────────────┬────────────────────────────────────────────────┐
│ SkillUp       │ Overview                         [Theme] [User] │
│               ├────────────────────────────────────────────────┤
│ Overview      │ Greeting + primary Continue Learning CTA       │
│ Explore       │                                                │
│ My learning   │ [Enrolled] [Milestones] [Streak] [Paths done]   │
│ My notes      │                                                │
│ Achievements  │ [Continue learning cards] [Overall progress]   │
│ Profile       │                                                │
│               │ [Recommended skills / discovery]                │
│ Learning tip  │                                                │
└───────────────┴────────────────────────────────────────────────┘
```

## 3. Explore skills

```text
┌────────────────────────────────────────────────────────────────┐
│ Find your next skill                         [+ Create custom] │
│ [Search skills..............................................]  │
│ [All] [Technology] [Design] [Data] [Language] [Business]      │
│                                                                │
│ [Skill card]             [Skill card]          [Skill card]    │
│ icon / title             icon / title          icon / title    │
│ description              description           description     │
│ level / duration         level / duration      level / duration│
└────────────────────────────────────────────────────────────────┘
```

Custom-skill modal fields: name, category, difficulty, description, and milestone titles (one per line). Form validation is client-side.

## 4. Skill detail / roadmap

```text
┌────────────────────────────────────────────────────────────────┐
│ ← Back                                                         │
│ Skill category                                                 │
│ Skill title + description + level + estimated duration         │
│ Progress bar / completed milestone count       [Continue/Add]  │
├────────────────────────────────────────────────────────────────┤
│ Learning roadmap                                               │
│ [01] Milestone title                  duration       [○ / ✓]   │
│ [02] Milestone title                  duration       [○ / ✓]   │
│ [03] Milestone title                  duration       [○ / ✓]   │
└────────────────────────────────────────────────────────────────┘
```

## 5. My learning

Search and status filter (All, In progress, Not started, Completed), followed by enrolled skill cards with progress indicators.

## 6. Notes

Search bar, create-note action, editable note cards. Note editor fields: title, related skill (optional), and content.

## 7. Achievements

Badge summary and achievement cards with earned/locked states. Streak badge is illustrative until daily activity tracking exists.

## 8. Profile and preferences

Demo profile display name and light/dark theme preference.

## Navigation behavior

- Desktop: fixed left sidebar, top header, content canvas.
- Mobile: compact header and bottom navigation.
- Routing: React Router with HashRouter, so routes work on static hosting without server rewrite configuration.
