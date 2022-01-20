import { Grid, Paper, Typography } from "@mui/material"

function BeerCard(props) {

    return (
        <Paper sx={{width: "90%", mx:"auto", my: [2], p:[2]}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography sx={{m:1}} variant="h2">{props.data.name}</Typography>
                </Grid>
                <Grid item xs={6} container>
                    <Grid item xs={12}>
                        <Typography>Category</Typography>
                        <Typography>{props.data.category}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Alcohol by Volume (ABV) </Typography>
                        <Typography>{props.data.abv.toFixed(2)}%</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>International Bitterness Unit (IBU) </Typography>
                        <Typography>{props.data.ibu}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Typography>Description</Typography>
                    <Typography>{props.data.description}</Typography>
                </Grid>
            </Grid>
        </Paper>
    )

}

export default BeerCard