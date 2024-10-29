import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setImageFile,
  imageLoadingState,
  uploadedImageUrl,
  setUploadedImageUrl,
  setImageLoadingState,
  isEditMode,
  isCustomStyling = false,
}) {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  function handleDragOver(event) {
    event.preventDefault();
  }

  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveImage() {
    setImageFile(null);
    setUploadedImageUrl(null); // Clear the preview URL when removing
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImageToCloudinary() {
    if (!imageFile) return; // Guard clause to ensure file is selected

    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/products/upload-image",
        data
      );

      if (response.data.success) {
        setUploadedImageUrl(response.data.result.url);
      } else {
        console.error("Failed to upload image:", response.data.message);
      }
    } catch (error) {
      console.error("Image upload error:", error);
    } finally {
      setImageLoadingState(false);
    }
  }

  useEffect(() => {
    if (imageFile) uploadImageToCloudinary();
  }, [imageFile]);

  return (
    <div className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}>
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>

      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center`}
      >
        {/* File Input */}
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageFileChange}
          disabled={isEditMode}
        />

        {/* Placeholder or Image Preview */}
        {!imageFile && !uploadedImageUrl ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload image</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-32 w-full bg-gray-100" />
        ) : (
          uploadedImageUrl && (
            <div className="relative">
              {/* Image Preview */}
              <img
                src={uploadedImageUrl}
                alt="Uploaded preview"
                className="w-full h-auto rounded-lg"
              />
              {/* Remove Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white text-red-500 hover:text-red-700 rounded-full p-1"
                onClick={handleRemoveImage}
                title="Remove File"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          )
        )}

        {/* File Info and Remove Button if File is Selected */}
        {imageFile && !imageLoadingState && (
          <div className="flex items-center justify-between w-full mt-4">
            <div className="flex items-center">
              <FileIcon className="w-6 h-6 text-primary mr-2" />
              <p className="text-sm font-medium">{imageFile.name}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-red-500 hover:text-red-700"
              onClick={handleRemoveImage}
              title="Remove File"
            >
              <XIcon className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
