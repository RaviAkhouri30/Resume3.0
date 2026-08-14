# Visual UX Review — 2026-08-14

## Scope

This review evaluates the rendered résumé page at desktop (1440px wide) and mobile (390px wide) viewports. It is based on Chrome headless screenshots after the application data loaded. No application code or styles were changed.

## Overall verdict

The page has a strong, intentional dark portfolio aesthetic and makes a good first impression on desktop. The orange, black, and warm-brown palette feels cohesive and professional for a developer portfolio; the photograph, large introduction, and clear orange headings establish a compelling visual identity.

Desktop presentation is **good**. Mobile presentation needs priority attention: multiple lines and sections are visibly clipped horizontally instead of reflowing, making key content difficult or impossible to read without horizontal scrolling.

| Area | Desktop | Mobile | Assessment |
| --- | --- | --- | --- |
| Visual identity | Strong | Strong | Cohesive, memorable palette and imagery. |
| Colour and contrast | Good | Good | Readable light text on dark surfaces; orange is an effective accent. |
| Typography | Good | Needs improvement | Clear hierarchy, but the body text is compact and the intended font is not reliably loaded. |
| Readability | Good | Poor in places | Long experience content is scan-friendly on desktop but clipped on mobile. |
| Layout and responsiveness | Good | Poor | Desktop composition is balanced; mobile has horizontal overflow/cropping. |
| Professional appeal | Good | Moderate | Strong first impression, undermined by mobile fit-and-finish. |

## What works well

### Colour and visual identity

- The black-to-brown gradient background gives the site depth without competing with the résumé content.
- Orange is used consistently for the name, key headings, timeline details, photo ring, icons, and calls to action. This creates a clear brand accent rather than a collection of unrelated colours.
- Light cream text (`#E1DCC9`) reads comfortably on the darkest background areas and avoids the harshness of pure white.
- The portrait, circular frame, and oversized chevrons create an immediately recognizable hero section. The composition feels personal rather than like a generic template.

### Hierarchy and sectioning

- The desktop hero quickly answers the essential questions: who the person is, role, and résumé download action.
- Orange headings make the transition between About Me, Work Experience, Projects, and other sections easy to scan.
- The chronological timeline is effective on desktop: employment period, employer, then responsibilities follow a predictable reading pattern.
- The skill strip provides a quick technology overview before the more detailed content.

### Interaction cues

- The résumé button has a clear outline, contrast, and a visible hover treatment.
- Navigation is visible and unobtrusive on desktop.
- The sticky header helps users retain orientation while moving through a long one-page résumé.

## Findings and recommendations

### 1. Mobile content is horizontally clipped — critical

**Observed at 390px:**

- The hero title is truncated (`Senior Angular Develop...`).
- Skill labels run beyond the viewport rather than wrapping fully.
- Award titles, About Me text, statistics, company names, and responsibility lists are cut off at the right edge.
- The experience timeline’s text column begins well to the right, leaving too little usable width.

This is the most important visual issue because a visitor cannot reliably read the résumé on a phone. The screenshots show a desktop-width content layout being viewed through a narrow viewport, rather than a fully reflowed mobile layout.

**Recommendation:** Audit fixed dimensions, horizontal padding, non-wrapping flex containers, and timeline offsets at widths below 768px and 500px. Ensure every text container has `max-width: 100%`, can wrap, and does not require horizontal page scrolling. Rework the mobile timeline into a single-column layout with a smaller marker/line offset.

### 2. The mobile header loses navigation — high

At the existing small-screen breakpoint, `.header ul` is hidden. The page therefore has no visible section navigation on mobile, and no replacement menu is provided.

**Recommendation:** Replace the hidden list with an accessible menu button/drawer, or retain a compact horizontally scrollable navigation bar. The visitor should be able to jump between the long résumé sections.

### 3. Experience content is too dense — medium

The desktop timeline contains long bullet lists with small text and long line lengths. The visual hierarchy between company name, period, and responsibilities is present, but the responsibilities feel like a wall of detail in lower sections.

**Recommendation:** Keep the first 3–4 outcome-oriented bullets visible, collapse or progressively disclose remaining detail, and constrain line length with a readable content max-width. Add a little more vertical space between companies and bullets.

### 4. Typography depends on an unavailable font — medium

`src/styles.css` lists `Inter` after Arial/Helvetica, but the project does not include or import the Inter font. The rendered font can therefore vary by device, weakening visual consistency.

**Recommendation:** Either self-host/import an approved font with suitable loading behavior, or deliberately use a system font stack such as `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Keep the current larger heading scale but increase body line-height slightly for long résumé text.

### 5. The hero illustration is visually strong but oversized on mobile — medium

The portrait remains attractive on mobile, but the fixed circular presentation and chevron decoration consume a large amount of vertical space before the visitor reaches career content. The right chevron is not visible in the narrow screenshot.

**Recommendation:** Reduce the portrait/frame size and simplify or hide purely decorative chevrons at small widths. Preserve the photo and identity, but prioritize the role, résumé CTA, and first content section.

### 6. Stats need clearer grouping on mobile — low

The numbers are prominent, but their `+` symbols and labels separate awkwardly when the viewport is narrow. The third metric is not visible in the captured mobile portion.

**Recommendation:** Stack the metrics or use a two-column/one-column responsive grid. Keep each number, qualifier, and label together as one card/group.

### 7. Some decorative effects could be more restrained — low

The strong orange glow around the résumé CTA and the large photo ring create energy, but they can look heavy against the already dark gradient. The dark background also varies substantially from section to section.

**Recommendation:** Slightly reduce glow blur/opacity and use a small set of reusable surface/background tokens. This would retain the warm, high-contrast identity while improving perceived polish.

### 8. Interaction accessibility should match the visual polish — low

Some clickable social/copy elements are represented by non-semantic containers. They look interactive via cursor/hover styles but do not naturally support keyboard navigation or accessible names.

**Recommendation:** Use semantic buttons for actions and anchors for destinations, with visible focus styles. This improves keyboard usability without changing the visual direction.

## Colour, font, and readability assessment

### Colour

The palette is appropriate for a senior developer portfolio: black establishes seriousness, brown adds warmth, and orange communicates energy and emphasis. The use of the cream text rather than stark white is a good choice. Maintain this palette, but use the orange sparingly enough that headings and primary actions remain the strongest signals.

### Font and type scale

The desktop heading scale is effective and the role title is highly visible. Body copy appears around a compact résumé size; it is readable on desktop but is near the lower comfortable limit for long content. The more important issue is responsive line wrapping, not the base font size alone.

The intended `Inter` typeface should be supplied explicitly if it is part of the design. Otherwise, select and document a system stack so the page feels consistent across Windows, macOS, Linux, Android, and iOS.

### Readability

The desktop page is readable because headings, section spacing, and contrast guide the eye. The timeline layout supports chronological scanning. Mobile readability is currently compromised by clipping, long unbroken horizontal layouts, and the absent navigation. Fixing responsive overflow should precede any aesthetic refinements.

## Priority order

1. Eliminate all horizontal overflow/cropping at mobile widths; test at 320px, 375px, 390px, and 768px.
2. Provide a mobile replacement for the hidden navigation.
3. Reflow the experience timeline and statistics for a single-column phone layout.
4. Define a reliably delivered font stack and tune body text spacing.
5. Reduce hero decoration/glow on smaller screens and refine long-content density.
6. Improve semantic controls and keyboard focus treatment.

## Final judgement

The visual direction is appealing and suitable for a personal résumé site. On desktop, it feels polished, confident, and distinct. On mobile, the same design currently loses usability because the content does not fit the viewport. A responsive-layout pass—not a redesign—is the key next step: the palette, hero concept, and content hierarchy are worth retaining.
