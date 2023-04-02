// components/CharacterPreview.tsx
import React, { useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { SelectedCharacterParts } from "../types";

interface Props {
  selectedParts: SelectedCharacterParts;
}

const CharacterPreview: React.FC<Props> = ({ selectedParts }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (previewRef.current) {
      const pixelRatio = window.devicePixelRatio || 1;
      html2canvas(previewRef.current, { backgroundColor: null, scale: pixelRatio }).then(
        (canvas) => {
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "character.png";
          link.click();
        }
      );
    }
  };
  

  return (
    <div>
      <div
        className="relative w-96 h-96 bg-white p-2 rounded-lg shadow-lg mb-4"
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
          onClick={handleDownload}
          className="bg-slate-200 border border-gray-100 hover:bg-slate-400 text-gray-600 font-bold py-2 px-4 rounded mt-4 mb-4 mx-auto"
        >
          Download
        </button>
      </div>
    </div>
  );
};

export default CharacterPreview;
