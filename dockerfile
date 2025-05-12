# Dockerfile

# Etapa de build
FROM node:20 AS builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile \
  && yarn build

# Etapa de producció
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app .
RUN yarn install --production --frozen-lockfile --ignore-scripts
EXPOSE 3000
CMD ["yarn", "start"]