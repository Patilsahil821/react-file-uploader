import React, { useEffect, useState } from "react"
import axios from "axios"

function Upload() {
  function handleSubmit(event) {
    event.preventDefault()
    const file = document.getElementById("file")

    const fd = new FormData()
    for (let i = 0; i < file.files.length; i++) {
      fd.append("images", file.files[i])
    }
    fetch("http://localhost:3001", {
      method: "post",
      body: fd
    })
  }

  return (
    <div className="container text-center">
      <div className="row">
        <div className="col">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <input
                type="file"
                className="form-control-file"
                id="file"
                name="image"
                multiple
              />
            </div>
            <button type="submit" class="btn btn-outline-primary mb-3">
              upload
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Upload
