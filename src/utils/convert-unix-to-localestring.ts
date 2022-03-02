function convertUnixToLocaleString(milliseconds: number): string {
  const date = new Date(milliseconds * 1000);
  return date.toLocaleString();
}

export default convertUnixToLocaleString;
