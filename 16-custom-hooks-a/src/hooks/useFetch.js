import {useEffect,useState} from 'react';

export  function useFetch(fetchFn,initialValue){//özel kacalar da fonksiyonlardır ve parametre alabilir

    const [isFetching,setIsFetching]=useState();
    const [error,setError]=useState();
    const [fetchedData,setFetchedData]=useState(initialValue);

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchFn]);//fetchFn'i bağımlılık olarak eklemem gerekiyor çünkü teorik olarak değişebilecek bazı harici veriler içeriyor veriler değişirse Effect tekrar çalışmalı


  return{
    isFetching,
    error,
    fetchedData,
    setFetchedData
  }
}