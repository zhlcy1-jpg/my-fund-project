// api/fetchFunds.js
import axios from 'axios';

export default async function handler(req, res) {
  // 華僑銀行底層 Morningstar API 網址 (已優化參數：一次請求 500 條)
  const apiUrl = "https://lt.morningstar.com/api/rest.svc/klr5run9sn/security/realtime/f00000v9zp";
  
  const params = {
    "instid": "OCBCMACAU",
    "id": "F00000V9ZP", // 這裡可以根據不同幣種更換 ID
    "currencyId": "USD",
    "pageSize": 500,    // 關鍵：直接要 500 條，繞過翻頁
    "page": 1,
    "sortOrder": "Name ASC"
  };

  try {
    const response = await axios.get(apiUrl, { params });
    const data = response.data;
    
    // 這裡可以加入 AI 處理邏輯 (例如調用 OpenAI API)
    
    res.status(200).json({
      status: "success",
      count: data.rows.length,
      timestamp: new Date().toISOString(),
      funds: data.rows
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
}