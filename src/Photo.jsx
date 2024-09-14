import React, { useState } from 'react'

function Photo({album}) {
    const [flag,setFlag] = useState()

    console.log(album)
  return (
    <div>
        <h1>{album.title}</h1>
        <h3 onClick={()=>setFlag(!flag)}>{album.thumbnailUrl}</h3>

        <div>
            {flag == true &&(<div>
                <img src={album.thumbnailUrl} />
            </div>)}
        </div>
    </div>
   
  )
}

export default Photo