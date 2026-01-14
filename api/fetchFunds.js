export default async function handler(req, res) {
  // 華僑銀行底層數據地址
  const apiUrl = "https://lt.morningstar.com/api/rest.svc/klr5run9sn/security/realtime/f00000v9zp?instid=OCBCMACAU&id=F00000V9ZP&currencyId=USD&pageSize=500&page=1";
  
  try {
    // 使用內置 fetch，不需要安裝任何東西
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`銀行伺服器回應錯誤: ${response.status}`);
    }

    const data = await response.json();

    // 設置允許 Excel 讀取
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // 返回數據
    return res.status(200).json(data.rows || []);
    
  } catch (error) {
    return res.status(500).json({ 
      error: "抓取失敗", 
      message: error.message 
    });
  }
}