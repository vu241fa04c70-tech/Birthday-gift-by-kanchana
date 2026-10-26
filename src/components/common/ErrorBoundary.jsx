import React from "react";
import { RotateCcw } from "lucide-react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.removeItem("birthday_current_screen");
      localStorage.removeItem("birthday_max_visited");
    } catch {
      // Storage unavailable
    }
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full bg-[#131726] border border-white/20 rounded-3xl p-8 shadow-2xl">
            <div className="text-4xl mb-4">🌙</div>
            <h1 className="font-serif text-2xl font-bold mb-2 text-pink-300">
              A Little Moment in the Universe
            </h1>
            <p className="text-slate-300 text-sm mb-6 leading-relaxed">
              Something needed a quick refresh. Click below to return to the beginning of our journey.
            </p>
            <button
              onClick={this.handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Return to Beginning ✨</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
