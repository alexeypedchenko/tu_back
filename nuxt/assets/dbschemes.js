export const getPlaceScheme = () => ({
  ...getDefaultFields(),
  marker: getMarkerScheme(),
  pageBlocks: [],
})

export const getDefaultFields = () => ({
  public: false,
  name: 'Object name',
  type: 'Object type',
  description: 'Object description',
  image: 'https://via.placeholder.com/1920x1080?text=img-place',
  town: 'Odessa',
  region: 'Odessa Region',
  tags: [
    'tag 1',
    'tag 2',
    'tag 3',
  ],
})

export const getMarkerScheme = () => ({
  icon: 'https://via.placeholder.com/30x30?text=pin',
  image: 'https://via.placeholder.com/120x80?text=img-place',
  coordinates: {
    lng: '32.07230514',
    lat: '46.64288927',
  }
})
