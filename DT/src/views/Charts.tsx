import { useCounterStore } from "../stores/useCounterStore";
import { FC } from 'react';
const PlaylistView: FC = () => {
    const { count, increment, decrement } = useCounterStore();
    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}

export default PlaylistView;