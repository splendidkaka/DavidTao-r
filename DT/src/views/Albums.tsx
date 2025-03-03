import { useCounterStore } from "../stores/useCounterStore";
import { FC } from 'react';

const ArtistView: FC = () => {
    const { count, increment, decrement } = useCounterStore();
    return (
        <div>
            <h1>ArtistView:Count: {count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
        </div>
    );
}
export default ArtistView;