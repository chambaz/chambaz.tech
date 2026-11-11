FROM node:24-bookworm-slim AS build

ARG TARGETARCH
RUN apt-get update \
    && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && case "$TARGETARCH" in \
        amd64) arch=x86_64; checksum=8f5132b3522412d04e395e0b25f6d68613ad272a873e54a2b3ebf664873024a4 ;; \
        arm64) arch=aarch64; checksum=266448fffbf7c7004ca399d0e76dd699541771096d8a42aede98cebe2a029d02 ;; \
        *) echo "Unsupported architecture: $TARGETARCH" >&2; exit 1 ;; \
    esac \
    && curl -fsSL "https://github.com/getzola/zola/releases/download/v0.23.6/zola-v0.23.6-${arch}-unknown-linux-gnu.tar.gz" -o /tmp/zola.tar.gz \
    && echo "$checksum  /tmp/zola.tar.gz" | sha256sum -c - \
    && tar -xzf /tmp/zola.tar.gz -C /usr/local/bin zola \
    && rm /tmp/zola.tar.gz

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

COPY config.toml ./
COPY content/ content/
COPY data/ data/
COPY templates/ templates/
COPY styles/ styles/
COPY scripts/ scripts/
COPY static/ static/
RUN npm run build

FROM caddy:2-alpine
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/public /srv
COPY LICENSE /srv/LICENSE
EXPOSE 8080
