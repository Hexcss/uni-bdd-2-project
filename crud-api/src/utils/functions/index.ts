export function ensureVariableIsSet(
  variable: string | undefined,
  name: string
): asserts variable is string {
  if (!variable) {
    throw new Error(`Environment variable ${name} is not set.`);
  }
}

export function parsePort(port: string | undefined): number {
  const parsedPort = parseInt(port ?? '8080', 10);
  if (isNaN(parsedPort)) {
    throw new Error(`Invalid port number: ${port}`);
  }
  return parsedPort;
}
