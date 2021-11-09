import axios from 'axios'

export default {
  data() {
    return {
      twitchAuth: null,
      axios: axios.create({
        timeout: 15000, // 15 sec
        headers: { 'X-Requested-With': 'XMLHttpRequest' },
      })
    }
  },

  beforeMount() {
    this.$twitch().onContext((context, _) => {
      this.$setTwitchTheme(context.theme);
    })
  },

  methods: {
    $axios() {
      return this.axios;
    },
    $twitch() {
      return window.Twitch.ext;
    },

    $setTwitchTheme(theme) {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(theme);
    },

    $setAxiosAuthorization(token) {
      this.axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    $authorized() {
      return new Promise((resolve, _) => {
        if (this.twitchAuth) {
          resolve(this.twitchAuth)
        } else {
          this.$twitch().onAuthorized((auth) => {
            this.twitchAuth = auth;
            this.$setAxiosAuthorization(auth.token)
            resolve(auth)
          });
        }
      })
    },

    async $request(config) {
      await this.$authorized();
      return this.axios.request(config)
    },
    async $get(url, config) {
      await this.$authorized();
      return this.axios.get(url, config)
    },
    async $delete(url, config) {
      await this.$authorized();
      return this.axios.delete(url, config)
    },
    async $head(url, config) {
      await this.$authorized();
      return this.axios.head(url, config)
    },
    async $options(url, config) {
      await this.$authorized();
      return this.axios.options(url, config)
    },
    async $post(url, data, config) {
      await this.$authorized();
      return this.axios.post(url, data, config)
    },
    async $put(url, data, config) {
      await this.$authorized();
      return this.axios.put(url, data, config)
    },
    async $patch(url, data, config) {
      await this.$authorized();
      return this.axios.patch(url, data, config)
    },

    $log() {
      if (process.env.NODE_ENV === 'development') {
        console.log.apply(this, arguments);
        window.Twitch.ext.rig.log.apply(this, arguments);
      }
    },
    $debug() {
      if (process.env.NODE_ENV === 'development') {
        console.debug.apply(this, arguments);
        window.Twitch.ext.rig.log.apply(this, ["DEBUG", ...arguments]);
      }
    },
    $info() {
      if (process.env.NODE_ENV === 'development') {
        console.info.apply(this, arguments);
        window.Twitch.ext.rig.log.apply(this, ["INFO", ...arguments]);
      }
    },
    $warn() {
      console.warn.apply(this, arguments);
      if (process.env.NODE_ENV === 'development') {
        window.Twitch.ext.rig.log.apply(this, ["WARNING", ...arguments]);
      }
    },
    $error() {
      console.error.apply(this, arguments);
      if (process.env.NODE_ENV === 'development') {
        window.Twitch.ext.rig.log.apply(this, ["ERROR", ...arguments]);
      }
    },
  }
}