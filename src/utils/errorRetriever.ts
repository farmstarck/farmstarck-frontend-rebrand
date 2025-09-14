export const errorMessageRetreiver = (error: any) => {
  const message =
    (error.response &&
      error.response.data &&
      (error.response.data.message || error.response.data.error)) ||
    error.message ||
    error.error ||
    error.toString();

  return message;
};
