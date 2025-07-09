# 📅 Workshop Reservation System | 워크숍 예약 시스템

A simple workshop reservation app built with React.  
React로 만든 간단한 워크숍 예약 시스템입니다.

---

## 🌐 Features | 주요 기능

- Multi-language support (English & Korean)  
  다국어 지원 (영어 / 한국어)
- User can select from available workshops and make a reservation  
  사용자가 워크숍 목록에서 선택 후 예약 가능
- Admin mode with password-protected slot management  
  관리자 모드에서 비밀번호 입력 후 슬롯 추가/삭제 가능
- LocalStorage-based data persistence  
  로컬 스토리지 기반 데이터 저장 (브라우저 새로고침에도 유지됨)
- Responsive design  
  반응형 디자인

---

## 🚀 How to Use | 사용법

### 🧑‍🎨 User Mode (default) | 사용자 모드 (기본)

1. Visit the app
2. Click on a workshop to view details
3. Click **Reserve This Workshop**
4. Fill out the form and submit

1. 앱 접속  
2. 원하는 워크숍 클릭 → 상세보기  
3. `Reserve This Workshop` 클릭  
4. 폼 작성 후 제출

### 🛠 Admin Mode | 관리자 모드

1. Click `Admin Mode`
2. Enter password (`3931`)
3. Add new slots (title, date, time, description, optional image)
4. Delete existing slots if needed

1. `Admin Mode` 클릭  
2. 비밀번호 입력 (`3931`)  
3. 새로운 워크숍 슬롯 추가  
4. 필요 시 기존 슬롯 삭제

---

## 📦 Setup | 설치 방법

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
npm install
npm run dev
