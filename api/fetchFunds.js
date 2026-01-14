import axios from 'axios';

export default async function handler(req, res) {
  const apiUrl = "https://lt.morningstar.com/api/rest.svc/klr5run9sn/security/realtime/f00000v9zp";
  
  try {
    const response = await axios.get(apiUrl, {
      params: {
        "instid": "OCBCMACAU",
        "id": "F00000V9ZP",
        "currencyId": "USD",
        "pageSize": 500,
        "page": 1,
        "sortOrder": "Name ASC"
      },
      // 關鍵步驟：加入 Header 偽裝成普通 Chrome 瀏覽器
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'application/json',
        'Referer': 'https://www.ocbc.com.mo/'
      },
      timeout: 10000 // 設置 10 秒超時，防止伺服器卡死
    });

    // 允許 Excel 跨域讀取
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response.data.rows || []);
    
  } catch (error) {
    console.error("抓取出錯:", error.message);
    res.status(500).json({ 
      error: "伺服器暫時無法讀取數據", 
      details: error.message 
    });
  }
}