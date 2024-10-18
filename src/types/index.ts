export interface FetchPainting {
  id: number;
  title: string;
  artist_title: string;
  image_id: string;
  is_public_domain: boolean;
}

export interface Painting {
  id: number;
  imageUrl: string;
  title: string;
  artist: string;
  label: string;
}

export interface Details {
  id: number;
  title: string;
  artist_display: string;
  artist_title: string;
  image_id: string;
  years: string;
  dimensions: string;
  credit_line: string;
  place_of_origin: string;
  is_on_view: boolean;
}

export interface PaginationProps {
  total: number;
  value: number;
  onChange: (page: number) => void;
}

export interface SearchFormProps {
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
}

export interface SortProps {
  criteria: string;
  setSortCriteria: (criteria: string) => void;
}

export interface Props {
  children: React.ReactNode;
}

export interface State {
  hasError: boolean;
}
