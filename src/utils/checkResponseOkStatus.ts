export const checkResponseOkStatus = (response: Response) => {
  if (!response.ok) {
    throw new Error();
  }
};
