export default async function handler(req, res) {
  // 這是華僑銀行目前官網使用的最新數據接口
  const apiUrl = "https://lt.morningstar.com/api/rest.svc/klr5run9sn/security/realtime/f00000v9zp?instid=OCBCMACAU&id=F00000V9ZP&currencyId=USD&pageSize=500&page=1&sortOrder=Name%20ASC";
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': '*/*',
        'Origin': 'https://www.ocbc.com.mo',
        'Referer': 'https://www.ocbc.com.mo/'
      }
    });

    if (!response.ok) {
        // 如果還是 404，我們輸出具體的網址方便調試
        throw new Error(`銀行接口狀態異常: ${response.status}`);
    }

    const data = await response.json();

    // 設置允許跨域，方便 Excel 讀取
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // 直接返回基金列表數據
    return res.status(200).json(data.rows || []);
    
  } catch (error) {
    return res.status(500).json({ 
      error: "抓取失敗", 
      message: error.message 
    });
  }
}