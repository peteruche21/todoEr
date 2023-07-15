import * as eth from "@polybase/eth";

const encrypt = async (data: string) => {
  const accounts = await eth.requestAccounts();
  const encryptedValue = await eth.encrypt(data, accounts[0]);
  return encryptedValue;
};

const decrypt = async (data: string) => {
  const accounts = await eth.requestAccounts();
  const decryptedValue = await eth.decrypt(data, accounts[0]);
  return decryptedValue;
};

export { encrypt, decrypt };
