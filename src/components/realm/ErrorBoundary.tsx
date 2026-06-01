"use client"

import React from "react"

interface Props { children: React.ReactNode; fallback?: React.ReactNode }

interface State { hasError: boolean }

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-red-400/20 bg-red-400/5 p-6 text-center">
          <span className="text-2xl">⚠️</span>
          <p className="text-[11px] font-bold text-red-400">Algo salió mal</p>
          <button onClick={() => this.setState({ hasError: false })}
            className="rounded-lg border border-red-400/30 bg-red-400/10 px-3 py-1 text-[10px] font-bold text-red-400 transition hover:bg-red-400/20 cursor-pointer"
          >
            Reintentar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
