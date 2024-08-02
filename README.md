# Instant - Messaging Application


## QuickStart

Visit hosted instance at [https://instant.soufrabi.com](https://instant.soufrabi.com)

## Development

Clone the repo
```sh
git clone https://github.com/soufrabi/instant-web.git
cd instant-web
```

Install dependencies
```sh
npm i
```

Run the development server:
```sh
PORT=<PORT_NUMBER> npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Deploy using Docker

Next.js Dockerization Example : <https://github.com/vercel/next.js/tree/canary/examples/with-docker/>

Docker Image hosted at : <https://hub.docker.com/r/soufrabidev/instant-web/>

```sh
docker pull docker.io/soufrabidev/instant-web:<TAG_NAME>
docker run -d -p <YOUR_PORT>:3000 docker.io/soufrabidev/instant-web:<TAG_NAME>
```

## Environment Variables

- NEXTAUTH_SECRET
: Generate using `openssl rand -base64 32`
- NEXTAUTH_URL : `http://localhost:<PORT_NUMBER>`
- GOOGLE_CLIENT_ID
- GOOGLE_CLIENT_SECRET
- WEBSITE_URL_DOMAIN
: Should match NEXTAUTH_URL (might be deprecated later on)
- DATABASE_URL
: In development mode, must be placed in .env due to prisma limitations, eg,`postgres://pguser:password@hostname:port_number/db_name`
