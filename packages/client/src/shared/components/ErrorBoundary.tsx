import React, { Component, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught in ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-[600px] m-auto">
          <h1 className="text-primary">что-то тут не так!</h1>
          <p>о боже, это ошибка!</p>
          <p>мы уже занимаемся проблемой 👀</p>
          <p>
            пока можно попробовать перегрузить страницу или вернуться на{' '}
            <a
              href="/"
              className="underline underline-offset-2 hover:text-primary">
              главную
            </a>
          </p>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
