import React, { useState } from 'react';
import Player from "./components/game/Player";
import ShareTable from "./components/game/ShareTable";

function GamePage() {

    const [ sharePrices, setSharePrices ] = useState({'brown':0, 'blue':0, 'yellow':0, 'green':0});
    const [ shareNumbers, setShareNumbers ] = useState({'brown':5, 'blue':5, 'yellow':5, 'green':5});
    const priceUp = ( color ) => {
        switch (sharePrices[color]){
            case 5:
                setSharePrices({...sharePrices, [color]:10});
                break;
            case 10:
                setSharePrices({...sharePrices, [color]:20});
                break;
            case 20:
                setSharePrices({...sharePrices, [color]:30});
                break;
            default:
                setSharePrices({...sharePrices, [color]:5});
                break;
        }
    };
    const getShare = ( color ) => {
        if(shareNumbers[color] > 0)
            setShareNumbers({...shareNumbers, [color]:shareNumbers[color]-1});
    };


    return(
        <div>
            <h1>Game Page</h1>
            <ShareTable sharePrices={sharePrices} shareNumbers={shareNumbers} priceUp={priceUp} getShare={getShare}/>
            <Player/>

        </div>
    );
}

export default GamePage;