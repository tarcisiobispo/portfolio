import * as React from 'react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({ error, errorInfo });
    
    // Log the error to an error reporting service
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="text-center max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-600">Algo deu errado</h2>
            <p className="mb-4">Desculpe, encontramos um problema ao carregar esta página.</p>
            {this.state.error && (
              <details className="mb-4 text-left">
                <summary className="text-sm text-gray-600 cursor-pointer mb-2">Detalhes do erro</summary>
                <pre className="bg-gray-100 p-3 rounded text-xs overflow-auto">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Higher Order Component para envolver componentes com ErrorBoundary
export function withErrorBoundary<T extends object>(
  Component: React.ComponentType<T>,
  FallbackComponent?: React.ComponentType<{ error?: Error }>,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
) {
  return function ErrorBoundaryWrapper(props: T) {
    return (
      <ErrorBoundary
        fallback={
          FallbackComponent ? <FallbackComponent error={undefined} /> : null
        }
        onError={onError}
      >
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}

export default ErrorBoundary;
