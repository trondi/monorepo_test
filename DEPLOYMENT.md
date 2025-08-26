# 배포 가이드

이 문서는 Turborepo 모노레포 프로젝트의 Docker 컨테이너 배포 방법을 설명합니다.

## 🚀 배포 방법별 가이드

### 1. 로컬 Docker 테스트

#### 방법 1: Docker Compose 사용 (권장)

```bash
# 모든 서비스 실행
docker-compose up -d

# 로그 확인
docker-compose logs -f

# 서비스 중지
docker-compose down
```

#### 방법 2: 개별 컨테이너 실행

```bash
# 웹 앱 빌드 및 실행
docker build -f apps/web/Dockerfile -t web-app .
docker run -d -p 3000:3000 --name web-app web-app

# 관리자 앱 빌드 및 실행
docker build -f apps/admin/Dockerfile -t admin-app .
docker run -d -p 3001:3001 --name admin-app admin-app
```

#### 테스트 스크립트 실행

```bash
./scripts/test-docker.sh
```

### 2. 접속 URL 설정

#### 로컬 테스트 환경

- **메인 웹사이트**: http://localhost 또는 http://localhost:3000
- **관리자 대시보드**: http://admin.localhost (hosts 파일 설정 필요) 또는 http://localhost:3001

#### hosts 파일 설정 (로컬 테스트용)

**macOS/Linux:**
```bash
sudo echo "127.0.0.1 admin.localhost" >> /etc/hosts
```

**Windows:**
```
# C:\Windows\System32\drivers\etc\hosts 파일에 추가
127.0.0.1 admin.localhost
```

### 3. 프로덕션 배포

#### GitHub Actions 자동 배포

1. **Secrets 설정** (GitHub Repository Settings → Secrets)
   ```
   TURBO_TOKEN: (선택사항) Turborepo 원격 캐시
   TURBO_TEAM: (선택사항) Turborepo 팀명
   ```

2. **코드 푸시**
   ```bash
   git add .
   git commit -m "Deploy to production"
   git push origin main
   ```

3. **배포 확인**
   - GitHub Actions 탭에서 배포 상태 확인
   - 변경된 앱만 자동으로 빌드 및 배포됨

#### Docker 이미지 직접 배포

```bash
# GitHub Container Registry에서 이미지 pull
docker pull ghcr.io/your-username/your-repo/web:latest
docker pull ghcr.io/your-username/your-repo/admin:latest

# 컨테이너 실행
docker run -d -p 3000:3000 ghcr.io/your-username/your-repo/web:latest
docker run -d -p 3001:3001 ghcr.io/your-username/your-repo/admin:latest
```

### 4. Kubernetes 배포

#### 사전 준비

1. **이미지 레지스트리 설정**
   ```bash
   # k8s 설정 파일에서 이미지 경로 수정
   # ghcr.io/your-username/your-repo/web:latest
   # ghcr.io/your-username/your-repo/admin:latest
   ```

2. **도메인 및 SSL 인증서 준비**

#### 배포 실행

```bash
# 웹 앱 배포
kubectl apply -f k8s/web-deployment.yaml

# 관리자 앱 배포
kubectl apply -f k8s/admin-deployment.yaml

# 배포 상태 확인
kubectl get pods
kubectl get services
kubectl get ingress
```

#### URL 접속

- **메인 웹사이트**: https://www.example.com, https://example.com
- **관리자 대시보드**: https://admin.example.com

### 5. 환경별 URL 설정 예시

#### 개발 환경
```
Web App: http://localhost:3000
Admin App: http://localhost:3001
```

#### 스테이징 환경
```
Web App: https://staging.example.com
Admin App: https://admin-staging.example.com
```

#### 프로덕션 환경
```
Web App: https://www.example.com
Admin App: https://admin.example.com
```

## 🔧 설정 파일 커스터마이징

### Nginx 설정 수정

`nginx.conf` 파일에서 도메인명을 실제 도메인으로 변경:

```nginx
server_name www.yoursite.com yoursite.com;  # 메인 사이트
server_name admin.yoursite.com;             # 관리자 사이트
```

### Kubernetes Ingress 수정

`k8s/*.yaml` 파일에서 호스트명 변경:

```yaml
spec:
  rules:
  - host: www.yoursite.com  # 실제 도메인으로 변경
```

### 환경 변수 설정

각 앱의 환경 변수는 다음 방법으로 설정:

1. **Docker Compose**: `docker-compose.yml`의 `environment` 섹션
2. **Kubernetes**: ConfigMap 또는 Secret 사용
3. **직접 실행**: `-e` 플래그 사용

```bash
docker run -e NODE_ENV=production -e API_URL=https://api.example.com web-app
```

## 🔍 트러블슈팅

### 컨테이너가 시작되지 않는 경우

```bash
# 로그 확인
docker logs container-name

# 컨테이너 내부 접속
docker exec -it container-name sh
```

### 네트워크 연결 문제

```bash
# 포트 사용 확인
netstat -tulpn | grep :3000
netstat -tulpn | grep :3001

# 방화벽 설정 확인 (Linux)
sudo ufw status
```

### SSL/TLS 인증서 문제

```bash
# Let's Encrypt 인증서 발급 (cert-manager 사용)
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.8.0/cert-manager.yaml
```

## 📊 모니터링

### 헬스 체크

각 앱에 헬스 체크 엔드포인트 추가:

```javascript
// apps/web/src/app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

### 로그 수집

```bash
# Docker 로그
docker logs -f container-name

# Kubernetes 로그
kubectl logs -f deployment/web-app
```

이제 각각 다른 URL로 접속할 수 있는 완전한 배포 환경이 구성되었습니다! 🎉
