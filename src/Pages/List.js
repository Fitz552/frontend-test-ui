import { Button, CircularProgress, Container, Grid, TableSortLabel, Typography } from "@mui/material";
import axios from "axios";
import {useEffect, useState} from "react";
import BeerCard from "../components/BeerCard"
import FilterField from "../components/FilterField";

function List() {
    const itensPerPage = 10;
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [displayData, setDisplayData] = useState([])
    const [numberItens, setNumberItens] = useState(itensPerPage)
    const [filteredCountry, setFilteredCountry] = useState([])
    const [filteredCategory, setFilteredCategory] = useState([])
    const [sort, setSort] = useState({abv: 0, ibu:0})

    const getPropertyValues = (data, property) => {
        let aux = []
        data.map (value => {
            if (aux.includes(value[property])) {
                return null
            }
            else {
                if (value[property]) {
                    aux.push(value[property])
                }
                return null
            }
        })
        return aux
    }

    useEffect(() => {
        axios.get("http://localhost:3000")
        .then(response => {
            setData(response.data)
        }
        )
        .then(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setDisplayData(data)
    }, [data])

    useEffect(() => {
        let aux = [...data]
        if (filteredCountry.length>0) {
            aux = aux.filter(value => {
                return (filteredCountry.includes(value.country))
            })
        }
        if (filteredCategory.length>0) {
            aux = aux.filter(value => {
                return (filteredCategory.includes(value.category))
            })
        }
        setDisplayData(aux)
    }, [filteredCountry, filteredCategory])

    useEffect (() => {
        let aux = [...displayData]
        Object.keys(sort).map(key => {
            if (sort[key]) {
                aux.sort((a,b) => {return (sort[key]*(a[key]-b[key]))})
            }
            return null
        })
        setDisplayData(aux)
    }, [sort])


    const handleClick = () => {
        setNumberItens(numberItens + itensPerPage)
    }

    const handleSortClick = (e) => {
        if (sort[e.target.name]===0) {
            setSort({...sort, [e.target.name]: 1})
        } 
        else { 
            setSort({...sort, [e.target.name]: -sort[e.target.name]})
        }
    }


    return (
        <div>
            <Typography variant="h2" align="center" className="header" sx={{my: 1}}>
                Beer Database
            </Typography>
            {loading?
                <Container sx={{mx: "auto", my: "auto"}}> 
                    <CircularProgress/>
                </Container>
            :
                <>
                <Grid container sx={{width: "80%", mx: "auto", mt: 1}} spacing = {2}>
                    <Grid item xs={6} container>
                        <Grid item>
                            <Typography>Filter</Typography>
                        </Grid>
                        <Grid item container>
                            <FilterField property= "country" options={getPropertyValues(data, "country")} state= {filteredCountry} setState = {setFilteredCountry}/>
                            <FilterField property= "category" options={getPropertyValues(data, "category")} state= {filteredCategory} setState = {setFilteredCategory}/>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} container  justifyContent="flex-end">
                        <Grid item container xs={4}>
                            <Typography>Sort by:</Typography>
                        </Grid>
                        <Grid item container justifyContent="flex-end" xs={12}>
                            <Button name = "abv" onClick = {handleSortClick}>
                                <TableSortLabel active={Boolean(sort.abv)} direction={sort.abv === 1 ? "asc" : "desc"} sx={{pointerEvents: "none"}}/>
                                ABV
                            </Button>
                            <Button name = "ibu" onClick = {handleSortClick}>
                                <TableSortLabel active={Boolean(sort.ibu)} direction={sort.ibu === 1 ? "asc" : "desc"} sx={{pointerEvents: "none"}}/>
                                IBU
                            </Button>
                        </Grid>
                    </Grid>
                        {displayData.map ( (beer, index) => {
                            return (
                                (index < numberItens) ? 
                                    <Grid item xs={12} md={6} key={beer.name}>
                                        <BeerCard data = {beer}/>
                                    </Grid>
                                :
                                null
                            )
                        })
                        }
                </Grid>
                <div className="flex-center">
                    <Button onClick={handleClick} sx={{m:1}} > Load More </Button>
                </div> 
                
                </>
            }
        </div>
    )
}

export default List