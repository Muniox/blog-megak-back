export const showServerMode = (mode: string, port: number, address: string) => {
  if (mode === 'development') {
    // eslint-disable-next-line no-console
    console.log(
      `server is working in ${mode} mode on http://${address}:${port}`,
    );
  } else {
    // eslint-disable-next-line no-console
    console.log(
      `server is working in ${mode} mode on https://${address}:${port}`,
    );
  }
};
