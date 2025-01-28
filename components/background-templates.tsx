"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const backgrounds = [
  {
    id: "transparent",
    name: "Transparent",
    preview: "/placeholder.svg?height=100&width=100",
    value: "transparent",
  },
  {
    id: "white",
    name: "White",
    preview: "/placeholder.svg?height=100&width=100",
    value: "#FFFFFF",
  },
  {
    id: "black",
    name: "Black",
    preview: "/placeholder.svg?height=100&width=100",
    value: "#000000",
  },
  {
    id: "gradient1",
    name: "Gradient 1",
    preview: "/placeholder.svg?height=100&width=100",
    value: "linear-gradient(to right, #00c6ff, #0072ff)",
  },
]

interface BackgroundTemplatesProps {
  onSelect: (background: string) => void
  selected: string
}

export function BackgroundTemplates({ onSelect, selected }: BackgroundTemplatesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {backgrounds.map((bg) => (
        <Card
          key={bg.id}
          className={`cursor-pointer transition-all ${selected === bg.value ? "ring-2 ring-primary" : ""}`}
          onClick={() => onSelect(bg.value)}
        >
          <CardContent className="p-4">
            <div className="w-full aspect-square rounded-lg mb-2" style={{ background: bg.value }} />
            <p className="text-sm text-center">{bg.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

