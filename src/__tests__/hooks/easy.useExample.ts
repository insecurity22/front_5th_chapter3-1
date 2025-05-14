// 테스트 패턴
// 1. AAA(Arrange-Act-Assert)
// - 단위 테스트(코드 흐름 중심)
// 1) Arrange: 준비
// 2) Act: 실행
// 3) Assert: 검증

// 2. GWT(Given-When-Then)
// - 시나리오 중심(BDD(Behavior Driven Development), 시나리오 기반 테스트)
// 1) Given: 조건
// 2) When: 행동
// 3) Then: 결과 기대

it('테스트 예시', () => {
  const a = 1;
  const b = 2;

  const result = a + b;

  expect(result).toBe(3);
});
