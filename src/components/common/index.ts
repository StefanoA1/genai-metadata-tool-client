export const getClassState = (
  defaultClassName: string,
  modifiedClassName: string,
  errorClassName: string,
  isModified = false,
  isError = false
): string => {
  if (isError) {
    return errorClassName;
  } else if (isModified) {
    return modifiedClassName;
  }
  return defaultClassName;
};
