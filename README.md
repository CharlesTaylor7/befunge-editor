# Befunge
Befunge is an esoteric programming language from 1993, it's core feature set is its a stack based language like Forth,
and instructions are programmed onto a 2d grid. Code itself is easily self-modifiable and can be used for data storage too.

The best way to understand it is to open up the web app and try it for yourself: https://charlestaylor7.github.io/befunge-editor/

To learn more about befunge:
- [Wikipedia](https://en.wikipedia.org/wiki/Befunge)
- [Esolang Wiki](https://esolangs.org/wiki/Befunge)
- [Documention](http://www.nsl.com/papers/befunge93/befunge93.htm)

# Github Actions

On every push to main, that alters source code, the code is validated against each of these  tools:
- Jest
- Typescript
- ESLint
- Prettier

Then if all are succesful the a production build is created and deployed to github pages at https://charlestaylor7.github.io/befunge-editor/

# Development
This is a [React](https://www.react.dev/) project bundled and developed with [Vite](https://vitejs.dev/).
Styling is done inline via [Tailwind](https://www.tailwindcss.com/).

Install Deps
```bash
yarn 
```

Start tailwind in watch mode:
```bash
yarn tailwind --watch
```

In a separate terminal window, run the development server:
```bash
yarn dev
```

Optionally, there is an mprocs.yaml config file in the repo that will allow your to run all dev commands, including linting, typechecking, and testing.

Steps:
- Install [mprocs](https://github.com/pvolok/mprocs)
- Run `mprocs` in the root of this project
