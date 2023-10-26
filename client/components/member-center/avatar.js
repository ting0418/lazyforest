import React, { useState, useRef } from 'react'
import styles from '@/components/member-center/avatar.module.scss'

function ImageUpload() {
  const [image, setImage] = useState(null)
  const hiddenFileInput = useRef(null)

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    const imgname = event.target.files[0].name
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const img = new Image()
      img.src = reader.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const maxSize = Math.max(img.width, img.height)
        canvas.width = maxSize
        canvas.height = maxSize
        const ctx = canvas.getContext('2d')
        ctx.drawImage(
          img,
          (maxSize - img.width) / 2,
          (maxSize - img.height) / 2
        )
        canvas.toBlob(
          (blob) => {
            const file = new File([blob], imgname, {
              type: 'image/png',
              lastModified: Date.now(),
            })

            console.log(file)
            setImage(file)
          },
          'image/jpeg',
          0.8
        )
      }
    }
  }

  const handleUploadButtonClick = (file) => {
    var myHeaders = new Headers()
    const token = 'adhgsdaksdhk938742937423'
    myHeaders.append('Authorization', `Bearer ${token}`)

    var formdata = new FormData()
    formdata.append('file', file)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    }

    fetch('https://trickuweb.com/upload/profile_pic', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(JSON.parse(result))
        const profileurl = JSON.parse(result)
        setImage(profileurl.img_url)
      })
      .catch((error) => console.log('error', error))
  }

  const handleClick = (event) => {
    hiddenFileInput.current.click()
  }

  return (
    <div className={styles.image_upload_container}>
      <div className={styles.box_decoration}>
        <label
          htmlFor="image-upload-input"
          className={styles.image_upload_label}
        >
          {image ? image.name : 'Choose an image'}
        </label>
        <div onClick={handleClick} style={{ cursor: 'pointer' }}>
          {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="upload image"
              className={styles.img_display_after}
            />
          ) : (
            <img
              src="./photo.png"
              alt="upload image"
              className={styles.img_display_before}
            />
          )}

          <input
            id="image-upload-input"
            type="file"
            onChange={handleImageChange}
            ref={hiddenFileInput}
            style={{ display: 'none' }}
          />
        </div>

        <button
          className={styles.image_upload_button}
          onClick={handleUploadButtonClick}
        >
          Upload
        </button>
      </div>
    </div>
  )
}

export default ImageUpload
