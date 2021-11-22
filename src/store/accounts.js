import Web3Modal from "web3modal";
import Web3 from "web3";
// import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Authereum from "authereum";
import router  from "../Routes"
import {abi} from "../abi/erc721"

const state = {
    activeAccount: null,
    activeBalance: 0,
    chainId: null,
    chainName: null,
    web3: null,
    isConnected: false,
    providerW3m: null, // this is "provider" from Web3Modal
    web3Modal: null,
    nfts: [],
    pagination: {
        itemPerPage: 0,
        totalItem: 0,
    },
    maxTokens:0,
    itemSetByUser : null,
    smartContract: null
    
};

const getters = {
    getActiveAccount(state) {
        if (!state.activeAccount) {
         return window.ethereum.selectedAddress;
        }
        return state.activeAccount;
    },
    getActiveBalanceWei(state) {
        return `${state.activeBalance}`;
    },
    getActiveBalanceEth(state) {
        return `${state.web3.utils.fromWei(state.activeBalance, "ether")}`;
    },
    getChainId(state) {
        return state.chainId;
    },
    getChainName(state) {
        return state.chainName;
    },
    getWeb3(state) {
        if (state.web3) {
            return state.web3;
        } else {
            return new Web3(Web3.givenProvider);
        }
    },
    getWeb3Modal(state) {
        return state.web3Modal;
    },
    isUserConnected(state) {
        return state.isConnected;
    },
    getNft(state){
        return state.nfts;
    }
};

const actions = {

    async initWeb3Modal({ commit }) {
        const providerOptions = {
            // MetaMask is enabled by default
            // Find other providers here: https://github.com/Web3Modal/web3modal/tree/master/docs/providers
            // burnerconnect: {
            //     package: BurnerConnectProvider // required
            // },
            authereum: {
                package: Authereum // required
            }
        };

        const w3mObject = new Web3Modal({
            cacheProvider: true, // optional
            providerOptions // required
        });

        // This will get deprecated soon. Setting it to false removes a warning from the console.
        window.ethereum.autoRefreshOnNetworkChange = false;

        // if the user is flagged as already connected, automatically connect back to Web3Modal
        if (localStorage.getItem('isConnected') === "true") {
            let providerW3m = await w3mObject.connect();
            commit("setIsConnected", true);
            commit("setActiveAccount", window.ethereum.selectedAddress);
            commit("setChainData", window.ethereum.chainId);
            commit("setWeb3Provider", providerW3m);
            actions.fetchActiveBalance({ commit });
        }
        commit("setWeb3ModalInstance", w3mObject);
    },

    async connectWeb3Modal({ commit }) {
        window.localStorage.setItem('authenticated', 'true');
        let providerW3m = await state.web3Modal.connect();
        commit("setIsConnected", true);
        commit("setActiveAccount", window.ethereum.selectedAddress);
        commit("setChainData", window.ethereum.chainId);
        commit("setWeb3Provider", providerW3m);
        actions.fetchActiveBalance({ commit });
        router.push('/app/dashboard');
       
    },

    async  disconnectWeb3Modal({ commit }) {
    window.localStorage.setItem('authenticated', 'false');
    if (state.providerW3m.close && state.providerW3m !== null) {
      await state.providerW3m.close();
   }
  let modalCache = await state.web3Modal.clearCachedProvider();
    commit("setIsConnected", false);
   commit("disconnectWallet");
   commit("clearModalCache", modalCache);
    router.push('/login');

    },

    async ethereumListener({ commit }) {

        window.ethereum.on('accountsChanged', (accounts) => {
            if (localStorage.getItem('isConnected')) {
                commit("setActiveAccount", accounts[0]);
                commit("setWeb3Provider", state.providerW3m);
                actions.fetchActiveBalance({ commit });
               
            }
        });

        window.ethereum.on('chainChanged', (chainId) => {
            commit("setChainData", chainId);
            commit("setWeb3Provider", state.providerW3m);
            actions.fetchActiveBalance({ commit });
        });

    },
    async removeEthereumListener({ commit }) {

        window.ethereum.removeListener('accountsChanged', (accounts) => {
            if (localStorage.getItem('isConnected')) {
                commit("setActiveAccount", accounts[0]);
                commit("setWeb3Provider", state.providerW3m);
                actions.fetchActiveBalance({ commit });
               
            }
        });

        window.ethereum.removeListener('chainChanged', (chainId) => {
            commit("setChainData", chainId);
            commit("setWeb3Provider", state.providerW3m);
            actions.fetchActiveBalance({ commit });
        });
    
    },

    async fetchActiveBalance({ commit }) {
        let balance = await state.web3.eth.getBalance(state.activeAccount);
        commit("setActiveBalance", balance);
    },
    fetchUserRefs({commit}, payload){
        commit("setSmartContract", payload.smartContractRef);
        commit("setUserItem", payload.userItemsRef)
    }
    ,
   async fetchNfts({commit}){
        const contract = await new state.web3.eth.Contract(abi, state.smartContract);
        // const contract = await new state.web3.eth.Contract(abi).at(state.smartContract)
        if(state.itemSetByUser !== null){
            commit("setItemPerPage",state.itemSetByUser)  
        }
        else{
           return state.pagination.itemPerPage
        }
        let countNFt = await contract.methods.totalSupply().call();
       if(countNFt > 0){
        commit("setMaxTokens", state.pagination.itemPerPage )
       }
       else{
        commit("setMaxTokens", countNFt)
       }
        let nftDetails = [];
          
        let name, address, nft_id;
        commit("setTotalItems",countNFt )
        for (let i = 1; i <= state.maxTokens; i++) {
            address = contract.methods.ownerOf(i).call();
            name = contract.methods.tokenURI(i).call();
            nft_id = i;
            const updatedList = await Promise.all([name, address, nft_id]);
            nftDetails.push({ nft_id: updatedList[2], address: updatedList[1], name: updatedList[0] });
        }
        commit("setNfts", nftDetails)
  

    },
};

const mutations = {

     disconnectWallet(state) {
        state.activeAccount = null;
        state.activeBalance = 0;
        state.web3 = null;
    },
    clearModalCache(state, modalCache){
        state.web3Modal = modalCache;
        state.providerW3m = null;
    },
    setActiveAccount(state, selectedAddress) {
        state.activeAccount = selectedAddress;
    },

    setActiveBalance(state, balance) {
        state.activeBalance = balance;
    },

    setChainData(state, chainId) {
        state.chainId = chainId;

        switch (chainId) {
            case "0x1":
                state.chainName = "Mainnet";
                break;
            case "0x2a":
                state.chainName = "Kovan";
                break;
            case "0x3":
                state.chainName = "Ropsten";
                break;
            case "0x4":
                state.chainName = "Rinkeby";
                break;
            case "0x5":
                state.chainName = "Goerli";
                break;
            case "0x539": // 1337 (often used on localhost)
            case "0x1691": // 5777 (default in Ganache)
            default:
                state.chainName = "Localhost";
                break;
        }
    },

    async setWeb3Provider(state, providerW3m) {
        state.providerW3m = providerW3m;
        state.web3 = new Web3(providerW3m);
    },

    setIsConnected(state, isConnected) {
        state.isConnected = isConnected;
        // add to persistent storage so that the user can be logged back in when revisiting website
        localStorage.setItem('isConnected', `${isConnected}`);
    },

    setWeb3ModalInstance(state, w3mObject) {
        state.web3Modal = w3mObject;
    },
    setNfts(state, nfts){
state.nfts = nfts;
    },  
   setItemPerPage(state,itemSetByUser){
    state.pagination.itemPerPage = itemSetByUser;
   },
   setMaxTokens(state, NFtCount){
state.maxTokens = NFtCount;
   },
   setTotalItems(state, count){
       state.pagination.totalItem = count
   },
   setUserItem(state, payload){
    state.itemSetByUser= payload
},
setSmartContract(state, payload){
    state.smartContract = payload
}
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};
