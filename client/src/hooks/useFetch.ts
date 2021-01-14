import axios, { AxiosError, AxiosResponse } from "axios";
import React, { useEffect, useState} from "react";
import { FetchStatus } from "../types/fetch-status";

export function useFetch(url: string, options: object) {
  const [status, setStatus] = useState<FetchStatus>("loading");
  const [response, setResponse] = useState<any>();
  
  
  const handleUpdatedState = (updatedState: any) => {
  setResponse(updatedState)
  }
  
  useEffect(() => {
    setStatus('loading')
    const doFetch = () => {
      axios
        .get(`/api${url}`, {
          params: {
            ...options
          }
        })
        .then((response) => {
          setResponse(response.data);
          setStatus("success");
        })
        .catch((error) => {
          setStatus("error");
        });
    };
    doFetch()
  }, []);
  return { status, response, handleUpdatedState };
}
