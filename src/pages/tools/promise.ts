export const usePromise = async (promise: any, errorExt: string) => {
  return promise
    .then((data: any) => [null, data])
    .catch((err: any) => {
      if (errorExt) {
        const parsedError = Object.assign({}, err, errorExt);
        return [parsedError, undefined];
      }
      return [err, undefined];
    });
};
