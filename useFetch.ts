import { useEffect, useState } from 'react';

export function useFetch<T>(callback?: CallBack): UseFetch<T> {


    const [state, setState] = useState<state<T>>({ status: 'initial' });

    useEffect(() => {

        if (!callback) return;
        set(callback);

    }, []);


    return {
        ...state,
        run
    }

    function run(callback: CallBack) { set(callback) };

    function set(callback: CallBack) {

        setState({ status: 'loading' });

        callback().then((res) => res.json())
            .then((parse: T) => {
                setState({ data: parse, status: 'ok' })
            })
            .catch(err => {
                setState({ status : 'error', error : ( <Error>err).message || 'unhandled error' })
            })

    };

};

export type UseFetch<T> = {
    error?: string,
    data?: T,
    status: string,
    run: (callback: CallBack) => void
};

type state<T> = { error?: string, data?: T, status: string }

export type CallBack = () => Promise<Response>
