import axios from "axios"
import React, { useEffect, useState } from "react"
import GetImage from "./GetImage"
import "./css/images.css"

function Images() {
  const [images, setImages] = useState([])
  useEffect(() => {
    axios.get("http://localhost:3001").then((res) => setImages(res.data))
    console.log("runned")
  }, [images])

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <div className="container-poster">
            {images.map((element) => {
              return (
                <div className="animate-container mr-3 mb-3">
                  <div className="animate ">
                    <GetImage
                      name={element.filename}
                      srcUrl={`http://localhost:3001/images/${element.filename}`}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Images
