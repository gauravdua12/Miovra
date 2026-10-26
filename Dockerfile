# Production image for miovra.eu. Builds the Next.js "standalone" server and runs it as a non-root user.
# Works on both x86 and ARM servers (OCI Ampere A1 is ARM).

FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:22-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S miovra && adduser -S miovra -G miovra
COPY --from=build /app/public ./public
COPY --from=build --chown=miovra:miovra /app/.next/standalone ./
COPY --from=build --chown=miovra:miovra /app/.next/static ./.next/static
# Enquiries and sign-ups are kept here; docker-compose mounts a volume so they survive updates.
RUN mkdir -p /app/data && chown miovra:miovra /app/data
USER miovra
EXPOSE 3000
CMD ["node", "server.js"]
