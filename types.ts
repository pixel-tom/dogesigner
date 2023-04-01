// types.ts

export interface CharacterPart {
  id: number;
  name: string;
  image: string;
}

// types.ts
export interface CharacterParts {
    [key: string]: CharacterPart[];
  }
  

  // types.ts
export interface SelectedCharacterParts {
    [key: string]: CharacterPart;
  }
  