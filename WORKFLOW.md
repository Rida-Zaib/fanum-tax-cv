# Workflow comparison: vague vs precise prompting

Feature: Profile Settings form (React, Vite). Round 2 used Cursor on the free plan. Round 1 used Claude.ai because my Cursor limit ran out.

## What I did
Round 1 (round-1-vague): one prompt, "Add a profile settings form to my React app.", accepted as is. About 5 minutes to a running form.
Round 2 (round-2-precise): plan mode with exact file paths, field rules, error messages, react-hook-form + zod, a CSS file, and a request to write and run Vitest tests.

## Correctness
Round 1 invented its own fields (display name, email, bio, time zone, a notification checkbox) and props (initialValues, onSave), so I had to supply both in App.jsx. The AI said it had not run the code. In the browser it rejected "a" as a name and "abc" as an email, so basic validation works, but there are no tests and none of my capstone fields.
Round 2's first output (4848bfc) ignored much of my spec: no degree field, a dropdown instead of radio buttons, four fields I never asked for (portfolio URL, target role, location, bio), no zod, react-hook-form or vitest, and no tests. After my fixes (1623c3a) validation lives in settingsSchema.js and 4/4 tests pass.

## Accessibility
Round 1 claims linked labels and announced errors, but in the browser the labels and checkbox text are almost invisible, dark text on a dark page, probably a clash with the scaffold's dark styles. Round 2 uses label htmlFor, role="alert", aria-describedby and a fieldset with a legend, and its tests find inputs by label.

## Edge cases
Round 1 handled "a" and "abc" but has no GitHub field, so "-abc-" cannot be tried. Round 2's schema rejects a leading or trailing hyphen with a regex; its tests cover an empty name, "a", "abc" and a valid submit, not the hyphen case.

## Review effort
Round 1: about 5 minutes, 3 files, 338 insertions, 119 deletions, no fixing by design. Round 2: I reviewed the first output (14 files), found the gaps above and finished the fixes in a later session after my Cursor limit ran out (14 files, 243 insertions, 285 deletions). Round 1 was much faster to a running form, but only Round 2 matched my spec with passing tests. Bringing Round 1 to that standard would mean rewriting most of it.

## One AI mistake I caught
Round 2's first output created ProfileSettingsForm.jsx instead of SettingsForm.jsx, added Layout.jsx, pages/SettingsPage.jsx and profileStorage.js that I never asked for, put styles in index.css, installed neither zod nor react-hook-form, and wrote no tests although I asked for them.

## Limitations
The rounds used different tools and slightly different scaffolds, so the gap comes from the prompt and the tool together.

## What I learned
Five rules went into CLAUDE.md: react-hook-form + zod with a schema file, label and aria rules, a test file per component, one stylesheet per component, and exact file paths plus git status to delete unrequested files.
