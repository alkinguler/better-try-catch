export type Success<T> = {
	error: null;
	data: T;
};

export type Failure<E extends Error> = {
	error: E;
	data: null;
};

export type Result<T, E extends Error> = Success<T> | Failure<E>;

/**
 * Executes a promise and returns a result object.
 * @template T The type of the data returned by the promise.
 * @template E The type of the error.
 * @param promise The promise to execute.
 * @returns A result object.
 */
export async function tryCatch<T, E extends Error = Error>(
	promise: Promise<T>,
): Promise<Result<T, E>> {
	try {
		const data = await promise;
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as E };
	}
}

/**
 * Executes a synchronous function and returns a result object.
 * @template T The type of the data returned by the function.
 * @template E The type of the error.
 * @param fn The synchronous function to execute.
 * @returns A result object.
 */
export function tryCatchSync<T, E extends Error = Error>(
	fn: () => T,
): Result<T, E> {
	try {
		const data = fn();
		return { data, error: null };
	} catch (error) {
		return { data: null, error: error as E };
	}
}

/**
 * Checks if the result is a success.
 * @param result The result object.
 * @returns True if the result is a success, false otherwise.
 */
export function isSuccess<T, E extends Error>(
	result: Result<T, E>,
): result is Success<T> {
	return result.error === null;
}

/**
 * Checks if the result is a failure.
 * @param result The result object.
 * @returns True if the result is a failure, false otherwise.
 */
export function isFailure<T, E extends Error>(
	result: Result<T, E>,
): result is Failure<E> {
	return result.error !== null;
}
