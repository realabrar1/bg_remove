"use client"

import { useState } from "react"
import { FileUpload } from "@/components/file-upload"
import { BackgroundTemplates } from "@/components/background-templates"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { removeBackground } from "./actions"
import { Download, Loader2 } from "lucide-react"

export default function BackgroundRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [processedImage, setProcessedImage] = useState<string | null>(null)
  const [selectedBackground, setSelectedBackground] = useState("transparent")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelect = async (dataUrl: string) => {
    setOriginalImage(dataUrl)
    setProcessedImage(null)
    setError(null)
    setIsProcessing(true)

    try {
      const result = await removeBackground(dataUrl)
      setProcessedImage(result)
    } catch (err) {
      setError("Failed to process image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (processedImage) {
      const link = document.createElement("a")
      link.href = processedImage
      link.download = "processed-image.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Background Remover</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
          <FileUpload onImageSelect={handleImageSelect} />
          {originalImage && (
            <div className="mt-4">
              <img src={originalImage || "/placeholder.svg"} alt="Original" className="rounded-lg" />
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <div className="min-h-[200px] flex items-center justify-center rounded-lg border-2 border-dashed">
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span>Processing...</span>
              </div>
            ) : processedImage ? (
              <div className="w-full">
                <div className="rounded-lg overflow-hidden" style={{ background: selectedBackground }}>
                  <img src={processedImage || "/placeholder.svg"} alt="Processed" className="w-full" />
                </div>
                <Button onClick={handleDownload} className="mt-4 w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <p className="text-gray-500">Processed image will appear here</p>
            )}
          </div>
        </Card>
      </div>

      <Card className="mt-8 p-6">
        <h2 className="text-xl font-semibold mb-4">Background Templates</h2>
        <BackgroundTemplates onSelect={setSelectedBackground} selected={selectedBackground} />
      </Card>
    </div>
  )
}

