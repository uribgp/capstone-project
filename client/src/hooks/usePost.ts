import axios from "axios";
import { useEffect, useState } from "react";

export const UsePost = (path: string, body: object) => {
  const [response, setResponse] = useState();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading')

  const sendPostRequest = () => {
    axios.post(`/api/${path}`, body)
    .then((response) => {
      setResponse(response.data)
    })
    .catch((error) => {
      setStatus("error")
    })
  }

return [sendPostRequest]
}