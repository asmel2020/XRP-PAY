export default () => ({
    port: parseInt(process.env.PORT, 10) || 8000,
    jwt:{
        secret: process.env.JWT_SECRET,
        expireIn: process.env.JWT_EXPIRES_IN,
    },
    web3:{
        provider:process.env.PROVIDER || 'http://127.0.0.1:7545',
        phraseHdWallet:process.env.PHRASE_HD_WALLET,
        masterAddress:process.env.MASTER_ADDRESS
    }
  });