# Container WordPress Boilerplate
A scaffold to combine simple use of [Tailwind](https://tailwindcss.com/) and ES6 as a [WordPress](https://en-gb.wordpress.org/) theme. Clone repository to `themes` directory to start.

### Quick Install

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```
### Purpose
Low config install with [Bun](https://bun.sh/) as a dependency. Minimal structure to integrate with [GitHub Actions](https://github.com/features/actions) and a [WPEngine](https://wpengine.co.uk/) instance using [ACF](https://www.advancedcustomfields.com/). Boilerplate designed to work in the [LocalWP](https://localwp.com/) and [VSCode](https://code.visualstudio.com/) / [GitHub Desktop](https://desktop.github.com/) ecosystem. A loosely opinionated workflow for managing WordPress in a modern JavaScript runtime.

#### Features
[Bun](https://bun.sh/) runtime to remove multiple dependencies for compilation, transpilation and running a local development environment. Simple JavaScript and CSS compiling for development and production using `$ bun run dev` and `$ bun run prd` respectively.

[GitHub Actions](https://github.com/features/actions) automatically takes the code from your machine to production, a bare-bones example included in the boilerplate for use with [WPEngine](https://wpengine.co.uk/).

[ACF](https://www.advancedcustomfields.com/) local and development syncing using `acf-json`. Allows for multiple people to work on one online database instance with fewer issues.

[Tailwind](https://tailwindcss.com/) by default to allow for rapid prototyping and consistent, modular CSS with PostCSS to take care of auto-prefixing.

#### Demo
[Demo Link](https://containerbp.wpenginepowered.com/)
