<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    beforeCreate () {

    }
  }
</script>

<style lang="scss">

// Import Bulma's core
@import "~bulma/sass/utilities/_all";

// Set your colors
$primary: #8c67ef;
$primary-invert: findColorInvert($primary);
$twitter: #4099FF;
$twitter-invert: findColorInvert($twitter);

// Setup $colors to use as bulma classes (e.g. 'is-twitter')
$colors: (
    "white": ($white, $black),
    "black": ($black, $white),
    "light": ($light, $light-invert),
    "dark": ($dark, $dark-invert),
    "primary": ($primary, $primary-invert),
    "info": ($info, $info-invert),
    "orange": (#FFCE00,#000),
    "success": ($success, $success-invert),
    "warning": ($warning, $warning-invert),
    "danger": ($danger, $danger-invert),
    "twitter": ($twitter, $twitter-invert)
);

// $tablet: 768px;
$tablet: 500px;

// Links
$link: $primary;
$link-invert: $primary-invert;
$link-focus-border: $primary;

// Import Bulma and Buefy styles
@import "~bulma";
@import "~buefy/src/scss/buefy";

#app {
  overflow-x: hidden;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

main {
  overflow-x: hidden;
}
body {
  padding: 0 !important;
}

@media only screen and (max-width: 500px) {
  .is-padded {
    // width: 60%;
    margin: 0 auto;
  }
  .header {
    padding: 20px 5px;
  }
  .title {
    font-size: 1.1em !important;
  }
  .subtitle {
    font-size: 0.8em !important;
  }
  .section-padding {
    padding: 20px 1rem;
  }
  .is-smaller {
    font-size: 0.9em !important;
    word-break: break-word;
  }
  .is-str11px {
    font-size: 11px !important;
  }
}
@media only screen and (min-width: 501px) and (max-width: 768px) {
  .is-padded {
    width: 50%;
    margin: 0 auto;
  }
  .header {
    padding: 20px 5px;
  }
  .wrapper {
    padding: 1em 0.1em;
  }
  .section-padding {
    padding: 50px 2rem;
  }
}
@media only screen and (min-width: 769px) and (max-width: 1024px) {
  .is-padded {
    width: 40%;
    margin: 0 auto;
  }
  .header {
    padding: 20px 5px;
  }
  .wrapper {
    padding: 1em 0.1em;
  }
  .section-padding {
    padding: 0px 0rem;
  }
}
@media only screen and (min-width: 1025px) {
  .is-padded {
    width: 30%;
    margin: 0 auto;
  }
  .header {
    padding: 20px 5px;
  }
  .wrapper {
    padding: 1em 0.1em;
  }
  .section-padding {
    padding: 0px 0rem;
  }
}

.is-btn {
  display: flex !important;
}

.hero-border {
  border-radius: 50px 50px 0 0;
}
.hero-border-invert {
  border-radius: 0 0 50px 50px;
}
.is-orange {
  background-color:rgb(255, 249, 223);
}
.modal-container {
  min-height: 100px;
  width: 90%;
  padding: 1em 1em;
  background: #FF5F6D;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to bottom, #FFC371, #FF5F6D);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to bottom, #FFC371, #FF5F6D); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 20px;
  overflow-x: hidden;
}
.info-box {
  width: 80%;
  min-height: 50px;
  border-radius: 20px; 
  background-color: #FFF;
}
section {
  padding: 20px 0;
}
.modal-title {
  font-size: 1.5em;
  font-weight: 600;
}
.modal-subtitle {
  font-size: 1em;
  font-weight: 300;
}
.modal-text {
  font-size: 1.5em;
  font-weight: 600;
  color: #263445;

  &.pa-10 {
    padding: 10px 0.2em;
  }
}
.button.button-box {
  font-size: 1.2em;
  font-weight: 500;
  color: #000;
  background-color: #FFC371;
  border: 0px;
  border-radius: 50px;
  width: 100%;
  margin: 0 auto;
}
.pa-10 {
  padding: 10px 10px;
  margin: 0 auto;
}
.pa-20 {
  padding: 20px 20px;
}
.ma-50 {
  margin: 50px 0;
}
.b-sidebar.sidebar-content.is-light {
  background-color: #FFCE;
}
.is-text-smaller {
  font-size: 0.9em;
}
a:link, a:visited, a:hover {
  color: #000;
  text-decoration: underline;
}
</style>

