import { useState } from 'react';


export const useFile = (): UseFile => {

    const [state, setState] = useState(false)

    return {
        downloadFile,
        state
    }

    async function downloadFile(url: string) {
`
        setState(true)
        const file_data = await fetchFile(url);
        setState(false)
        if (!file_data) return;

        const url_blob = window.URL.createObjectURL(file_data.blob);
        const a = document.createElement('a');
        a.href = url_blob;
        a.download = file_data.filename!;
        document.body.appendChild(a);
        a.click();
        a.remove();


    }

}

async function fetchFile(url: string) {
    try {
        const res = await fetch(url, { method: 'POST' });

        if (res.status != 200) return;

        const content_disposition = res.headers.get('Content-Disposition');

        const filename = content_disposition?.split('filename=')[1];
        const blob = await res.blob();

        return {
            filename,
            blob
        }

    } catch (err) {

        //

    }

}

export type UseFile = {

    downloadFile: (url: string) => void
    state: boolean

}
