This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

This will start the development server and the Electron dev tools.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Once your web code has been built for distribution, you will need to push your web code to the web native Capacitor application. To do this, you can use the Capacitor CLI to "sync" your web code and install/update the required native dependencies.

```bash
npx cap sync
```

For starting the iOS development tools, run the following commands:

```bash
npx cap add ios

npx cap open ios

npx cap run ios
```

For starting the android development tools, run the following commands:

```bash
npx cap add android

npx cap open android

npx cap run android
```