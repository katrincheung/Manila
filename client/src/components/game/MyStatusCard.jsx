import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';



function MyStatusCard({ name, money, shareList }) {

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {name}
                </Typography>
                <Typography variant="body2" component="p">
                    money: {money}
                    <br />
                    Brown: {shareList.brown} Blue:{shareList.blue}
                    <br />
                    Yellow: {shareList.yellow} Green:{shareList.green}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default MyStatusCard;