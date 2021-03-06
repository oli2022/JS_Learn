const citySelect = document.querySelector(".citySelect");
const send = document.querySelector(".send");
const list = document.querySelector(".list");
send.addEventListener("click", function (e) {
    const city = citySelect.value;
    axios
        .get(
            `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity/${city}?%24format=JSON`,
            {
                headers: getAuthorizationHeader(),
            }
        )
        .then(function (response) {
            const thisData = response.data;
            console.log(thisData);
            let str = "";
            thisData.forEach(function (item) {
                //const startTime = item.StartTime.substr(0,10);
                //const endTime = item.EndTime.substr(0,10);
                //const updateTime = item.UpdateTime.substr(0,10);
                const startTime = +new Date(item.StartTime);
                const endTime = +new Date(item.EndTime);
                const updateTime = +new Date(item.UpdateTime);
                if (updateTime > startTime && updateTime < endTime) {
                    str += `<li><h2>${item.ActivityName}</h2><p>(開始 )${startTime}</p><p>(結束 )${endTime}</p>
                </li>`;
                } 
            });
            list.innerHTML = str;
        });
});

function getAuthorizationHeader() {
    //  填入自己 ID、KEY 開始
    let AppID = "28be96d18851420bb6b4b4aa24cad688";
    let AppKey = "iWJAHpLr1GPxGtPLvPWRxCuIDnI";
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA("SHA-1", "TEXT");
    ShaObj.setHMACKey(AppKey, "TEXT");
    ShaObj.update("x-date: " + GMTString);
    let HMAC = ShaObj.getHMAC("B64");
    let Authorization =
        'hmac username="' +
        AppID +
        '", algorithm="hmac-sha1", headers="x-date", signature="' +
        HMAC +
        '"';
    return { Authorization: Authorization, "X-Date": GMTString };
}
