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
      const canvas = await html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: pixelRatio,
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
          const file = new File([blob], "doge.png", { type: "image/png" });
          await navigator.share({ title: "Doge", files: [file] });
        } catch (error) {
          console.error("Sharing failed:", error);
        }
      } else {
        // Fallback to download for unsupported browsers or PC
        const images = [dataURL]; // Wrap the dataURL in an array
        const canvas = document.createElement("canvas");
        canvas.width = 800; // 1 image per row, each image is 800x800
        canvas.height = 800; // 1 row, each row is 800 pixels tall
        const ctx = canvas.getContext("2d");
        if (ctx) {
          for (let i = 0; i < images.length; i++) {
            const img = new window.Image();
            img.src = images[i];
            await new Promise((resolve) => {
              img.onload = () => {
                if (ctx) {
                  const x = (i % 1) * 800;
                  const y = Math.floor(i / 1) * 800;
                  ctx.drawImage(img, x, y, 800, 800);
                  resolve(null);
                }
              };
            });
          }
          const dataURL = canvas.toDataURL("image/png"); // Use PNG format
          const link = document.createElement("a");
          link.href = dataURL;
          link.download = "doge.png";
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
