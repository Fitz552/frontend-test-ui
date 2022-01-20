import { Button, CircularProgress, Grid } from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import BeerCard from "../components/BeerCard"

function List() {
    const itensPerPage = 10;
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [displayData, setDisplayData] = useState([])
    const [numberItens, setNumberItens] = useState(itensPerPage)

    useEffect(() => {
        axios.get("http://localhost:3000")
        .then(response => {
            setData(response.data)
            console.log(response.data[0])
        }
        )
        .then(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setDisplayData(data)
    }, [data])


    const handleClick = () => {
        setNumberItens(numberItens + itensPerPage)
    }

    return (
        <div>
            {loading?
                <CircularProgress/>
            :
                <>
                <Grid container sx={{width: "80%", mx: "auto"}}>
                    {displayData.map ( (beer, index) => {
                        return (
                            (index < numberItens) ? 
                                <Grid item xs={12} md={6}>
                                    <BeerCard data = {beer}/>
                                </Grid>
                            :
                            null
                        )
                    })
                }
                </Grid>
                <Button onClick={handleClick}> Load More </Button>
                
                </>
            }
        </div>
    )
}

export default List
