import axios from "axios"
import React from "react"
import "./css/images.css"

function GetImage({ srcUrl, name }) {
  function handleClick() {
    axios
      .delete(`http://localhost:3001/delete/${name}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  console.log(srcUrl)
  return <img src={srcUrl} alt={name} onClick={handleClick} />
}

export default GetImage
