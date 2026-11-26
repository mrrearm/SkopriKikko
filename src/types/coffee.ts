export type GrindType = 'grossa' | 'fine';

export type PackSymbol = 'moka' | 'espresso';

export type CompatibilityFilter = 'all' | 'compatible' | 'incompatible';

export interface CoffeeBlend {
  id: string;
  name: string;
  subtitle: string;
  grindType: GrindType;
  grindLabel: string;
  micronRange: string;
  packSymbol: PackSymbol;
  kamiraCompatible: boolean;
  origins: string[];
  originRegionSummary: string;
  composition: string;
  roastLevel: 'Chiara' | 'Media' | 'Media-Scura' | 'Scura';
  intensity: number;
  aromaticNotes: string[];
  description: string;
  kamiraNote: string;
}

export interface CoffeeBrand {
  id: string;
  name: string;
  aliases?: string[];
  city: string;
  country: string;
  foundedYear: string;
  summary: string;
  signatureStyle: string;
  isLiveResult?: boolean;
  blends: CoffeeBlend[];
}
