import { PrismaClient } from '@prisma/client';
import { ethers } from 'ethers';
import * as bcrypt from 'bcrypt';
const prisma = new PrismaClient();

async function main() {
  const Mnemonic =
    'remove scheme silver sugar text circle salt manage long little sword amount';

  const wallets = ethers.Mnemonic.fromPhrase(Mnemonic);

  let address: any[] = [];

  for (let index = 0; index < 10; index++) {
    let wallet = ethers.HDNodeWallet.fromMnemonic(
      wallets,
      `m/44'/60'/0'/0/${index}`,
    );

    address.push({
      address: wallet.address,
      path: wallet.path,
    });
  }
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
