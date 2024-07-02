export const getQuote = async (
  srcChainId,
  fromTokenAddress,
  amount,
  destChainId,
  toTokenAddress
) => {
  const url = new URL("https://open-api.xy.finance/v1/quote");
  url.searchParams.append("srcChainId", srcChainId);
  url.searchParams.append("fromTokenAddress", fromTokenAddress);
  url.searchParams.append("amount", amount);
  url.searchParams.append("destChainId", destChainId);
  url.searchParams.append("toTokenAddress", toTokenAddress);

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error fetching quote:", error);
    return error
  }
};
