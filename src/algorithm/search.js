/**
 * リニアサーチ（線形探索）を行う（検索対象が存在する配列のindexを返す）
 * 多分一番簡単なアルゴリズム
 *
 * @param targetData
 * @param searchNumber
 * @returns {number}
 */
exports.linearSearch = (targetData, searchNumber) => {
  // 普通に配列を順番にループしておく
  const dataLength = targetData.length;

  for (let i = 0; i < dataLength; i += 1) {
    if (targetData[i] === searchNumber) {
      // 検索対象が存在する配列のindexを返す
      return i;
    }
  }

  throw new Error('NotFound');
};

