
export const getMarkerScheme = () => ({
  type: 'marker',
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
  link: 'place-name',
  ...getFiltersScheme(),
})

export const getPlaceScheme = () => ({
  type: 'place',
  seo: getSeoScheme(),
  name: 'Place name',
  slug: 'place-name',
  description: 'Place description',
  markerId: '00000001',
  image: 'https://via.placeholder.com/1024x1080?text=img-place',
  pageBlocks: [],
})

export const getRouteScheme = () => ({
  type: 'route',
  public: false,
  name: 'Route name',
  description: 'Route description',
  image: 'https://via.placeholder.com/120x80?text=img-place',
  markers: [],

  // ?? TODO transfer to another entity ??
  pageBlocks: [],
  seo: getSeoScheme(),
  ...getFiltersScheme(),
})

export const getFiltersScheme = () => ({
  region: '',
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
