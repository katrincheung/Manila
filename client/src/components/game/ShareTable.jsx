import React from 'react';

function ShareTable({ sharePrices,shareNumbers, priceUp, getShare }) {


    return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th><th>Brown</th><th>Blue</th><th>Yellow</th><th>Green</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Prices</td>
                        <td>{sharePrices.brown}</td>
                        <td>{sharePrices.blue}</td>
                        <td>{sharePrices.yellow}</td>
                        <td>{sharePrices.green}</td>
                    </tr>
                    <tr>
                        <td>Remaining</td>
                        <td>{shareNumbers.brown}</td>
                        <td>{shareNumbers.blue}</td>
                        <td>{shareNumbers.yellow}</td>
                        <td>{shareNumbers.green}</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button type='button' children='PriceUp' onClick={() => priceUp('brown')}/></td>
                        <td><button type='button' children='PriceUp' onClick={() => priceUp('blue')}/></td>
                        <td><button type='button' children='PriceUp' onClick={() => priceUp('yellow')}/></td>
                        <td><button type='button' children='PriceUp' onClick={() => priceUp('green')}/></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><button type='button' children='Get' onClick={() => getShare('brown')}/></td>
                        <td><button type='button' children='Get' onClick={() => getShare('blue')}/></td>
                        <td><button type='button' children='Get' onClick={() => getShare('yellow')}/></td>
                        <td><button type='button' children='Get' onClick={() => getShare('green')}/></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ShareTable;