import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Web3Storage } from 'web3.storage'
import { useState } from 'react'

const MakeStorageClient = () => {
  return new Web3Storage({token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDlGM2IwRjEyNUUxNkNCQjE4YTE0YjZhRTc4QjZiODRiOEZFNjhBY2IiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NjI3MjA3MzYyNTUsIm5hbWUiOiJSIn0.L8Tm6jSJMYUw_HTmo_YFzWN5FklXZnUiKpENIgEch0U"})
}

const saveToIpfs = async (files) => {
  const client = MakeStorageClient()
  const cid = await client.put([files])
  console.log(`File stored with CID: ${cid}`)
  return cid
}

const retriveData = async (cid) => {
  const client = MakeStorageClient()
  const res = await client.get(cid)
  console.log(`Got a response! [${res.status}] ${res.statusText}`)
  if (!res.ok) {
    throw new Error(`failed to get ${cid} - ${res.statusText}`)
  }

  // retrieved file objects from the response
  const files = await res.files()
  console.log(files)
}

export default function Home() {

  const [files, setFiles] = useState([])
  const [cid,setCid] = useState()
  const [fileName, setFileName] = useState()

  const handleChange = (e) => {
    setFiles(e.target.files[0])
    setFileName(e.target.files[0].name)
    console.log(e.target.files[0].name)
  }
  
    const uploadData = async (e) => {
      e.preventDefault()
      // var stream= fs.readStream(files);
      let _cid = await saveToIpfs(files)
      console.log(_cid)
      setCid(_cid)
    }

  return (
    <div className={styles.container}>
      <div>
          <label htmlFor="image-file">Select an Image:</label>
          <input id="image-file" onChange={handleChange} type="file" />
     </div>
     <button onClick  ={uploadData} >save</button>  
     <button >retrieve</button> 

     {cid && fileName &&
        <Image src={`https://ipfs.io/ipfs/${cid}/${fileName}`} width={500} height={500} />
      }
     </div>
  )
}
