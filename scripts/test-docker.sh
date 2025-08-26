#!/bin/bash

# Docker 컨테이너 테스트 스크립트

echo "🚀 Docker 컨테이너 빌드 및 테스트 시작..."

# 기존 컨테이너 정리
echo "📦 기존 컨테이너 정리 중..."
docker-compose down --remove-orphans

# 이미지 빌드
echo "🔨 Docker 이미지 빌드 중..."
docker-compose build --no-cache

# 컨테이너 실행
echo "▶️  컨테이너 실행 중..."
docker-compose up -d

# 컨테이너 상태 확인
echo "📊 컨테이너 상태 확인..."
docker-compose ps

# 서비스 헬스 체크
echo "🔍 서비스 헬스 체크..."
sleep 10

echo "웹 앱 상태:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 || echo "웹 앱 연결 실패"

echo ""
echo "관리자 앱 상태:"
curl -s -o /dev/null -w "%{http_code}" http://localhost:3001 || echo "관리자 앱 연결 실패"

echo ""
echo "Nginx 프록시 상태:"
curl -s -o /dev/null -w "%{http_code}" http://localhost || echo "Nginx 연결 실패"

echo ""
echo "🎉 테스트 완료!"
echo "📱 접속 URL:"
echo "  - 메인 웹사이트: http://localhost"
echo "  - 관리자 대시보드: http://admin.localhost (hosts 파일 설정 필요)"
echo "  - 직접 접속:"
echo "    - 웹 앱: http://localhost:3000"
echo "    - 관리자 앱: http://localhost:3001"
