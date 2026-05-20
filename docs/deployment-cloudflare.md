# Deploying to Cloudflare Pages

This guide outlines the steps to deploy the NestJS server to Cloudflare Pages.

## Configuration

Cloudflare Pages has specific requirements for serverless functions that differ from Vercel. The following changes are needed to deploy this application to Cloudflare.

### 1. `wrangler.toml`

A `wrangler.toml` file is required to configure the Cloudflare Pages deployment. This file should be created in the root of the project with the following content:

```toml
name = "hospital-clock-in-management-system-server"
compatibility_date = "2024-05-20"

[build]
command = "npm install && npm run build --workspace=@hcm/server"
```

### 2. Application Entry Point

The application's entry point in `apps/server/src/main.ts` needs to be modified to be compatible with Cloudflare Workers, which is the runtime used by Cloudflare Pages Functions. The current entry point is designed for a Node.js environment like Vercel, not the web-standard `fetch` API used by Cloudflare.

I can make these changes for you. Please let me know if you'd like me to proceed with creating the `wrangler.toml` file and modifying the application's entry point.
