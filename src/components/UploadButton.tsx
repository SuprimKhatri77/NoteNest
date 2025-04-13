"use client";

import { useState } from "react";
import { UploadButton } from "@/utlis/uploadthing";

// Add a prop to receive the URL setter function from parent
export default function UploadImageButton({
    onImageUploaded
}: {
    onImageUploaded: (url: string) => void
}) {
    const [imageUrl, setImageUrl] = useState<string>("");

    return (
        <div className="space-y-4">
            {imageUrl && (
                <div className="mt-4">
                    <p className="text-sm text-gray-500">Image uploaded successfully!</p>
                    <img
                        src={imageUrl}
                        alt="Uploaded preview"
                        className="h-40 object-cover rounded mt-2"
                    />
                </div>
            )}

            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                    if (res && res.length > 0) {
                        console.log("Upload complete response:", res);
                        const uploadedUrl = res[0].url;
                        console.log("Setting image URL to:", uploadedUrl);

                        // Update local state
                        setImageUrl(uploadedUrl);

                        // Also pass the URL to the parent component
                        onImageUploaded(uploadedUrl);
                    }
                }}
                onUploadError={(error: Error) => {
                    console.error("Upload error:", error);
                    alert(`ERROR! ${error.message}`);
                }}
            />
        </div>
    );
}