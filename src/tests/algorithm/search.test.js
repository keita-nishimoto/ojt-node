const assert = require('power-assert');
const search = require('../../algorithm/search.js');

/**
 * 検索系のアルゴリズムのテストコード
 */
describe('SearchTest', () => {
  /**
   * 正常系テストケース
   * リニアサーチ（線形探索）の検索結果が意図した通りである事
   */
  it('testSuccessLinearSearch', () => {
    // 検索対象の配列
    const targetData = [1, 2, 3, 4];

    // 3を持つ配列のindexを求める
    const resultIndex = search.linearSearch(targetData, 3);

    assert.strictEqual(resultIndex, 2, '検索結果として2が表示される事を期待');
  });

  /**
   * 異常系テストケース
   * リニアサーチ（線形探索）の検索結果が見つからないケース
   */
  it('testFallLinearSearchTargetIsNotFound', () => {
    // 検索対象の配列
    const targetData = [1, 2, 3, 4];

    assert.throws(
      () => {
        // 5を持つ配列のindexを求める（存在しないのでエラーがthrowされるハズ）
        const resultIndex = search.linearSearch(targetData, 5);

        // ここに到達する事は仕様通り実装されていないのでテストを失敗させる
        assert.fail(resultIndex);
      },
      (error) => {
        assert.strictEqual(
          error.message,
          'NotFound',
          '意図したエラーメッセージが表示される事を期待',
        );

        return true;
      },
    );
  });
});
