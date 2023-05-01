// components/CharacterPreview.tsx
import React, { useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { CharacterParts, SelectedCharacterParts } from "../types";
import { characterParts } from "@/data";

interface Props {
  selectedParts: SelectedCharacterParts;
  onRandomize: (newParts: SelectedCharacterParts) => void;
  previewRef: React.RefObject<HTMLDivElement>; // Add this line
}

const CharacterPreview: React.FC<Props> = ({
  selectedParts,
  onRandomize,
  previewRef,
}) => {
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      window.navigator.userAgent
    );
  };

  const handleDownload = async () => {
    if (previewRef.current) {
      const pixelRatio = window.devicePixelRatio || 1;
      const scaleFactor = pixelRatio * 10; // Increase scale factor for higher resolution
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: scaleFactor,
      });
  
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "character.png";
  
      if (navigator.share && isMobileDevice()) {
        // Use the Web Share API
        try {
          const response = await fetch(dataURL);
          const blob = await response.blob();
          const file = new File([blob], "character.png", { type: "image/png" });
          await navigator.share({ title: "Character", files: [file] });
        } catch (error) {
          console.error("Sharing failed:", error);
        }
      } else {
        // Fallback to download for unsupported browsers or PC
        const imageSize = 800 * scaleFactor;
        const canvas = document.createElement("canvas");
        canvas.width = imageSize;
        canvas.height = imageSize;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const img = new window.Image();
          img.src = dataURL;
          await new Promise((resolve) => {
            img.onload = () => {
              if (ctx) {
                ctx.drawImage(img, 0, 0, imageSize, imageSize);
                resolve(null);
              }
            };
          });
          const finalDataURL = canvas.toDataURL("image/png"); // Use PNG format
          const link = document.createElement("a");
          link.href = finalDataURL;
          link.download = "character.png";
          link.click();
        }
      }
    }
  };
  
  

  const handleRandomize = () => {
    const newSelectedParts: SelectedCharacterParts = {};
    for (const category in characterParts) {
      const parts = characterParts[category as keyof CharacterParts];
      const randomIndex = Math.floor(Math.random() * parts.length);
      newSelectedParts[category as keyof CharacterParts] = parts[randomIndex];
    }
    onRandomize(newSelectedParts);
  };

  return (
    <div>
      <div
        className="relative h-96 w-96 bg-white p-2 rounded-lg shadow-lg mb-4"
        ref={previewRef}
      >
        {Object.keys(selectedParts).map((category) => {
          const part = selectedParts[category as keyof SelectedCharacterParts];
          return (
            <Image
              key={category}
              src={part.image}
              alt={part.name}
              layout="fill"
              objectFit="contain"
              quality={100} // Increase the quality value (e.g., 100 for maximum quality)
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleRandomize}
          className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Randomize
        </button>
        <button
          onClick={handleDownload}
          className="bg-slate-300 border border-gray-100 hover:bg-slate-400 text-gray-600 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default CharacterPreview;
