import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    container: {
        backgroundColor: theme.palette.background.paper
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        align: "right"
    },
    tableRow: {
        "&$hover:hover": {
            backgroundColor: "blue"
        }
    },
}))

export default useStyles;