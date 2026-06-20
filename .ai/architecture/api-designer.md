# API Designer

## Objective

Create predictable component APIs.

## Rules

Props must:

- Be intuitive
- Be discoverable
- Follow existing naming patterns
- Conform to api-contracts.md — read it before creating any component

## Naming

Good:

isOpen
isDisabled
isLoading

Bad:

opened
activeState
loadingStateFlag

## Variant and Intent

`variant` controls visual form. `intent` controls semantic meaning. They are always separate props.

Good:

variant="solid"
variant="outline"
variant="ghost"
variant="subtle"
variant="link"

intent="neutral"
intent="accent"
intent="danger"
intent="warning"
intent="success"
intent="info"

Bad — conflates form with semantics:

variant="primary"
variant="secondary"
variant="destructive"
variant="danger"

## Controlled State

Controlled boolean pairs follow this pattern:

isOpen + defaultOpen + onOpenChange
isChecked + defaultChecked + onCheckedChange

State descriptors are one-way (no default/handler pair):

isDisabled
isLoading
isReadOnly
isRequired
isInvalid

## Validation

Would another developer understand this API in 10 seconds?

Does it conform to every rule in api-contracts.md?