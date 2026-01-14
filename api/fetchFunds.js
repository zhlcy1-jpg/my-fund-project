export default async function handler(req, res) {
  // 這是目前最穩定的 Morningstar 接口網址格式
  const apiUrl = "https://lt.morningstar.com/api/rest.svc/klr5run9sn/security/realtime/f00000v9zp";
  
  // 將參數分開，確保編碼正確
  const queryParams = new URLSearchParams({
    "instid": "OCBCMACAU",
    "id": "F00000V9ZP",
    "currencyId": "USD",
    "pageSize": "500",
    "page": "1",
    "sortOrder": "Name ASC"
  }).toString();

  const finalUrl = `${apiUrl}?${queryParams}`;
  
  try {
    const response = await fetch(finalUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json, text/plain, */*',
        'Referer': 'https://www.ocbc.com.mo/',
        'Origin': 'https://www.ocbc.com.mo'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ 
        error: "銀行端拒絕連線", 
        status: response.status 
      });
    }

    const data = await response.json();

    // 設置允許 Excel 跨域
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // 華僑銀行的數據結構通常在 data.rows 或直接在 rows 裡
    const funds = data.rows || data || [];
    
    return res.status(200).json(funds);
    
  } catch (error) {
    return res.status(500).json({ 
      error: "雲端解析出錯", 
      message: error.message 
    });
  }
}