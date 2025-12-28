FROM oven/bun:1.3.4-alpine

RUN apk add --no-cache git

RUN adduser -D user

WORKDIR /home/user
RUN chown -R user:user /home/user
USER user

RUN git clone \
    https://github.com/anuraghazra/github-readme-stats.git \
    --branch master
# RUN git checkout 8108ba1417faaad7182399e01dd724777adc63e5
WORKDIR /home/user/github-readme-stats

RUN bun install
RUN bun add express@5.2.1

COPY --chown=user:user entrypoint.sh ./
RUN chmod +x entrypoint.sh

EXPOSE 9000

CMD ["./entrypoint.sh"]
