export interface City {
  name: string;
  slug: string;
}

export const cities = [
  { name: "Sherwood Park", slug: "sherwood-park" },
  { name: "Edmonton", slug: "edmonton" },
  { name: "St. Albert", slug: "st-albert" },
  { name: "Fort Saskatchewan", slug: "fort-saskatchewan" },
  { name: "Leduc", slug: "leduc" },
  { name: "Beaumont", slug: "beaumont" },
  { name: "Devon", slug: "devon" },
  { name: "Stony Plain", slug: "stony-plain" },
  { name: "Spruce Grove", slug: "spruce-grove" },
] as const satisfies readonly City[];

export type CitySlug = (typeof cities)[number]["slug"];
