// components/CharacterPreview.tsx
import React, { useRef } from "react";
import Image from "next/image";
import html2canvas from "html2canvas";
import { CharacterParts, SelectedCharacterParts } from "../types";
import { characterParts } from "@/data";

interface Props {
  selectedParts: SelectedCharacterParts;
  onRandomize: (newParts: SelectedCharacterParts) => void;
}

const CharacterPreview: React.FC<Props> = ({ selectedParts, onRandomize }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    if (previewRef.current) {
      const pixelRatio = window.devicePixelRatio || 1;
      html2canvas(previewRef.current, {
        backgroundColor: null,
        scale: pixelRatio,
      }).then((canvas) => {
        canvas.style.width = `${previewRef.current?.clientWidth}px`;
        canvas.style.height = `${previewRef.current?.clientHeight}px`;
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "character.png";
        link.click();
      });
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
        className="relative bg-white p-2 rounded-lg shadow-lg mb-4"
        ref={previewRef}
        style={{ width: "500px", height: "500px" }} // Update width and height values here
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
          Download
        </button>
      </div>
    </div>
  );
  
};

export default CharacterPreview;
