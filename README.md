# 오픈소스 스튜디오 01분반

22300650 / 전도원

## Assignment 9. Fetch API & REST API CRUD

## Deployment

GitHub URL: https://github.com/2026-2-OSS/assign09-c01-22300650

Vercel URL: https://2026oss41.vercel.app/

MockAPI Endpoint: https://6adea7974e88f1bba4a53f94.mockapi.io/students

## Service

주제: assign05에서 만든 동아리 회원 관리 서비스, Mock API 연결

Field: id, name, studentId, gender, major, email

기능:

1. Read (GET): 페이지가 열리면 getMembers()가 fetch()로 목록을 받아 members 배열에 넣고 render()로 테이블에 표시한다ㄷ.
2. Create (POST): 입력값이 validate()를 통과하면 addMember()가 JSON.stringify()로 만든 데이터를 POST로 보내고, 성공하면 목록을 다시 불러온다.
3. Update (PUT): 수정 버튼을 누르면 Form에 기존 값을 채우고 editingId를 저장. 저장 버튼을 누르면 editMember()가 해당 id로 PUT 요청을 보낸다. 수정 취소 버튼으로 작업 취소 가능.
4. Delete (DELETE): confirm()으로 확인한 뒤 deleteMember()가 해당 id로 DELETE 요청을 보낸다.
5. Search: 검색창에 입력하면 filter()로 이름 또는 학부에 검색어가 포함된 회원만 표시.

Validation: 이름 필수 입력, 이름 2~20자, 학번 8자리 숫자, 학번 중복 확인(수정 중인 회원 제외), 성별 선택, 학부 선택, 이메일 형식(checkValidity())

요청은 async/await와 try/catch를 사용하고 response.ok를 확인한다. 실패하면 화면에 빨간색, 성공하면 초록색 메시지를 표시한다. 요청 중에는 저장 버튼을 비활성화해서 중복된 연속 요청을 막음.

## Key Learning

1. fetch()는 Promise를 반환하고, async/await를 쓰면 응답을 기다리는 코드를 위에서 아래로 읽기 쉽게 작성할 수 있다는 것을 배웠다.
2. 네트워크 오류는 fetch()가 reject해서 catch로 가지만, 404, 500 같은 HTTP 오류는 자동으로 reject하지 않기 때문에 response.ok를 직접 확인해야 한다는 것을 배웠다.
3. REST API는 리소스를 URI(/students, /students/:id)로 표현한다. GET, POST, PUT, DELETE 같은 HTTP Method로 CRUD를 구분하고, 데이터는 JSON 텍스트로 주고받는다는 것을 배웠다.

## AI / Search Usage

도구: claude

사용목적: 코드 검증 후 어떻게 수정하면 좋을지 참고 및 개념 설명

참고 또는 반영한 기능: 직접 작성한 코드의 검증, 기능 추가/수정 방향에 대한 조언

- 코드 작성 후 검토에 사용
- 수정 중인 회원을 중복 검사에서 제외하는 기능을 추가할 것을 조언 받고, 직접 추가함.
- 저장 버튼 누른 후 서버 응답 전까지 비활성화 기능 추가할 것을 조언 받고, 직접 추가함.

직접 수정한 내용: AI의 검토 의견을 참고해 필요한 부분을 직접 수정

- crud.js

배운 점:

- 정보를 수정할 때 자기 자신의 학번도 걸린다는 점을 AI 검토를 통해 알게 되었다. 그래서 editingId로 추가와 수정을 구분해서 검사해야 한다는 것을 배웠다.
- 저장 버튼을 누르면 요청이 끝날 때까지 시간이 걸리는데, 그 사이에 버튼을 여러 번 누르면 같은 POST 요청이 여러 번 가서 같은 회원이 중복으로 저장될 수 있다. 그래서 요청 시 버튼을 막고, 요청이 끝난 뒤 다시 풀어주는 것이 중요하다는 것을 알게 되었다.
- AI가 알려준 방향을 바로 붙여넣지 않고, 왜 필요한지 이해한 뒤 직접 코드를 고쳐야 나중에 설명할 수 있다는 것을 느꼈다.

본인 추정 기여율(%): 15~20%

## Problem & Solution

문제
학번 중복 확인 Validation을 추가한 뒤, 회원 정보를 수정할 때 학번은 그대로 두고 다른 값만 바꿔도 중복 문제로 저장이 되지 않았다. members 배열에서 같은 학번을 찾을 때 지금 수정하고 있는 회원 자신도 검사 대상에 포함되어 있었기 때문이다.

해결
수정 버튼을 누를 때 editingId에 수정 중인 회원의 id를 저장하고 있었기 때문에, find()로 같은 학번을 찾을 때 member.id !== editingId 조건을 추가해서 수정 중인 회원은 검사에서 제외했다. 새로 추가할 때는 editingId가 null이라 모든 회원과 비교하고, 수정할 때는 자기 자신을 뺀 나머지 회원과만 비교하게 되어 문제가 해결되었다.

## Reflection

assign05에서는 데이터를 배열에만 저장해서 새로고침하면 다 사라졌는데, 이번에는 MockAPI에 연결해서 새로고침해도 데이터가 남아 있는 것을 보고 실제 서비스처럼 만든 것 같아서 좋았다. 수정 시 학번 중복 문제와 같은 생각지도 못한 부분에서 버그가 발생할 수 있다는 것을 느꼈고, 더욱 여러 방면으로 생각하며 예외처리를 해야겠다는 생각을 했다.
