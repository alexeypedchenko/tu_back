
export const getMarkerScheme = () => ({
  public: false,
  name: 'Marker name',
  description: 'Marker description',
  icon: 'https://via.placeholder.com/30x30?text=pin',
  image: 'https://via.placeholder.com/120x80?text=img-place',
  coordinates: {
    lng: '32.07230514',
    lat: '46.64288927',
  },
  placeId: '00000001',
  ...getFiltersScheme(),
})

export const getPlaceScheme = () => ({
  seo: getSeoScheme(),
  name: 'Place name',
  description: 'Place description',
  markerId: '00000001',
  pageBlocks: [],
})

export const getRouteScheme = () => ({
  public: false,
  seo: getSeoScheme(),
  markers: [],
  pageBlocks: [],
  ...getFiltersScheme(),
})

export const getFiltersScheme = () => ({
  type: 'Object type',
  town: 'Odessa',
  region: 'Odessa Region',
  tags: [
    'tag 1',
    'tag 2',
    'tag 3',
  ],
})

export const getSeoScheme = () => ({
  title: 'seo title',
  description: 'seo description',
  keywords: 'seo keywords'
})
