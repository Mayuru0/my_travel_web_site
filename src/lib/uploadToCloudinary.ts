export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData()
  formData.append("file", file)
  formData.append("upload_preset", "travelweb")

  const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
    method: "POST",
    body: formData,
  })

 const data = await res.json()
  if (!res.ok || !data.secure_url) {
    throw new Error("Image upload failed")
  }

  return data.secure_url
}