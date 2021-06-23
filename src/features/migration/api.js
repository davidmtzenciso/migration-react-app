const metadataURL = "http://localhost:8000/metadata/";
const queryURL = "http://localhost:8000/query/";

export const fetch_metadata = () => {
  return fetch(metadataURL, {method: "GET"})
        .then(res => res.json());
}

export const post_query = (queryData) => {
  const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: queryData
    };
  return fetch(queryURL, requestOptions)
        .then(res => res.json());
}
