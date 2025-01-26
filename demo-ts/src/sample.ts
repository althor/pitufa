//IIFE
export const p = new Promise(() => {});
const z = await p;
const msg: string = 'Soy TS';
const userName = 'Pepe';
console.log(userName, msg, z);
