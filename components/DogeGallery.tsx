import React from "react";
import Image from "next/image";

type Props = {
  uploadedImages: string[];
  onUpload: () => void;
  onRemove: (index: number) => void;
  onDownload: () => void;
};

const DogeGallery: React.FC<Props> = ({
  uploadedImages,
  onUpload,
  onRemove,
  onDownload,
}) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-red-800 text-xl mb-3">Recent Creation Gallery</h1>
      <div className="flex justify-center mx-auto">
        <div className="grid grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-3 gap-8 mt-4 mb-4">
          {uploadedImages.map((image, index) => (
            <div key={index} className="relative h-32 w-32">
              <Image
                src={image}
                alt={`Uploaded Image ${index}`}
                layout="fill"
                objectFit="cover"
              />
              <button
                onClick={() => onRemove(index)}
                className="absolute top-0 right-0 bg-red-500 text-white px-1 py-0.5 text-xs rounded-bl"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center">
        <button
          onClick={onUpload}
          className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Upload to Gallery
        </button>
        <button
          onClick={onDownload}
          className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Download Collage
        </button>
      </div>
    </div>
  );
};

export default DogeGallery;
