// components/CharacterPreview.tsx
import React, { useRef } from "react";
import NextImage from "next/image";
import html2canvas from "html2canvas";
import { CharacterParts, SelectedCharacterParts } from "../types";
import { characterParts } from "@/data";

interface Props {
  selectedParts: SelectedCharacterParts;
  onRandomize: (newParts: SelectedCharacterParts) => void;
  previewRef: React.RefObject<HTMLDivElement>;
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
    const selectedPartKeys = Object.keys(selectedParts);
    if (selectedPartKeys.length === 0) return; // No selected parts
  
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    const imagePromises = selectedPartKeys.map((category) => {
      const part = selectedParts[category];
      return new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = "anonymous";
        image.onload = () => {
          resolve(image);
        };
        image.onerror = reject;
        image.src = part.image;
      });
    });
  
    try {
      const images = await Promise.all(imagePromises);
  
      canvas.width = images[0].width;
      canvas.height = images[0].height;
  
      images.forEach((image) => {
        context?.drawImage(image, 0, 0);
      });
  
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = "character.png";
          link.click();
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Image download failed:", error);
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
        className="relative mx-auto w-72 h-72 md:h-78 md:h-78 lg:h-[300px] lg:w-[300px] xl:h-[320px] xl:w-[320px] bg-none rounded-lg shadow-lg mb-2"
        ref={previewRef}
      >
        {Object.keys(selectedParts).map((category) => {
          const part = selectedParts[category as keyof SelectedCharacterParts];
          return (
            <NextImage
              key={category}
              src={part.image}
              alt={part.name}
              layout="fill"
              objectFit="responsive"
              quality={100}
            />
          );
        })}
      </div>
      <div className="flex justify-center">
        <button
          onClick={handleRandomize}
          className="bg-none border border-[#444444] hover:bg-[#222222] text-gray-200 text-md py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Randomize
        </button>
        <button
          onClick={handleDownload}
          className="bg-none border border-[#444444] hover:bg-[#222222] text-gray-200 text-md py-2 px-4 rounded mt-4 mb-4 mx-2"
        >
          Download Image
        </button>
      </div>
    </div>
  );
};

export default CharacterPreview;
