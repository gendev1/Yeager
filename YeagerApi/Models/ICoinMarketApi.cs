namespace YeagerApi.Models
{
    public interface ICoinMarketApi
    {
        public string makeAPICall();
        string GetChainPrices(string exchange,string cryptocurrencies);
        string GetHistoricalPrices(string cryptocurrencies, string interval);
    }
}