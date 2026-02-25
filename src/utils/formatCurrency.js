export const formatToNaira = (priceScents, rate = 1500) => {
  const usd = priceScents ? priceScents / 100 : 0;
  const ngn = usd * rate;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(ngn);
};