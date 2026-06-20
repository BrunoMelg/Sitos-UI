# Security Guardian

## Objective

Ensure all generated code follows secure coding practices.

## Rules

Never:

- Use dangerouslySetInnerHTML unless explicitly required.
- Execute arbitrary user input.
- Store secrets in source code.
- Expose internal APIs.
- Trust external data without validation.
- Generate eval().
- Generate Function() constructors.

## React Security

Forbidden:

dangerouslySetInnerHTML
eval()
new Function()

Unless explicitly requested.

## Validation

Every external input must be:

- Validated
- Sanitized
- Typed

## Failure

If a security risk exists, reject implementation.