import { useRef, useState } from "react";

// Javascript stale closure
// https://dmitripavlutin.com/react-hooks-stale-closures/
// https://css-tricks.com/dealing-with-stale-props-and-states-in-reacts-functional-components/
export default function customRef(value){ 
    const ref = useRef(value);
    const [uselessState, forceRender] = useState(false);

    function updateState(newState) {
        if (!Object.is(ref.current, newState)) {
            ref.current = newState;
            forceRender(!uselessState);
        }
    }
    
    return [ref, updateState];
}