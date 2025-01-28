"use server"

export async function removeBackground(imageData: string) {
  try {
    // Convert data URL to base64
    const base64Data = imageData.split(",")[1]

    const response = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": process.env.BG_REMOVE_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_file_b64: base64Data,
        size: "regular",
        type: "auto",
        format: "png",
        bg_color: null,
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.errors?.[0]?.title || "Failed to remove background")
    }

    const buffer = await response.arrayBuffer()
    const base64Image = Buffer.from(buffer).toString("base64")
    return `data:image/png;base64,${base64Image}`
  } catch (error) {
    console.error("Error removing background:", error)
    throw error
  }
}

