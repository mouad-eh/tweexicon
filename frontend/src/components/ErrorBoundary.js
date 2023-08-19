import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    window.location = '/';
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    return hasError ? null : children;
  }
}
