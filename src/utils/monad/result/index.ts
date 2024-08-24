import type { Failed, Result, Success } from "@/types/monad";

function result<T>(isFailed: false, errorOrResult: T): Success<T>;
function result<E>(isFailed: true, errorOrResult: E): Failed<E>;
function result<T, E>(isFailed: boolean, errorOrResult: T | E): Result<T, E> {
  if (isFailed) {
    return {
      isFailed: true,
      error: errorOrResult as E,
      value: null,
    };
  } else {
    return {
      isFailed: false,
      error: null,
      value: errorOrResult as T,
    };
  }
}

const failed = <E>(error: E): Failed<E> => {
  return result<E>(true, error);
};

const success = <T>(value: T): Success<T> => {
  return result<T>(false, value);
};

export { result, failed, success };
