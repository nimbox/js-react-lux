# Conventions

Naming and style conventions for `js-react-lux`. Keep entries short and concrete.

## Boolean naming

Name a boolean prop or field by **what kind of value it is**:

- **Computed / derived predicate** — a value the code *computes* (from data, a measurement,
  or an external library). Prefix it with **`is`**.
- **Set modifier / option** — a flag a caller *passes* to configure rendering. Use a **bare
  adjective** (no prefix).

Rule of thumb: **is it derived, or is it set?** Derived → `isX`. Set to configure → bare.

| kind                         | style          | examples in the library                                                                                                                                                        |
| ---------------------------- | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| computed / derived predicate | `isX`          | `isWeekend`, `isToday` (from a date); `isCompact`, `isLargest` (from measurement); `isDragging`, `isOver` (drag-and-drop); `isFirst`, `isLast` (derived by `buildMessageRows`) |
| set modifier / option        | bare adjective | `disabled`, `rounded`, `centered`, `loading`, `inline`, `open`, `visible`, `selected`, `muted`, `pinned`, `highlighted`, `plain`; the `with*` and `can*` families              |

```tsx
// good — a derived predicate takes `is`; set modifiers stay bare
<MessageProvider isFirst isLast plain />   // isFirst/isLast are derived by buildMessageRows; plain is a set option
<Button rounded loading disabled />

// bad — a set modifier named as if it were a derived predicate
<Button isRounded isDisabled />            // these are options you pass, not computed → drop the `is`

// bad — a derived predicate named as a bare adjective
interface MessageRow { first: boolean; last: boolean }   // computed from position → isFirst / isLast
```
