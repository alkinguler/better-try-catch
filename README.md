# BetterTryCatch

A better, type-safe try-catch wrapper for TypeScript and JavaScript. It eliminates the need for block-scoped `let` variables and deeply nested `try/catch` blocks by returning a predictable `Result` object.

## Installation

You can install this package using your favorite package manager:

```bash
# npm
npm install @alkinguler/better-try-catch

# bun
bun add @alkinguler/better-try-catch

# yarn
yarn add @alkinguler/better-try-catch

# pnpm
pnpm add @alkinguler/better-try-catch
```

## Usage

### Asynchronous Operations (`tryCatch`)

Wrap your promises to safely handle errors without `try/catch` blocks.

```typescript
import { tryCatch } from '@alkinguler/better-try-catch';

async function fetchUser(userId: string) {
	// Notice how we don't need a try/catch block!
	const { data, error } = await tryCatch(fetch(`/api/users/${userId}`));

	if (error) {
		console.error("Failed to fetch user:", error.message);
		return;
	}

	// data is fully typed based on the Promise's return type!
	console.log("User data:", data);
}
```

### Synchronous Operations (`tryCatchSync`)

Use it for synchronous code that might throw exceptions, like `JSON.parse`.

```typescript
import { tryCatchSync } from '@alkinguler/better-try-catch';

function parseConfig(jsonString: string) {
	const { data, error } = tryCatchSync(() => JSON.parse(jsonString));

	if (error) {
		console.error("Invalid JSON!");
		return null;
	}

	return data;
}
```

### Type Guards

We provide handy `isSuccess` and `isFailure` type guards to safely narrow down the `Result` type.

```typescript
import { tryCatch, isSuccess, isFailure } from '@alkinguler/better-try-catch';

async function processData() {
	const result = await tryCatch(someAsyncOperation());

	if (isFailure(result)) {
		// result.error is now narrowed to the Error type
		// result.data is null
		console.log(result.error);
		return;
	}

	if (isSuccess(result)) {
		// result.data is narrowed to the expected type
		// result.error is null
		console.log(result.data);
	}
}
```

## API Reference

### `tryCatch<T, E extends Error = Error>(promise: Promise<T>): Promise<Result<T, E>>`
Executes an asynchronous promise and returns a `Result` object containing either `data` or `error`.

### `tryCatchSync<T, E extends Error = Error>(fn: () => T): Result<T, E>`
Executes a synchronous function and returns a `Result` object.

### `isSuccess<T, E>(result: Result<T, E>): result is Success<T>`
Type guard to check if a result was successful. Narrows the type to `Success<T>`.

### `isFailure<T, E>(result: Result<T, E>): result is Failure<E>`
Type guard to check if a result failed. Narrows the type to `Failure<E>`.

## License

MIT
