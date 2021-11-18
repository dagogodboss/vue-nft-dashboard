import { mapState } from "vuex";
import config from '../config';
export const web3Modal = {
  computed: {
    ...mapState(['web3Modal'])
  },
  active() {
    return this.web3Modal.active
  }
}
export default {
  data: () => {
    return {
      appConfig: config.app,
    }
  },
  methods: {
    decodeHtml(html) {
      let txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  }
};
