import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';




function PlayerStatusCard({ name, money, shareNumber }) {

    return (
        <Card >
            <CardContent>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" component="p">
                    money: {money}
                    <br />
                    shares: {shareNumber}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default PlayerStatusCard;