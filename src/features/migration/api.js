const metadataURL = "http://localhost:8000/metadata/";



export const fetch_metadata = () => {
  return fetch(metadataURL, {method: "GET"})
        .then(res => res.json());
}
