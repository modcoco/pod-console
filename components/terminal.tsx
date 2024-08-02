import React, { useEffect, useRef, useState } from "react"
import { FitAddon } from "@xterm/addon-fit"
import { Terminal } from "@xterm/xterm"
import { debounce } from "lodash"

import "@/styles/xterm.css"
import "@xterm/xterm/css/xterm.css"

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [term, setTerm] = useState<Terminal | null>(null)
  const fitAddon = useRef<FitAddon | null>(null)
  const socketRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const terminal = new Terminal({
      scrollback: 1000,
      cursorBlink: true,
    })
    const addon = new FitAddon()
    terminal.loadAddon(addon)
    setTerm(terminal)
    fitAddon.current = addon

    return () => {
      if (term) {
        term.dispose()
      }
      if (socketRef.current) {
        socketRef.current.close()
      }
    }
  }, [])

  useEffect(() => {
    if (term && terminalRef.current) {
      term.open(terminalRef.current)
      if (fitAddon.current) {
        fitAddon.current.fit()
      }

      const DEFAULT_NAMESPACE = 'default';
      const DEFAULT_POD = 'default';
      const DEFAULT_CONTAINER = 'default';
      
      const getWebSocketUrl = (
        namespace: string,
        pod: string,
        container: string
      ) => `ws://localhost:8080/namespace/${namespace}/pod/${pod}/container/${container}`;
      
      const storedTask = localStorage.getItem('task');
      const task = storedTask ? JSON.parse(storedTask) : {};
      const namespace = task.namespace || DEFAULT_NAMESPACE;
      const pod = task.pod || DEFAULT_POD;
      const container = task.container || DEFAULT_CONTAINER;
      
      const url = getWebSocketUrl(namespace, pod, container);
      console.log(url);
      socketRef.current = new WebSocket(url, "echo-protocol")

      const debouncedSendTerminalSize = debounce(
        (rows: number, columns: number) => {
          if (socketRef.current?.readyState === WebSocket.OPEN) {
            const message = JSON.stringify({
              type: "resize",
              data: { rows, columns },
            })
            const encodedData = encodeMessage(message, "9")
            socketRef.current.send(encodedData)
          }
        },
        100
      )

      socketRef.current.onopen = () => {
        term.writeln("Connected to WebSocket server")
        debouncedSendTerminalSize(term.rows, term.cols)
      }

      socketRef.current.onclose = () => {
        term.writeln("Disconnected from WebSocket server")
      }

      const onDataHandler = (data: string) => {
        if (socketRef.current?.readyState === WebSocket.OPEN) {
          const encodedData = encodeMessage(data, "0")
          socketRef.current.send(encodedData)
        } else {
          term.writeln("Terminal is not open")
        }
      }
      term.onData(onDataHandler)

      socketRef.current.onmessage = (event) => {
        const data = event.data
        const decodedMessage = decodeMessage(data)
        term.write(decodedMessage)
      }

      const resizeListener = () => {
        if (fitAddon.current) {
          fitAddon.current.fit()
          debouncedSendTerminalSize(term.rows, term.cols)
          console.log(
            `Terminal size changed - rows: ${term.rows}, columns: ${term.cols}`
          )
        }
      }
      window.addEventListener("resize", resizeListener)

      return () => {
        window.removeEventListener("resize", resizeListener)
      }
    }
  }, [term])

  const encodeMessage = (input: string, prefix: string): string => {
    const asciiEncoded = input
      .split("")
      .map((c) => c.charCodeAt(0))
      .map((c) => c.toString(16).padStart(2, "0"))
      .join("")
    const base64Encoded = Buffer.from(
      asciiEncoded.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    ).toString("base64")
    return prefix + base64Encoded
  }

  const decodeMessage = (input: string): string => {
    const type = input.slice(0, 1)
    const base64Data = input.slice(1)
    const decodedData = Buffer.from(base64Data, "base64").toString("utf-8")
    const decodedString = decodedData
      .split("")
      .map((c) => String.fromCharCode(c.charCodeAt(0)))
      .join("")
    return decodedString
  }

  return (
    <div
      ref={terminalRef}
      style={{
        height: "100vh",
        width: "100%",
        visibility: term ? "visible" : "hidden",
      }}
    />
  )
}

export default TerminalComponent
