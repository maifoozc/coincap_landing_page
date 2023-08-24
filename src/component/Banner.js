import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
  } from "@material-ui/core";
  import axios from 'axios';
  import React, { useEffect, useState } from "react";
  import "./Banner.scss";
  
  export default function Banner() {
    const api = "https://api.coincap.io/v2/assets";
  
    const [data, setData] = useState([]);
  
    const pageSize = 50;
    const [currentPage, setCurrentPage] = useState(1);
  
    async function fetchData() {
      try {
        let response = await axios.get(api);
  
        setData((prevData) => [...prevData, ...response.data.data]);
      } catch (error) {
        console.error("error while fetching data: ", error);
      }
    }
    const totalPage = Math.ceil(data.length / pageSize);
  
    const sliceData = data.slice(0, 50 * currentPage);
  
    const [maxPage, setMaxPage] = useState(false);
  
    const loadMore = () => {
      setCurrentPage(currentPage + 1);
      setMaxPage(true);
    };
    useEffect(() => {
      fetchData();
    }, [currentPage]);
  
    const convertToReadableFormat = (number) => {
      if (number >= 1e9) {
        return (number / 1e9).toFixed(2) + " b";
      } else if (number >= 1e6) {
        return (number / 1e6).toFixed(2) + " m";
      }
    };
  
    return (
      <div>
        <div className="banner_heading">
          <div className="banner_heading_subtitle">
            <Typography>MARKET CAP</Typography>
            <Typography>$1.06T</Typography>
          </div>
          <div className="banner_heading_subtitle">
            <Typography>EXCHANGE VOL</Typography>
            <Typography>$20.12B</Typography>
          </div>
          <div className="banner_heading_subtitle">
            <Typography>ASSETS</Typography>
            <Typography>2,296</Typography>
          </div>
          <div className="banner_heading_subtitle">
            <Typography>EXCHANGES</Typography>
            <Typography>73</Typography>
          </div>
          <div className="banner_heading_subtitle">
            <Typography>MARKETS</Typography>
            <Typography>11,370</Typography>
          </div>
          <div className="banner_heading_subtitle">
            <Typography>BTC DOM INDEX</Typography>
            <Typography>47.9%</Typography>
          </div>
        </div>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Market Cap</TableCell>
                <TableCell align="right">VWAP (24Hr)</TableCell>
                <TableCell align="right">Supply</TableCell>
                <TableCell align="right">Volume (24Hr)</TableCell>
                <TableCell align="right">Change (24Hr)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sliceData.map((e) => (
                <TableRow key={e.id}>
                  <TableCell>{e.rank}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center"
                      }}
                    >
                      <img
                        src={`https://assets.coincap.io/assets/icons/${e.symbol.toLowerCase()}@2x.png`}
                        alt={e.name}
                        style={{ maxWidth: "2.5rem", padding: "0.5rem" }}
                      />
  
                      <div>
                        <Typography>{e.name}</Typography>
                        <Typography
                          style={{ color: "grey", fontSize: "0.75rem" }}
                        >
                          {e.symbol}
                        </Typography>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    {"$" + parseFloat(e.priceUsd).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {"$" + convertToReadableFormat(e.marketCapUsd)}
                  </TableCell>
                  <TableCell align="right">
                    {parseFloat(e.vwap24Hr).toFixed(2)}
                  </TableCell>
                  <TableCell align="right">
                    {"$" + convertToReadableFormat(e.maxSupply)}
                  </TableCell>
                  <TableCell align="right">
                    {"$" + convertToReadableFormat(e.volumeUsd24Hr)}
                  </TableCell>
                  <TableCell align="right">
                    {parseFloat(e.changePercent24Hr).toFixed(2) + "%"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
        >
          {!maxPage && (
            <Button onClick={loadMore} variant="contained" color="primary">
              Load More
            </Button>
          )}
        </div>
      </div>
    );
  }
  