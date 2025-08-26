import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { formatDate, formatCurrency } from "@repo/shared/utils";

export default function Home() {
  const currentDate = new Date();
  const sampleAmount = 50000;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            웹 애플리케이션
          </h1>
          <p className="text-xl text-gray-600">
            Turborepo 모노레포 - 메인 웹사이트
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card title="공통 컴포넌트 예시" padding="lg">
            <p className="text-gray-600 mb-4">
              이 카드는 @repo/ui 패키지의 공통 컴포넌트입니다.
            </p>
            <div className="space-y-3">
              <Button variant="primary" size="md">
                Primary 버튼
              </Button>
              <Button variant="secondary" size="md">
                Secondary 버튼
              </Button>
              <Button variant="outline" size="md">
                Outline 버튼
              </Button>
            </div>
          </Card>

          <Card title="공통 유틸리티 예시" padding="lg">
            <p className="text-gray-600 mb-4">
              @repo/shared 패키지의 유틸리티 함수들을 사용한 예시입니다.
            </p>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>현재 날짜:</strong> {formatDate(currentDate)}
              </p>
              <p className="text-sm">
                <strong>가격 포맷:</strong> {formatCurrency(sampleAmount)}
              </p>
            </div>
          </Card>
        </div>

        <Card title="프로젝트 정보" className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">웹 앱</h3>
              <p className="text-gray-600 text-sm">
                메인 웹사이트 (포트 3000)
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">관리자 앱</h3>
              <p className="text-gray-600 text-sm">
                관리자 대시보드 (포트 3001)
              </p>
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg mb-2">공통 패키지</h3>
              <p className="text-gray-600 text-sm">
                UI 컴포넌트 및 유틸리티
              </p>
            </div>
          </div>
        </Card>

        <div className="text-center">
          <p className="text-gray-500 text-sm">
            이 프로젝트는 Turborepo를 사용한 모노레포 구조로 구성되어 있습니다.
          </p>
        </div>
      </div>
    </div>
  );
}
