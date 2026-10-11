import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGODB_URI as string, {
  serverSelectionTimeoutMS: 8000,
});
const db = client.db("bazar-dor07");

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;

const isVercelDeployment = Boolean(process.env.VERCEL_URL);
const vercelHosts = [
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
  process.env.VERCEL_URL,
].filter((host): host is string => Boolean(host));
const configuredAuthURL = process.env.BETTER_AUTH_URL?.replace(/\/+$/, "");
const configuredURLIsLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(
  configuredAuthURL ?? "",
);
const authBaseURL =
  configuredAuthURL && !(isVercelDeployment && configuredURLIsLocal)
    ? configuredAuthURL
    : vercelHosts[0]
      ? `https://${vercelHosts[0]}`
      : configuredAuthURL;
const trustedDeploymentOrigins = [
  ...(authBaseURL ? [new URL(authBaseURL).origin] : []),
  ...vercelHosts.map((host) => `https://${host}`),
];

export const auth = betterAuth({
  baseURL: authBaseURL,
  trustedOrigins: trustedDeploymentOrigins,
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  socialProviders: {
    ...(googleClientId && googleClientSecret
      ? { google: { clientId: googleClientId, clientSecret: googleClientSecret } }
      : {}),
    ...(githubClientId && githubClientSecret
      ? { github: { clientId: githubClientId, clientSecret: githubClientSecret } }
      : {}),
  },
  database: mongodbAdapter(db, {
    client,
  }),
});
