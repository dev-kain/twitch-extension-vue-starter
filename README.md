# Twitch Extension Vue Starter

A Twitch Extension Starter Kit. It has been successfully used in other Twitch Extensions, approved by Twitch.

It comes bundled with:

* [Vue.js 3.x](https://vuejs.org) - using Single File Components (SFC) for pre-rendering.
* [tailwindcss](https://tailwindcss.com) - for quick styling without contstraints from like Bootstrap.
* [axios](https://github.com/axios/axios) - to make HTTP Ajax calls easier.
* [Twitch Vue mixin](./src/mixins/twitch.js) - to smoothen work with Twitch's developer rig and "Hosted Test".
* [Babeljs](https://babeljs.io/) - transpiles all your javascript.
* [Webpack](https://webpack.js.org) - serving dev versions, and glueing it all together.

More features:

* [Custom Twitch Media Breakpoints](./tailwind.config.js) - they could use a bit more work, but it's going in the right direction.
* [Light/Dark theme support](./src/mixins/twitch.js) - it works out of the box with [Tailwind's `dark` variant](https://tailwindcss.com/docs/dark-mode).
* [Google's Inter Font](https://fonts.google.com/specimen/Inter) - it's Tailwind's default, imported through Google Fonts so it works with Twitch Extensions.
* No jQuery :-)


## Initial setup

1. Click "Use this template" above and create a new repository from this template.
1. Clone your new repository to your machine.
1. Create a new Twitch Extension in the [Developer Console](https://dev.twitch.tv/console/extensions) ([Guide](https://dev.twitch.tv/docs/extensions#build-your-first-extension))
1. Download the [Twitch Developer Rig](https://dev.twitch.tv/docs/extensions/rig) and let it create a new project for you. You should now have a `manifest.json` file.
   Copy this file to your locally cloned repository directory.
1. Install [mkcert](https://github.com/FiloSottile/mkcert#installation) for a local SSL/HTTPS certificate. You can't skip this step!
1. Change to your local repository directory and run `mkcert -install localhost`. You should now have `localhost-key.pem` and `localhost.pem` in the same directory.
1. Install a Node.js version manager like [nodenv](https://github.com/nodenv/nodenv). It should use `.node-version` to ensure version consistency.
1. Lastly, install dependencies by running `npm install`.

You are all set. Now have a look at the [src](./src) directory.


## The `src` directory

The `src` directory is where you will place the Twitch Extension Views. Have a look at the existing examples for `video_component` and `config`.
Each view requires two files: `[view].js` and `[view].vue`. The `twitch.html` is a template file used by Webpack to compile/render your [Vue Single File Components](https://v3.vuejs.org/guide/single-file-component.html) into one single HTML file. You can study [webpack.config.js](./webpack.config.js) for how that works, but you don't have to edit this template file.

Please also have a look at [mixins/twitch.js](./src/mixins/twitch.js) for some handy Twitch commands and some behind-the-scene actions.


## Usage

You finished the initial setup, studied the `src` directory and maybe even added your first extension view. It's now time to locally serve your extension
either through the Developer Rig or in your browser. Here are a couple of commands to make your life easier: 

```shell
npm run dev # serve your extension: https://localhost:8080 (you can change the port in webpack.config.js)
npm run build && npm run zip # compile/render your extension and create a ZIP file ready to be uploaded to Twitch Asset hosting
```

## What's next

We hope you find our little starter kit helpful. It has a lot of moving parts. You don't have to fully understand everything to get started, just focus on the `src` directory
for now. We are here to help if you have any questions. Submit a GitHub [issue](https://github.com/tracy-and-matt/twitch-extension-vue-starter/issues) or even better,
catch us on one of our [Twitch streams](https://www.twitch.tv/tracy_and_matt) to ask us for help.

Let us know if you build something cool with it. Or anything really. :-) 
