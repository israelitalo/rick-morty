export type characterType = {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: Array<{
    name: string;
  }>;
  url: string;
  created: string;
};

export type characterDetailType = {
  character: characterType;
};

export type characterListType = {
  characters: {
    info: {
      count: number;
      pages: number;
      next: null | string;
      prev: null | string;
    };
    results: characterType[];
  };
};
