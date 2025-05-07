interface CurrencyConvertResponse {
    success: boolean;
    error?: {
      code:""
    },
    terms: string;
    privacy: string;
    query: {
      from: string;
      to: string;
      amount: number;
    };
    info: {
      timestamp: number;
      quote: number;
    };
    result: number;
}

export default CurrencyConvertResponse;