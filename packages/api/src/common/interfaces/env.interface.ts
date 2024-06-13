export default interface IEnv extends Record<string, unknown> {
  CLERK_SECRET_KEY: string;
  CLERK_PUBLISHABLE_KEY: string;

  DB_URL: string;
}
