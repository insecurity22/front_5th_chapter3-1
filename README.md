# 7주차 테스트 과제

## 난이도 선택 가이드

### Easy

- https://github.com/hanghae-plus/front_5th_chapter3-1/tree/easy
- 테스트를 처음 작성해보시는 분들을 위한 과제입니다. 가벼운 유틸함수, 훅 기반 단위 테스트를 작성해보면서 컴포넌트를 개선해보세요.
- 모든 테스트케이스, 설정이 제공됩니다.
- 작성을 해보고 피어 리뷰와 멘토들의 피드백을 받아보세요!
- **하지만, 모두 통과를 하더라도 합격을 받을 수는 없습니다. 가능하면 이 난이도를 선택하지 마세요**

### Medium

- https://github.com/hanghae-plus/front_5th_chapter3-1/tree/medium
- Easy에 비해 추가로 작성할 여러 통합 테스트가 존재합니다.
- PR template에 있는 여러 질문에 답을 해보면서 문제를 풀어보세요
- **Best가 불가능합니다**

### Hard

- https://github.com/hanghae-plus/front_5th_chapter3-1/tree/hard
- Medium과 동일한 TC를 작성하지만, 과제를 작성하기 위한 여러가지 설정을 제공드리지 않습니다.
- PR template에 있는 여러 질문에 답을 해보면서 문제를 풀어보세요!
- **적절하게 목적에 맞게 작성하셨을 경우 Best가 가능합니다.**

## 7주차 과제 체크포인트

> 난이도에 맞는 템플릿을 선택해서 작성해주세요!

### 기본 과제

#### Easy

- [x] 총 8개의 파일, 90개의 단위 테스트를 무사히 작성하고 통과시킨다.

### 심화 과제

- [ ] App 컴포넌트 적절한 단위의 컴포넌트, 훅, 유틸 함수로 분리했는가?
- [x] 해당 모듈들에 대한 적절한 테스트를 5개 이상 작성했는가?

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 기술적 성장

<!-- 예시
- 새로 학습한 개념
- 기존 지식의 재발견/심화
- 구현 과정에서의 기술적 도전과 해결
-->

### 코드 품질

<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

### 학습 효과 분석

<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->

### 과제 피드백

<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->

## 리뷰 받고 싶은 내용

<!--
피드백 받고 싶은 내용을 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 요청의 예시)
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 요청의 예시)
- 현재 함수와 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수를 더 명확하게 이름 지을 수 있는 방법에 대해 조언해주실 수 있나요?
- 현재 파일 단위로 코드가 분리되어 있지만, 모듈화나 계층화가 부족한 것 같습니다. 어떤 기준으로 클래스를 분리하거나 모듈화를 진행하면 유지보수에 도움이 될까요?
- MVC 패턴을 따르려고 했는데, 제가 구현한 구조가 MVC 원칙에 맞게 잘 구성되었는지 검토해주시고, 보완할 부분을 제안해주실 수 있을까요?
- 컴포넌트 간의 의존성이 높아져서 테스트하기 어려운 상황입니다. 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?
-->

# Medium

## 7주차 과제 체크포인트

### 기본과제

#### Medium

- [ ] 총 11개의 파일, 115개의 단위 테스트를 무사히 작성하고 통과시킨다.

#### 질문

> Q. medium.useEventOperations.spec.tsx > 아래 toastFn과 mock과 이 fn은 무엇을 해줄까요?

> Q. medium.integration.spec.tsx > 여기서 ChakraProvider로 묶어주는 동작은 의미있을까요? 있다면 어떤 의미일까요?

> Q. handlersUtils > 아래 여러가지 use 함수는 어떤 역할을 할까요? 어떻게 사용될 수 있을까요?

> Q. setupTests.ts > 왜 이 시간을 설정해주는 걸까요?

### 심화 과제

- [ ] App 컴포넌트 적절한 단위의 컴포넌트, 훅, 유틸 함수로 분리했는가?
- [ ] 해당 모듈들에 대한 적절한 테스트를 5개 이상 작성했는가?

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 기술적 성장

<!-- 예시
- 새로 학습한 개념
- 기존 지식의 재발견/심화
- 구현 과정에서의 기술적 도전과 해결
-->

### 코드 품질

<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

### 학습 효과 분석

<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->

### 과제 피드백

<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->

## 리뷰 받고 싶은 내용

<!--
피드백 받고 싶은 내용을 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 요청의 예시)
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 요청의 예시)
- 현재 함수와 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수를 더 명확하게 이름 지을 수 있는 방법에 대해 조언해주실 수 있나요?
- 현재 파일 단위로 코드가 분리되어 있지만, 모듈화나 계층화가 부족한 것 같습니다. 어떤 기준으로 클래스를 분리하거나 모듈화를 진행하면 유지보수에 도움이 될까요?
- MVC 패턴을 따르려고 했는데, 제가 구현한 구조가 MVC 원칙에 맞게 잘 구성되었는지 검토해주시고, 보완할 부분을 제안해주실 수 있을까요?
- 컴포넌트 간의 의존성이 높아져서 테스트하기 어려운 상황입니다. 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?
-->

# HARD

## 7주차 과제 체크포인트

### 기본과제

- [ ] 총 11개의 파일, 115개의 단위 테스트를 무사히 작성하고 통과시킨다.

#### 질문

> Q. handlersUtils에 남긴 질문에 답변해주세요.

> Q. 테스트를 독립적으로 구동시키기 위해 작성했던 설정들을 소개해주세요.

### 심화 과제

- [ ] App 컴포넌트 적절한 단위의 컴포넌트, 훅, 유틸 함수로 분리했는가?
- [ ] 해당 모듈들에 대한 적절한 테스트를 5개 이상 작성했는가?

## 과제 셀프회고

<!-- 과제에 대한 회고를 작성해주세요 -->

### 기술적 성장

<!-- 예시
- 새로 학습한 개념
- 기존 지식의 재발견/심화
- 구현 과정에서의 기술적 도전과 해결
-->

### 코드 품질

<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

### 학습 효과 분석

<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->

### 과제 피드백

<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->

## 리뷰 받고 싶은 내용

<!--
피드백 받고 싶은 내용을 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 요청의 예시)
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 요청의 예시)
- 현재 함수와 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수를 더 명확하게 이름 지을 수 있는 방법에 대해 조언해주실 수 있나요?
- 현재 파일 단위로 코드가 분리되어 있지만, 모듈화나 계층화가 부족한 것 같습니다. 어떤 기준으로 클래스를 분리하거나 모듈화를 진행하면 유지보수에 도움이 될까요?
- MVC 패턴을 따르려고 했는데, 제가 구현한 구조가 MVC 원칙에 맞게 잘 구성되었는지 검토해주시고, 보완할 부분을 제안해주실 수 있을까요?
- 컴포넌트 간의 의존성이 높아져서 테스트하기 어려운 상황입니다. 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?
-->
