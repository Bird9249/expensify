import Big from 'big.js';

export default (spend: Big.BigSource, amount: Big.BigSource) => {
  const result = new Big(spend).div(new Big(amount));

  return result.mul(new Big(100)).toString();
};
