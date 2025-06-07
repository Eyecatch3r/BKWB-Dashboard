# Stage 1: Builder
# -----------------
# Use the official Node.js 18 Alpine image as a base. Alpine is a lightweight Linux distribution.
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and lock files to leverage Docker cache
COPY package*.json ./

# Install dependencies (use --frozen-lockfile for consistency)
# If you use yarn, use `yarn install --frozen-lockfile`
# If you use pnpm, use `pnpm install --frozen-lockfile`
RUN npm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Set environment variables for the build process if needed
# ARG NEXT_PUBLIC_API_URL
# ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Build the Next.js application
RUN npm run build

# Stage 2: Runner
# ---------------
# Use a fresh, lightweight Node.js Alpine image for the final image
FROM node:18-alpine AS runner

WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production
# Uncomment the next line if you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

# Create a non-root user for security purposes
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone output from the builder stage
# This includes the server.js file, the .next/static folder, and a minimal node_modules
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static


# Set the new user as the default user
USER nextjs

# Expose the port the app will run on
EXPOSE 3000

# Set the default port for the Next.js server
ENV PORT 3000

# The command to start the Next.js server in standalone mode
CMD ["node", "server.js"]