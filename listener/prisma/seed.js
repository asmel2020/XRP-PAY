const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()
const ethers = require('ethers');


async function main() {
  const Mnemonic = 'remove scheme silver sugar text circle salt manage long little sword amount';

  const wallets = ethers.Mnemonic.fromPhrase(Mnemonic);

  let address= [];

  for (let index = 0; index < 999; index++) {
    let wallet = ethers.HDNodeWallet.fromMnemonic(
      wallets,
      `m/44'/60'/0'/0/${index}`,
    );
    address.push({address: wallet.address,path: wallet.path});
  }

  await prisma.address.createMany({
    data: address,
    skipDuplicates: true,
  });

  
 
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
