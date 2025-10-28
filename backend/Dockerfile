FROM node:20-alpine AS builder
WORKDIR /app

# Install pnpm
RUN npm i -g pnpm

# Copy and install dependencies
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source
COPY . ./

# Generate Prisma client and build Nest for production
RUN pnpm exec prisma generate
RUN pnpm run build

# Prune dev dependencies to reduce image size
RUN pnpm prune --prod

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy production node_modules, compiled dist, and prisma folder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main.js"]