(() => {
  /**
   * 数値が2桁なら0埋めする
   *
   * @param value
   * @returns {string | number}
   */
  const mightZeroPadding = (value) => {
    if (value < 10) {
      return `${0}${value}`;
    }

    return value;
  };

  /**
   * 時計のロジック
   */
  const clock = () => {
    const weeks = [
      'Sun',
      'Mon',
      'Thu',
      'Wed',
      'Thr',
      'Fri',
      'Sat',
    ];

    const nowDate = new Date();

    const year = nowDate.getFullYear();
    const month = mightZeroPadding(nowDate.getMonth() + 1);
    const day = mightZeroPadding(nowDate.getDate());
    const week = weeks[nowDate.getDay()];
    const hour = mightZeroPadding(nowDate.getHours());
    const minute = mightZeroPadding(nowDate.getMinutes());
    const second = mightZeroPadding(nowDate.getSeconds());

    document.getElementById('clockDate').innerHTML = `日時: ${year}-${month}-${day}(${week})`;
    document.getElementById('clockTime').innerHTML = `時刻: ${hour}:${minute}:${second}`;
  };

  setInterval(clock, 1000);
})();
