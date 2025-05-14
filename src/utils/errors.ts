const extractErrorMessage = (err: any) => {
  const errorMessage = err.graphQLErrors?.[0]?.extensions?.originalError?.message;

  if (!errorMessage) return;

  return formatErrorMessage(Array.isArray(errorMessage) ? errorMessage[0] : errorMessage);
}

const formatErrorMessage = (errorMessage: string) => {
  return errorMessage.charAt(0).toUpperCase() + errorMessage.slice(1);
};

export { extractErrorMessage };