import React, { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode; // children 속성을 명시적으로 정의
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    // 초기 상태 설정
    this.state = { hasError: false };
  }

  // 오류 발생 시 상태 업데이트
  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 오류가 발생하면 대체 UI를 렌더링
      return <h1>오류가 발생했습니다.</h1>;
    }

    // 오류가 없으면 자식 컴포넌트를 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary;
