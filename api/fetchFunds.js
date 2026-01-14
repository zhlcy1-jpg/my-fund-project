import axios from 'axios';

export default async function handler(req, res) {
  // 設置網址和參數
  const apiUrl = "https://lt.morningstar.com/api/rest.svc/klr5run9sn/security/realtime/f00000v9zp";
  
  const params = {
    "instid": "OCBCMACAU",
    "id": "F00000V9ZP",
    "currencyId": "USD",
    "pageSize": 500,  // 一次性抓取 500 支基金，不需翻頁
    "page": 1,
    "sortOrder": "Name ASC"
  };

  try {
    const response = await axios.get(apiUrl, { params });
    
    // 設置瀏覽器允許跨域（方便之後 Excel 讀取）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    // 直接返回抓到的所有行數據
    res.status(200).json(response.data.rows || []);
  } catch (error) {
    console.error("抓取失敗:", error.message);
    res.status(500).json({ 
      error: "數據抓取失敗", 
      details: error.message 
    });
  }
}