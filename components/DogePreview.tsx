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
      const scaleFactor = pixelRatio;
  
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: scaleFactor,
      });
  
      const dataURL = canvas.toDataURL("image/png");
  
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
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = "character.png";
        link.click();
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
        className="relative mx-auto w-[420px] h-[420px] bg-none p-2 rounded-lg shadow-lg mb-2"
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
          className="bg-none border border-[#444444] hover:bg-[#222222] text-gray-200 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Randomize
        </button>
        <button
          onClick={handleDownload}
          className="bg-none border border-[#444444] hover:bg-[#222222] text-gray-200 text-xl py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default CharacterPreview;
