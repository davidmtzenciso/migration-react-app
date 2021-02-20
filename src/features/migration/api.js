const metadataURL = "http://healthsparq.com/migration/metadata";



const get_metadata = (url, onSuccess, onError) => {
  fetch(url)
      .then(res => res.json())
      .then(onSuccess, onError)
};
