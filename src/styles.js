import {Hidden, makeStyles} from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    subroot: {
        cursor: "default"
    },
    red: {
        backgroundColor: '#ff2040',
        color: '#ffffff',
    },
    navy: {
        backgroundColor: '#003080'
    },
    main: {
        flex: 1,
        overflow: 'auto',
        flexDirection: 'column',
        display: 'flex',
        color: '#ffffff',
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    },
    largeLogo: {
        height: 100,
    },
    green: {
        backgroundColor: '#00b020',
        padding: 30
    },
    cards: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: 60,
    },
    card: {
        margin: 10,
    },
    space: {
        padding: 15
    },
    media: {
        height: 200,
    },
    backLeft: {
        width: '20%',
        display: 'flex',
        justifyContent: 'flex',
        alignItems: 'flex',
        textAlign: 'center',
        cursor: 'pointer',
        paddingLeft: 20,

    },
    backArrow: {
        paddingTop: 2
    },
    backText: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 5,
        marginBottom: 10,
        fontSize: 20
    },
    order: {
        display: 'flex',
    },
    orderSub: {
        overflowY: "auto",
        height: "100vh",
        padding: 20
    },
    orderBorder: {
        borderLeft: "1px solid grey"
    },
    imageList: {
        width: 60,
        height: 60,
    },
    orderPaper: {
        padding: 10,
        margin: 10,
        cursor: 'pointer',
        alignItems: 'center',
        justifyContent: 'center',
        columns: 1,
        "&:hover":{
            backgroundColor: 'green'
        }
    },
    orderPaperTypo: {
        fontSize: 15,
        justifyContent: 'center',
        columns: 1
    }
}))