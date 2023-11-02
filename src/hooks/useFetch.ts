import { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface LoadingDataResult<T, M> {
	data: T | null
	isLoading: boolean
	error: AxiosError | null
	isFulfilled: boolean
	eventLoading: (data?: M) => void
}
// T - дженерік типу який повертає проміс
// M - дженерік типу аргументів (працює тільки з eventLoading  )

// Якщо потрібно передати аргументи dataFetcher використовуємо useCallback:

// const paramRequest = useCallback(()=> getMuseumData(1),[залежність для зміни параметрів])

// const { data, isLoading } = useFetch<IMuseumData, unknown>(paramRequest);

export const useFetch = <T, M>(
	dataFetcher: (data: any) => Promise<AxiosResponse<T, any>>,
	event?: boolean
): LoadingDataResult<T, M> => {
	const [data, setData] = useState<T | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<AxiosError | null>(null)
	const [isFulfilled, setIsFulfilled] = useState<boolean>(false)

	const fetchData = async (requestData?: M) => {
		setIsLoading(true)
		try {
			const response = await dataFetcher(requestData)
			setData(response.data)
			setIsFulfilled(true)
			setIsLoading(false)
		} catch (error: any) {
			setError(error as AxiosError)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		if (!event) {
			fetchData()
		}
	}, [dataFetcher, event])

	const eventLoading = (data?: M) => {
		fetchData(data)
	}

	return { data, isLoading, error, eventLoading, isFulfilled }
}
