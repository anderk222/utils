import { Client, messageCallbackType, StompSubscription } from "@stomp/stompjs";
import { useEffect, useMemo, useState } from 'react';

export function useStomp( url : string, opt : UseStompOption = {} ) {

    const [connected, setConnected] = useState(false);

    const client = useMemo(() => new Client({ brokerURL: url }), []);
    const [listeners, setListners] = useState<string[]>([]);

    useEffect(() => {

        client.onConnect = onConnected;
        client.onDisconnect = onDisconnected;
        client.activate();

        return () => { client.deactivate() };

    }, []);

    return {
        client,
        connected,
        listen,
        send,
        removeListener,
        removeListeners    
    }

    function listen(destination: string, callback: messageCallbackType) {

        if (!connected) return;

        const listener = client.subscribe(destination, callback);

        if (listener && opt.storage) setListners((current=>[...current, listener.id]));

        return listener;

    }

    function removeListener(listener: StompSubscription | undefined) {

        if (!listener) return;

        client.unsubscribe(listener.id);

    }

    function send<T>(destination: string, payload: T) {

        if (!connected) return;

        client.publish({ destination, body: JSON.stringify(payload) });

    }

    function removeListeners() {

        if (!connected) return;

        if (!opt.storage)
            throw new Error('you must set storage listeners on true >> useSockert({url : url, storage : true})');

        for (let listener of listeners) { 
        
            client.unsubscribe(listener) 
        };

        setListners(()=>[]);
    }

    function onConnected() { setConnected(true) }

    function onDisconnected() { setConnected(false) }
}


export declare type UseStomp = {
    client: Client;
    connected: boolean;
    listen: (destination: string, callback: messageCallbackType) => void;
    send: <T>(destination: string, payload: T) => void;
    removeListener: (listener: StompSubscription | undefined) => void,
    removeListeners : ()=> void
}

export declare type UseStompOption = {

    storage?: boolean,

}
