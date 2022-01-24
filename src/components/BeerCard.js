import { Grid, Paper, Typography, Button     } from "@mui/material"
import {useState} from "react"

function BeerCard(props) {

    const [readMore, setReadMore] = useState(false)

    const handleClick = () => {
        setReadMore(true)
    }

    return (
        <Grid container className="full-area">
            <Paper className="full-area " elevation={3}> 
                <Grid item xs={12} className="card-title" sx={{p:1}}>
                    <Typography  variant="h3">{props.data.name}</Typography>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={6} sx={{px:1}} className="bordered">
                        <Typography className="title">Category</Typography>
                        <Typography>{props.data.category}</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{px:1}} className="bordered">
                        <Typography className="title">ABV</Typography>
                        <Typography>{props.data.abv.toFixed(2)}%</Typography>
                    </Grid>
                    <Grid item xs={3} sx={{px:1}} className="bordered">
                        <Typography className="title">IBU</Typography>
                        <Typography>{props.data.ibu}</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{px:1}} className="bordered">
                    <Typography className="title">Address</Typography>
                    <Typography>
                        {props.data.address},   
                        {` ${props.data.city}`} - {props.data.state}                        
                    </Typography>
                    <Typography>
                        {props.data.country}
                    </Typography>
                </Grid>
                <Grid item xs={12} sx={{px:1}}>
                    <Typography className="title">Description</Typography>
                        {
                        props.data.description ?    
                            props.data.description.length > 300 && !readMore ?
                            <>
                                <Typography>
                                    {props.data.description.substring(0,299)}
                                    <Button onClick={handleClick}>
                                        Read More
                                    </Button>
                                </Typography>
                            </>
                            :
                            <Typography>
                            {props.data.description}
                            </Typography>
                        :
                            null
                        }
                </Grid>
            </Paper>
        </Grid>
    )

}

export default BeerCard