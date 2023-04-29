using System.Net;
using System.Web;

namespace YeagerApi.Models
{
    public class CoinMarketApi : ICoinMarketApi
    {
        string apiKey = "";

        public CoinMarketApi()
        {
            apiKey = DotNetEnv.Env.GetString("ApiKey");
        }
        public string makeAPICall()
        {
            var URL = new UriBuilder("https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest");

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["start"] = "1";
            queryString["limit"] = "5000";
            queryString["convert"] = "USD";

            URL.Query = queryString.ToString();

            var client = new WebClient();
            client.Headers.Add("X-CMC_PRO_API_KEY", apiKey);
            client.Headers.Add("Accepts", "application/json");
            return client.DownloadString(URL.ToString());
        }

        public string GetChainPrices(string exchange,string cryptocurrencies) {
             var URL = new UriBuilder("https://sandbox-api.coinmarketcap.com/v1/tools/price-conversion");

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["amount"] = "1";
            queryString["symbol"] = exchange;
            queryString["convert"] = cryptocurrencies;


            URL.Query = queryString.ToString();

            var client = new WebClient();
            client.Headers.Add("X-CMC_PRO_API_KEY", apiKey);
            client.Headers.Add("Accepts", "application/json");
            return client.DownloadString(URL.ToString());
        }

        public string GetHistoricalPrices(string cryptocurrencies, string interval) {
             var URL = new UriBuilder("https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical");

            var queryString = HttpUtility.ParseQueryString(string.Empty);
            queryString["symbol"] = cryptocurrencies;
            queryString["interval"] = interval;
            queryString["count"] = "10";


            URL.Query = queryString.ToString();

            var client = new WebClient();
            client.Headers.Add("X-CMC_PRO_API_KEY", apiKey);
            client.Headers.Add("Accepts", "application/json");
            return client.DownloadString(URL.ToString());
        }

        
    }

}