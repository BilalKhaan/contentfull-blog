<template>
	<div id="notfound">
		<div class="notfound">
			<div class="notfound-404"></div>
			<h1>404</h1>
			<h2>Oops! Page Not Be Found</h2>
			<p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
			<nuxt-link to="/">Back to homepage</nuxt-link>
		</div>
	</div>
</template>
<style>
  #notfound {
    position: relative;
    height: 100vh;
  }
  #notfound .notfound {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  }

  .notfound {
    max-width: 35rem;
    width: 100%;
    padding-left: 10rem;
    line-height: 1.1;
  }

  .notfound .notfound-404 {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    width: 8.75rem;
    height: 8.75rem;
    background-image: url('~assets/images/emoji.png');
    background-size: cover;
  }

  .notfound .notfound-404:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-transform: scale(2.4);
    -ms-transform: scale(2.4);
    transform: scale(2.4);
    border-radius: 50%;
    background-color: #f2f5f8;
    z-index: -1;
  }

  .notfound h1 {
    font-family: 'Nunito', sans-serif;
    font-size: 4.0625rem;
    font-weight: 700;
    margin-top: 0px;
    margin-bottom: 0.625rem;
    color: #151723;
    text-transform: uppercase;
  }

  .notfound h2 {
    font-family: 'Nunito', sans-serif;
    font-size: 1.3125rem;
    font-weight: 400;
    margin: 0;
    text-transform: uppercase;
    color: #151723;
  }

  .notfound p {
    font-family: 'Nunito', sans-serif;
    color: #999fa5;
    font-weight: 400;
  }

  .notfound a {
    font-family: 'Nunito', sans-serif;
    display: inline-block;
    font-weight: 700;
    border-radius: 2.5rem;
    text-decoration: none;
    color: #388dbc;
  }

  @media only screen and (max-width: 767px) {
    .notfound .notfound-404 {
      width: 6.875rem;
      height: 6.875rem;
    }
    .notfound {
      padding: 6.875rem 0.9375rem 0 0.9375rem;
    }
}
</style>