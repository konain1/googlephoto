import { useState, useEffect } from "react";
import Photo from "./Photo";

const App = () => {
  const [albumData, setAlbumData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null); // Track selected album

  const handlePhoto = (id) => {
    const filteredData = albumData.filter((item) => item.albumId === id);
    let DataSet  = new Set();
    for(let i = 0;i<filteredData.length;i++){

      if(!DataSet.has(filteredData[i].albumId)){
        console.log(i)
        DataSet.add(filteredData[i].albumId)
        setSelectedAlbum(filteredData[i])
      }
    }
    console.log(DataSet)
  ; // Store the selected album's photos
  };

  // Fetch data from the API
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/photos')
      .then((res) => res.json())
      .then((result) => {
        setAlbumData(result); 
        separateData(result); // Pass result to separateData
      });
  }, []);

  // Separate albums based on unique albumId
  function separateData(albumData) {
    const uniqueAlbumIds = new Set();
    const uniqueData = [];

    for (let i = 0; i < albumData.length; i++) {
      const album = albumData[i];
      if (!uniqueAlbumIds.has(album.albumId)) {
        uniqueAlbumIds.add(album.albumId);
        uniqueData.push(album); // Store only one album per albumId
      }
    }

    setData(uniqueData); // Store unique albums
  }

  return (
    <>
      {/* Conditionally render either the album list or the Photo component */}
      {selectedAlbum ? (
        <div>
          {/* Render the Photo component when an album is clicked */}
          <Photo album={selectedAlbum} />
          <button onClick={() => setSelectedAlbum(null)}>Back to Albums</button>
        </div>
      ) : (
        <div>
          <h1>Albums</h1>
          {data.map((item, index) => (
            <div key={index} onClick={() => handlePhoto(item.albumId)}>
              <div>Album ID: {item.albumId}</div>
              <div>Title: {item.title}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default App;
