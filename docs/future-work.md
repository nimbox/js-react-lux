# Future work

Known issues and improvements we've decided to defer, so we don't lose track of
them. Each entry: **what**, **why it matters**, **how** to approach it, and the
**risk**. Not a backlog of features — this is the list of things we already know
are wrong or want to improve.

---

## Field component (`src/components/inputs/Field.tsx`)

`Field` is the floating-label container behind every input, extended by
`Input`, `TextArea`, `NativeSelect`, `InputPopper`, and `FieldPopper`. High
blast radius — change carefully, verify against the stories.

### F1. Accessibility: the label is not associated with the control
- **What:** the `label` prop renders a purely visual `.lux-field-label`
  (`pointer-events: none`). There is no `htmlFor`/`id`/`aria-labelledby` wiring,
  so a screen reader gets no accessible name from it.
- **Why:** every input in the app is effectively unlabeled unless the consumer
  passes `aria-label` separately. `placeholder` is not a reliable name.
- **How:** generate an `id`, put it on the label as `htmlFor`, and have `Field`
  inject `id`/`aria-labelledby` onto its single child (or expose an `inputId`
  prop).
- **Risk:** low/medium; mostly non-visual. Deferred — not tackling a11y now.

### F2. `<fieldset>/<legend>` is used only to draw the outlined border notch
- **What:** the outlined variant wraps the border in `<fieldset><legend>` purely
  to cut the label gap in the top border (`Field.tsx` outlined branch;
  `control.css` `.lux-field-outlined … legend`). This is actually the robust,
  industry-standard technique (MUI does the same), so it is NOT a rendering bug.
- **Why it's on the list:** `<fieldset>` carries "group" semantics for AT and the
  label text lives in the DOM twice (visible label + hidden legend). This is an
  **a11y/semantic** concern, not a visual one.
- **How:** a `<div>` + label-`background`-cover notch removes the fieldset, but it
  couples the notch to the field's backdrop color and needs z-order/stacking work
  and visual iteration. Only worth doing alongside F1.
- **Risk:** medium; visual regression risk — do it behind a per-variant story.

### F3. Reconcile the `plain` / `editable` variants
- **What:** `FieldVariant` declares `'plain'` but it emits no class/border and the
  label-shrink CSS is variant-scoped, so a `plain` field's floating label never
  moves. Meanwhile `.lux-field-editable` exists in CSS but no variant emits it —
  `EditableText.tsx:90` hand-writes the classes instead of using `<Field>`.
- **Why:** the type lies in both directions (declared-but-unwired `plain`,
  wired-but-undeclared `editable`), and `EditableText` duplicates Field's markup.
- **How:**
  1. Add `'editable'` to `FieldVariant`; emit `lux-field-editable` and include
     `editable` in the bottom-border-`<div>` branch; route `EditableText` through
     `<Field variant="editable">`.
  2. Decide `plain`: either document that it has no floating label, or drop it
     from the union until designed (grep shows nothing passes `variant="plain"`).
  3. Add one story per variant (outlined/filled/inlined/editable) with label +
     start/end, shrunk and not, as a regression guard.
- **Risk:** low/medium; contained.

### F4. `shrink` must be hand-synced by every consumer (the main annoyance)
- **What:** each wrapper repeats `shrink={shrink || placeholder != null ||
  value.length > 0}` (`Input.tsx:117`, and the same in `TextArea`/`NativeSelect`).
  Because `Field` is presentational it makes the consumer compute "has value".
- **How (preferred):** move it to CSS with the `:placeholder-shown` trick —
  ensure the inner input always has a placeholder (even `" "`), then drive the
  shrink rules from `.lux-field:has(.lux-field-content
  :is(input,textarea,select):not(:placeholder-shown))`. Keep the `shrink` prop as
  an explicit override for cases CSS can't see (poppers/`Choose`/`SwatchPicker`,
  where the "value" is a rendered display, not a real input). This turns `shrink`
  from mandatory-and-error-prone into an optional escape hatch.
- **How (interim, low-risk):** extract the formula into one shared helper
  (`fieldShrink(shrink, placeholder, value)`) and call it in the three wrappers,
  removing the copy-paste drift without changing behavior.
- **Risk:** CSS route is medium (verify all variants still float correctly);
  helper route is trivial.

### F5. `withFullWidth` / `withFullHeight` only half-work
- **What:** the props add `w-full`/`h-full` to the container, but the docblock
  tells consumers they must ALSO add `w-full`/`h-full` to the child. Our own
  inputs already are `block w-full`, so it mostly bites custom children.
- **How:** make the prop self-contained with one CSS rule instead of a doc caveat
  — `.lux-field.w-full .lux-field-content > * { width: 100% }` (and the `h-full`
  analogue) — then delete the "also add w-full" note.
- **Risk:** low.

### F6. Wrapper boilerplate / "God component"
- **What:** the 12-prop `Field` is fine as one shared base, but `Input`/
  `TextArea`/`NativeSelect` each manually destructure and re-pass the same ~11
  field props — the part that drifts over time.
- **How:** define the field-prop key set once and split field-vs-input props with
  a tiny `pickFieldProps` helper, so wrappers spread `{...pickFieldProps(rest)}`
  instead of re-listing every prop. Don't pursue compound components
  (`<Field><Field.Input/></Field>`) — more churn than it's worth given current
  usage.
- **Risk:** low.

---

## List component (`src/components/list/List.tsx`)

### L1. Hover is JS-driven (delegated `mousemove`), not CSS `:hover`
- **What:** the row highlight is a single active row driven by `activeId`. Hover
  feeds that same state via a delegated `mousemove` on the container, so there is
  no Tailwind `hover:` class — hover and keyboard share one highlight.
- **Why it's noted:** the user isn't fully happy with a JS-driven hover vs a pure
  CSS `:hover` (a hair of latency, less "native" feel). It's fully encapsulated in
  `List`, so it can be revisited without touching consumers.
- **Constraint:** a plain CSS `hover:` cannot replace it, because it would light a
  second row independent of the keyboard-active one (the double-highlight we
  removed from Menu). Any alternative must still converge hover + keyboard onto a
  single active row.
- **Risk:** low; isolated to `List.Item`/`List`.

### L2. No "selected value" state for single-select choosers (only "active")
- **What:** `List` tracks one **active** row (the navigation cursor / Enter+hover
  target). It has no separate **selected** concept — the row that IS the chooser's
  current value. So opening a `Select` with a value doesn't mark that value in the
  list. This matches the pre-refactor behaviour (the old `selected` prop was the
  cursor, now `List.active`), so nothing regressed — deferred by decision.
- **Why it'd matter later:** showing the current choice on open is common,
  expected UX for single-select (`Select`/`Choose`). Less so for `Autocomplete`
  (free text); irrelevant for `Menu`.
- **How:** additive, keeping `List` generic — `List.Item` gains `selected?:
  boolean` (distinct indicator, e.g. `aria-selected` + a checkmark/style, separate
  from the active highlight); `ChooseOptionList` marks the current option via a
  small `isSelected?: (option) => boolean` predicate; `Choose` passes its
  `chosenOption` down. Optional extra: initialize the active cursor onto the
  selected row when opening.
- **Risk:** low; purely additive.
