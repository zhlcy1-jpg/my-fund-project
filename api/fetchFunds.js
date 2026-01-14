import axios from 'axios';

export default async function handler(req, res) {
    // 這是華僑銀行後台數據庫的真實地址
    const apiUrl = "https://lt.morningstar.com/api/rest.svc/klr5run9sn/security/realtime/f00000v9zp";
    
    // 這是給數據庫的指令：我要 USD 貨幣，而且一次要 500 條
    const config = {
        params: {
            "instid": "OCBCMACAU",
            "id": "F00000V9ZP",
            "currencyId": "USD",
            "pageSize": 500,
            "page": 1,
            "sortOrder": "Name ASC"
        }
    };

    try {
        console.log("正在從 Morningstar 抓取數據...");
        const response = await axios.get(apiUrl, config);
        
        // 成功時，把數據傳回給你的瀏覽器
        res.status(200).json({
            status: "success",
            count: response.data.rows ? response.data.rows.length : 0,
            data: response.data.rows
        });
    } catch (error) {
        // 失敗時，顯示原因
        console.error("抓取失敗:", error.message);
        res.status(500).json({ 
            status: "error", 
            message: "無法獲取數據，請檢查 API 地址或網路" 
        });
    }
}