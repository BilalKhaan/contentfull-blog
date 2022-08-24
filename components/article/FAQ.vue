<template>
	<section class="l-section--filled">
		<div class="row">
			<div class="column">
				<h2 class="p-title p-title--primary p-title--spaced text-center">
        {{ faqTitle }}</h2>
		  </div>
	  </div>
		<div class="row gap">
			<div class="column">
				<div class="accordion-container">
          <div v-for="faq in faqContent">
            <div class="accordion accordion-title">{{ faq.fields.question }} </div>
            <div class="panel">
              <p>{{ faq.fields.answer }}</p>
            </div>
          </div>
        </div>  
			</div>
	  </div>			
  </section>
</template>

<script>
export default {
  props: ['faqTitle', 'faqContent'],
    
  mounted() {
      this.FAQ();
    },

   jsonld() {
    const content = this.faqContent.map((item, index) => ({
      '@type': 'Question',
      name: item.fields.question,
      acceptedAnswer :{
        "@type": "Answer",
        text: item.fields.answer
      },
    }));
    return {
      '@context': 'http://schema.org',
      '@type': 'FAQPage',
      mainEntity: content,
    };
  }, 

  methods: {
    FAQ() {
      if(process.client) {
        var acc = document.getElementsByClassName("accordion");
        var i;
        for (i = 0; i < acc.length; i++) {
          acc[i].addEventListener("click", function() {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
              panel.style.maxHeight = null;
              panel.style.display = "none";

            } else {
              panel.style.display = "block";
              panel.style.maxHeight = panel.scrollHeight + "px";
            } 
          });   
        }
      }  
    }
  }
}
</script>

<style lang="scss">
.l-section--filled {
  background-color: #fff;
  background-size: cover;
  background-position: center;
  margin: 0;
  padding: 40px 0;
}
.p-title--spaced {
  margin-bottom: 28px;
}
.p-title--primary {
  color: #3680da;
  font-size: 36px;
  @include for-size(sm-only) {
    font-size: 27px;
  }
  line-height: 1.3;
  font-family: $font;
  letter-spacing: .03333em;
  text-align: center;
}
.row {
	padding: 0 0.66667rem;
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}
.row::before, .row::after {
  content: ' ';
  display: table;
}
.row.gap {
  margin-top: -24px;
}
.row.gap>.column, .row.gap>.columns, .row.gap>.columns {
  margin-top: 24px;
}
.accordion-container {
  border: 1px solid #dae2e8;
  border-radius: 4px;
  max-width: 820px;
  margin: 0 auto;
  list-style-type: none;
  background: #fff;
}

.accordion:after {
  content: '\002B';
  color: #3680da;
  font-size: 37px;
  margin-top: -10px;
  float: right;
  margin-left: 5px;
  transform: rotate(0deg); 
  transform-origin: center;
  transition: .4s transform ease-out,.3s opacity linear,.4s -webkit-transform ease-out;
  opacity: 1;
}
.active {
  background-color: #fff;
}
.active:after {
  content: "\2212";
  transform: rotate(180deg); 
  transform-origin: center;
  transition: .4s transform ease-out,.3s opacity linear,.4s -webkit-transform ease-out;
    opacity: 1;
}
.accordion {
  background: #fff;
  border-radius: 4px;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  transition: 0.4s;
  border-bottom: 1px solid #dae2e8;
}
.accordion-title {
  font-size: 20px;
  padding: 20px 25px 20px 20px;
  line-height: 1.3;
  color: #3680da;
  font-weight: bold;
}
.accordion-title:hover, .accordion-title:focus {
  background-color: rgba(0,0,0,.03);
}
.panel {
  display: none;
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #dae2e8;
  background-color: #fff;
  color: #576977;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}
</style>