<template>
	<div class="l-footer">
		<section class="row">
			<div class="column">
				<p class="l-footer__tagline">
					<b>
						<font style="vertical-align: inherit;">
							<font style="vertical-align: inherit;">Seraphin
							</font>
						</font>
					</b>
					<font style="vertical-align: inherit;">
						<font style="vertical-align: inherit;"> , the digital broker who simplifies your insurance
						</font>
					</font>
				</p>
			</div>
		</section>
    <section class="row-parent">	
  		<div class="footer-logo-and-text">
        <div class="web-name">
          <div class="row">
            <div class="column">
              <img 
              :data-src="require(`@/assets/images/${this.siteName}/logo_complete.png`)"
              alt="website-logo"
              class="lazyload" 
              />
            </div>
          </div>
        </div>
  			<div class="l-footer__info">
          <div v-if="footerLinks" class="row" style="justify-content: left;">
            <div class="column l-footer__links">
              <p>{{ footerLinksFirstColumnLabel }}</p>
              <ul>
                <li v-for="footerLink in footerLinksFirstColumn" :key="label(footerLink)">
                  <a :href="url(footerLink)">{{ label(footerLink) }}</a>
                </li>
              </ul>
            </div>
            <div class="column l-footer__links">
              <p>{{ footerLinksSecondColumnLabel }}</p>
              <ul>
                <li v-for="footerLink in footerLinksSecondColumn" :key="label(footerLink)">
                  <a :href="url(footerLink)">{{ label(footerLink) }}</a>
                </li>
              </ul>
            </div>
          </div>
  				<div class="row">
  					<div class="column">
  						<p class="l-footer__copyright">
  							<font style="vertical-align: inherit;">
  								<font style="vertical-align: inherit;">You can read all of Seraphin's legal documents here. </font>
  								<font style="vertical-align: inherit;">These documents are mandatory in the insurance broker profession. </font>
  								<font style="vertical-align: inherit;">You can find </font>
  							</font>
  							<a href="https://seraphin.companyon.eu/fr-be" target="_blank">
  								<font style="vertical-align: inherit;">
  									<font style="vertical-align: inherit;">legal information</font>
  								</font>
  							</a>
  							<font style="vertical-align: inherit;">
  								<font style="vertical-align: inherit;"> , information concerning the protection of </font>
  							</font>
  							<a href="https://seraphin.companyon.eu/fr-be" target="_blank">
  								<font style="vertical-align: inherit;">
  									<font style="vertical-align: inherit;">privacy</font>
  								</font>
  							</a>
  							<font style="vertical-align: inherit;">
  								<font style="vertical-align: inherit;"> , </font>
  							</font>
  							<a href="https://app.sectorcatalog.be/SectorCatalog/public" target="_blank" class="footer-link-list">
  								<font style="vertical-align: inherit;">
  									<font style="vertical-align: inherit;">specific documents</font>
  								</font>
  							</a>
  							<font style="vertical-align: inherit;">
  								<font style="vertical-align: inherit;"> , as well as the </font>
  							</font>
  							<a href="https://seraphin.companyon.eu/fr-be" target="_blank">
  								<font style="vertical-align: inherit;">
  									<font style="vertical-align: inherit;">general conditions</font>
  								</font>
  							</a>
  							<font style="vertical-align: inherit;">
  								<font style="vertical-align: inherit;"> of use of the website and our </font>
  							</font>
  							<a href="https://seraphin.companyon.eu/fr-be" target="_blank">
  								<font style="vertical-align: inherit;">
  									<font style="vertical-align: inherit;">cookie policy</font>
  								</font>
  							</a>
  							<font style="vertical-align: inherit;">
  								<font style="vertical-align: inherit;"> . </font>
  								<font style="vertical-align: inherit;">You can file a complaint with the Ombudsman by clicking </font>
  							</font>
  							<a href="https://seraphin.companyon.eu/fr-be" target="_blank">
  								<font style="vertical-align: inherit;">
  									<font style="vertical-align: inherit;">here</font>
  								</font>
  							</a>
  							<font style="vertical-align: inherit;">
  								<font style="vertical-align: inherit;"> .</font>
  							</font>
  						</p>
  					</div>
  				</div>
		      <div class="flex-container flex-partship">
						<div class="column div-one">
							<p class="l-footer__copyright">
								<font style="vertical-align: inherit;">
									<font style="vertical-align: inherit;">© 2020 Seraphin Insurance broker approved by the FSMA 114863A | </font>
									<font style="vertical-align: inherit;">BE0639.926.420 | </font>
									<font style="vertical-align: inherit;">Rue des Francs 79, 1040 Brussels (BE) | </font>
									<font style="vertical-align: inherit;">+32 2 808 11 78 | </font>
									<span>
										<a href="mailto:hello@seraphin.be">
											<font style="vertical-align: inherit;">hello@seraphin.be</font>
										</a>
									</span>
								</font>
								<span> 
									<a href="mailto:hello@seraphin.be">
										<font style="vertical-align: inherit;"></font>
									</a>
								</span>
							</p>
						</div>
						<div class="column div-two" itemscope="" itemtype="http://schema.org/Organization">
							<ul class="l-footer__icon-list">
								<li class="l-footer__icon-item">
									<a class="l-footer__icon-link" href="https://www.facebook.com/HelloSeraphin/" itemprop="sameAs" target="_blank">
										<img 
                    :data-src=" facebookIcon " 
                    alt="partager" 
                    class="lazyload">
									</a>
								</li>
								<li class="l-footer__icon-item">
									<a class="l-footer__icon-link" href="https://twitter.com/HelloSeraphin" itemprop="sameAs" target="_blank">
       							<img 
                    :data-src=" twitterIcon " 
                    alt="partager"
                    class="lazyload"
                    />
									</a>
								</li>
								<li class="l-footer__icon-item">
									<a class="l-footer__icon-link" href="https://www.linkedin.com/company/seraphin" itemprop="sameAs" target="_blank">
        						<img 
                    class="linked-in-image lazyload"  
        						:data-src=" linkedinIcon " 
                    alt="partager">
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</div>	
    </section>

    <section class="row">
				<div class="column">
					<p class="text-center">
						<img 
            class="l-footer__security" 
            alt="foter-security"
            src="~assets/images/fotercard.png"
            />
					</p>
				</div>
		</section>
	</div>
</template>
<script>
import web  from "@/services/siteName"; 
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      navigationLinks: 'navigation-links/getNavigationLinks'
    }),
    footerLinks() {
      return !!(this.navigationLinks && this.navigationLinks.fields && this.navigationLinks.fields.footerLinksFirstColumnLabel
        && this.navigationLinks.fields.footerLinksSecondColumnLabel && this.navigationLinks.fields.footerLinksFirstColumn
        && this.navigationLinks.fields.footerLinksSecondColumn)
    },
    footerLinksFirstColumnLabel() {
      return this.navigationLinks.fields.footerLinksFirstColumnLabel
    },
    footerLinksSecondColumnLabel() {
      return this.navigationLinks.fields.footerLinksSecondColumnLabel
    },
    footerLinksFirstColumn() {
      return this.navigationLinks.fields.footerLinksFirstColumn
    },
    footerLinksSecondColumn() {
      return this.navigationLinks.fields.footerLinksSecondColumn
    },
    siteName() {
      return web.siteName();
    },

    facebookIcon() {
      return require(`@/assets/images/${this.siteName}/footer/foter-facebook.svg`); 
    },

    twitterIcon() {
      return require(`@/assets/images/${this.siteName}/footer/foter-twitter.svg`); 
    },

    linkedinIcon() {
      return require(`@/assets/images/${this.siteName}/footer/foter-linkedin.svg`);
    }
  },
  methods: {
    label(footerLink) {
      return footerLink.fields.label
    },
    url(footerLink) {
      return footerLink.fields.url
    }
  }
};
</script>
<style lang="scss" rel="stylesheet/scss" scpoed>
.footer-logo-and-text {
    display: flex;
    @include for-size (sm-only) {
      flex-direction: column;
    }
  }
  .web-name {
    margin: 7px 0 12px;
    width: 30%;
    @include for-size (sm-only) {
      width: 100%;
    }
    .logo {
      margin-top: -20px;
    }
  }
  .row-parent {
  	display: flex;
  	@include for-size (sm-only) {
  	 flex-direction: column;
     margin-left: auto;
     padding: 0;
    }
    @include for-size (tablet) {
      margin-left: 0;
    }
  	padding: 0 0.66667rem;
  	max-width: 80rem;
    margin-left: 50px;
    margin-right: auto;
    .row-partship {
    	width: 95%;
    	margin-left: 20px;
    }
  }

  .row {
  	display: flex;
  	@include for-size (sm-only) {
  	 flex-direction: column;
    }
  	padding: 0 0.66667rem;
  	max-width: 80rem;
    margin-left: auto;
    margin-right: auto;
    .row-partship {
    	width: 100%;
    	margin-left: 20px;
    }
  }
  .column {
    width: 100%;
    float: left;
    @include for-size (sm-only) {
	    padding-left: 5px;
      padding-right: .66667rem;
    }
  }
  .l-footer__tagline {
    text-align: center;
    margin: 24px 0 20px;;
    font-size: 20px;
    font-family: $font;
  }
	.l-footer {
    background: $footer-bg-color;
    color: $footer-text-color;
    padding: 10px 0;
    margin-top: auto;
  }
  .l-footer__menu-title {
    font-size: 18px;
    font-family: $font;
  }
  .l-footer__menu-list {
    list-style: none;
    padding: 0;
    margin: 0 0 12px;
  }
  .l-footer__menu-link {
    color: $footer-text-color;
    opacity: 0.5;
  }
  .l-footer__menu-link:hover {
    color: $footer-text-color;
    opacity: 1;
  }
  .l-footer__menu-item {
  	font-size: 15px;
  }
  .l-footer__licences {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  .l-footer__image-link {
    -webkit-filter: grayscale(1) sepia(60%) hue-rotate(180deg) opacity(0.3);
    filter: grayscale(1) sepia(60%) hue-rotate(180deg) opacity(0.3);
    transition: all .2s ease-out;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  .l-footer__info {
    margin: 24px 0 12px;
    @include for-size (sm-only) {
      margin: 0;
    }
  }
  .l-footer__links {
    max-width: 300px;
    ul {
      margin-left: 10px;
      margin-top: 0px;
    }
  }
  .l-footer__copyright {
    color: $footer-copy-right-color;
    font-size: 12px;
    font-family: $font;
  }
  .footer__copyright:last-child {
    margin-bottom: 12px;
  }
  .l-footer__icon-item {
    display: inline-block;
    margin-right: 20px;
  }
  .l-footer__icon-link {
    display: block;
    width: 45px;
    height: 45px;
    line-height: 40px;
    border: 1px solid $footer-text-color;
    border-radius: 50%;
    font-size: 20px;
    color: $footer-text-color;
    opacity: .5;
    transition: .2s opacity ease-out;
  }
  .l-footer__icon-list {
    list-style: none;
    padding: 0;
    margin: 0;
    text-align: center;
    margin-bottom: 20px;
    float: right;
  }
  .flex-container {
  	display: flex;
  	@include for-size (sm-only) {
  	 flex-direction: column;
  	 margin-left: auto;
    }
    @include for-size (tablet) {
      margin-lef: 0;
    }
  	padding: 0 0.66667rem;
  	max-width: 80rem;
    margin-right: auto;
    .div-one {
    	width: 65%;
    	@include for-size (sm-only) {
	      width: 100%;
      }
    }
    .div-two {
    	width: 35%;
    	@include for-size (sm-only) {
	      width: 100%;
      }
    }
  }
  .linked-in-image{
    padding-left: 5px;
    padding-top: 5px;
  }  
  .l-footer__security {
    margin-bottom: 15px;
  }
  .text-center {
  	text-align: center;
  }
  a img {
    border: 0; 
  }
	img {
    max-width: 100%;
    height: auto;
    -ms-interpolation-mode: bicubic;
    display: inline-block;
    vertical-align: middle;
	}
  p {
    margin-bottom: 0.5em;
    line-height: 1.6;
    text-rendering: optimizeLegibility;
  }
  li {
    font-size: inherit;
    margin: 0;
    padding: 0;
  }
</style>