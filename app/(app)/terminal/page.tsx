"use client"

import dynamic from "next/dynamic"

const Terminal = dynamic(() => import("../../../components/terminal"), {
  ssr: false,
})

export default function IndexPage() {
  return (
    <div>
      <div style={{ height: "100vh", width: "100%" }}>
        <Terminal />
      </div>
    </div>
  )
}
