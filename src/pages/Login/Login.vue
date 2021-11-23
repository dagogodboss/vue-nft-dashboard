<template>
  <div class="auth-page">
    <b-container>
      <h5 class="auth-logo">
        <i class="fa fa-circle text-primary"></i>
        RTFKT CRM 
        <i class="fa fa-circle text-danger"></i>
      </h5>
      <Widget style="
    height: 50vh;
    background: antiquewhite;
" class="widget-auth mx-auto" title="<h3 class='mt-0'>Login to your Web App</h3>" customHeader>
        <p class="widget-auth-info">
            Connect your wallet to use the Dashboard.
        </p>
        <form class="mt" @submit.prevent="login">
          <b-alert class="alert-sm" variant="danger" :show="!!errorMessage">
            {{errorMessage}}
          </b-alert>
          <b-button type="button" @click="connectWeb3Modal" size="lg" class="auth-btn mb-3" variant="inverse">Connect Wallet</b-button>
        </form>
      </Widget>
    </b-container>
    <footer class="auth-footer">
      2019 &copy; RTFKT CRM
    </footer>
  </div>
</template>

<script>
import Widget from '@/components/Widget/Widget';
import { createNamespacedHelpers } from 'vuex';
const { mapGetters, mapActions } = createNamespacedHelpers('accounts');

export default {
  name: 'LoginPage',
  components: { Widget },
  data() {
    return {
      errorMessage: null
    };
  },
 
  methods: {
    ...mapActions( ["connectWeb3Modal"]),   
  },
  computed: {
    ...mapGetters(["getChainName", "isUserConnected", "getWeb3Modal"]),
    
    showChainAlert() {
      switch (this.getChainName) {
        case "Mainnet":
          return false;
        default:
          return true;
      }
    }
   
  
  }, 

 mounted() {
    // callGetters(){
    //   return this.$store.getters
    // }
    return this.$store.dispatch("accounts/initWeb3Modal") , this.$store.dispatch("accounts/ethereumListener");
    
     
  
  },

  beforeRouteEnter(to, from, next) {
     if(window.localStorage.getItem("authenticated") === 'true'){
       next('/app/dashboard')
     }
     else{
       next()
     }
   } 
}; 
</script>
