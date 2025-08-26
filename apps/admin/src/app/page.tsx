import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { formatDate } from "@repo/shared/utils";
import type { User } from "@repo/shared/types";

// 샘플 데이터
const sampleUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    name: "관리자",
    role: "admin",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    email: "user1@example.com",
    name: "사용자 1",
    role: "user",
    createdAt: new Date("2024-01-10"),
    updatedAt: new Date("2024-01-20"),
  },
  {
    id: "3",
    email: "user2@example.com",
    name: "사용자 2",
    role: "user",
    createdAt: new Date("2024-01-15"),
    updatedAt: new Date("2024-01-25"),
  },
];

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                관리자 대시보드
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                설정
              </Button>
              <Button variant="primary" size="sm">
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 통계 카드들 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="총 사용자 수" padding="md">
            <div className="text-3xl font-bold text-blue-600">
              {sampleUsers.length}
            </div>
            <p className="text-gray-500 text-sm mt-1">전체 등록된 사용자</p>
          </Card>

          <Card title="관리자 수" padding="md">
            <div className="text-3xl font-bold text-green-600">
              {sampleUsers.filter(user => user.role === 'admin').length}
            </div>
            <p className="text-gray-500 text-sm mt-1">관리자 권한 사용자</p>
          </Card>

          <Card title="일반 사용자 수" padding="md">
            <div className="text-3xl font-bold text-purple-600">
              {sampleUsers.filter(user => user.role === 'user').length}
            </div>
            <p className="text-gray-500 text-sm mt-1">일반 사용자</p>
          </Card>
        </div>

        {/* 사용자 목록 */}
        <Card title="사용자 관리" padding="lg">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600">등록된 사용자 목록을 관리할 수 있습니다.</p>
            <Button variant="primary" size="sm">
              새 사용자 추가
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    사용자
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    권한
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    가입일
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sampleUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role === 'admin' ? '관리자' : '일반 사용자'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          편집
                        </Button>
                        <Button variant="secondary" size="sm">
                          삭제
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* 시스템 정보 */}
        <div className="mt-8">
          <Card title="시스템 정보" padding="md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">애플리케이션</h4>
                <p className="text-sm text-gray-600">관리자 대시보드 v0.1.0</p>
                <p className="text-sm text-gray-600">포트: 3001</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">공통 패키지</h4>
                <p className="text-sm text-gray-600">@repo/ui - UI 컴포넌트</p>
                <p className="text-sm text-gray-600">@repo/shared - 공통 유틸리티</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
