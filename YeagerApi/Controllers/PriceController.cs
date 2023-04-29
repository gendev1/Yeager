using Microsoft.AspNetCore.Mvc;
using YeagerApi.Models;

namespace YeagerApi.Controllers;

[ApiController]
[Route("[controller]")]
public class PriceController : ControllerBase
{
    private readonly ICoinMarketApi _coinMarketApi;

    private readonly ILogger<PriceController> _logger;

    public PriceController(ILogger<PriceController> logger, ICoinMarketApi coinMarketApi)
    {
        _logger = logger;
        _coinMarketApi = coinMarketApi;
    }

    [HttpGet(Name = "GetPrices")]
    public string GetPrices()
    {
        return _coinMarketApi.makeAPICall();
    }

    [HttpGet("GetExchangePrice")]
    public string GetExchangePrice(string exchange, string cryptocurrencies)
    {
        return _coinMarketApi.GetChainPrices(exchange,cryptocurrencies);
    }
    [HttpGet("GetHistoricalPrices")]
    public string GetHistoricalPrices(string cryptocurrencies, string interval)
    {
        return _coinMarketApi.GetHistoricalPrices(cryptocurrencies,interval);
    }
    
}