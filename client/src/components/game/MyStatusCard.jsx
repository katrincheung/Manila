import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 200,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

function MyStatusCard({ name, money, shareList }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
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