import React, { Component, ReactNode, ErrorInfo } from 'react'
import { ErrorGeneral } from '@shared/components/ui/errorGeneral'

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
        <ErrorGeneral
          title="что-то тут не так!"
          message="о боже, это ошибка! 👀 попробуйте перегрузить страницу"
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
