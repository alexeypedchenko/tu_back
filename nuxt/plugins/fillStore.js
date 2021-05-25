export default async function ({store}) {
  await store.dispatch('places/getPlaces')
}
