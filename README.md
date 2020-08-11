## Start docz server

You can start docz development server by using:

```
$ yarn docz dev
# or
$ npm run docz dev
```

It will run on `localhost:3000`.

## Build

### Build library

Production build

```
$ yarn build
# or
$ npm run build
```


Development build

```
$ yarn dev
# or
$ npm run dev
```

Build will appear in `./dist` folder.

### Build documentation

```
$ yarn docz build
# or
$ npm run docz build
```

Command will generate a static site in `.docz/dist/`.

You can try it out with `yarn docz serve`. It will serve generated site on `localhost:3000`.
