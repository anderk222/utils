import { useState } from "react"

export function useBoolean(state = false) : UseBoolean {

    const [boolean, setBoolean] = useState(state);

    return {
        boolean,
        active,
        desactive,
        toggle
    };

    function active() { setBoolean(true) };
    function desactive() { setBoolean(false) };
    function toggle() { setBoolean((bool) => !bool) };

};

export type UseBoolean = {

    boolean: boolean;
    active: () => void;
    desactive: () => void;
    toggle: () => void;
}
