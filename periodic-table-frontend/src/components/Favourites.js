import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import { AppUserFavUpdate, AppUserGetDb } from "./Firebase";
import Avatar from "react-avatar";
import { FcFullTrash, FcRemoveImage, FcWikipedia } from "react-icons/fc";
import { MdExpandMore } from "react-icons/md";
import { red } from "@mui/material/colors";
import { margin } from "@mui/system";
import { IoTrashBin } from "react-icons/io5";
import ElementValue from "../Modal/ElementValue";
import ElementLable from "../Modal/ElementLable";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Favourites = ({ user }) => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const calculateTempEquivs = (value) => {
    let kelvin = value;
    let temp = value;
    if (kelvin != null) {
      // 1K − 273.15 = -272.1°C
      kelvin = kelvin.toFixed(2);
      const celsius = (kelvin - 273.15).toFixed(2);
      const fahrenheit = ((celsius * 9) / 5 + 32).toFixed(2);
      temp = `${kelvin}K = ${celsius}°C = ${fahrenheit}°F`;
    }
    return temp;
  };
  const handleExpandClick = (key) => {
    if (expanded === key) {
      setExpanded(false);
    } else {
      setExpanded(key);
    }
  };

  const handleDelete = (key) => {
    const newFavourites = favourites.filter((fav) => fav.number !== key);
    setFavourites(newFavourites);
    AppUserFavUpdate(newFavourites);
  };

  useEffect(() => {
    AppUserGetDb().then((data) => {
      setFavourites(data["favourites"]);
      setLoading(false);
    });
  }, []);
  console.log("d", favourites);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div>
        <Grid container spacing={0} justifyContent={"center"}>
          {favourites.map((favourite) => (
            <Card
              sx={{
                maxWidth: 400,
                margin: "30px",
                borderRadius: "20px",
                backgroundColor: "#f5f5f5",
                boxShadow: "none",
              }}
              key={favourite.number}
            >
              <CardHeader
                avatar={
                  <Tooltip
                    title="Remove from favourites"
                    placement="top"
                    arrow
                    interactive="true"
                    width={900}
                  >
                    <span>
                      <IoTrashBin
                        size={20}
                        opacity={0.8}
                        onClick={() => handleDelete(favourite.number)}
                      ></IoTrashBin>
                    </span>
                  </Tooltip>
                }
                title={favourite.name}
                subheader={favourite.symbol}
              />
              <CardMedia
                component="img"
                height="300"
                image={favourite.image.url}
                alt={favourite.name}
                sx={{
                  borderRadius: "20px",
                  width: "90%",
                  margin: "auto",
                }}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {favourite.summary.split(" ").slice(0, 20).join(" ")}
                  <Tooltip
                    title={favourite.summary}
                    placement="top"
                    arrow
                    interactive="true"
                    width={900}
                  >
                    <span> ...</span>
                  </Tooltip>
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <Tooltip
                  title={
                    <>
                      <img
                        src={favourite.bohr_model_image}
                        alt="bohr model"
                        width={200}
                        height={200}
                      />
                    </>
                  }
                  placement="top"
                >
                  <p>Bohr's Model</p>
                </Tooltip>

                <ExpandMore
                  expand={expanded === favourite.number ? true : false}
                  onClick={() => handleExpandClick(favourite.number)}
                  aria-expanded={expanded === favourite.number ? true : false}
                  aria-label="show more"
                >
                  <MdExpandMore />
                </ExpandMore>
              </CardActions>
              <Collapse
                in={expanded === favourite.number ? true : false}
                timeout="auto"
                unmountOnExit
              >
                <CardContent
                  justifyContent={"left"}
                  style={{
                    color: "white",
                  }}
                >
                  <ElementLable label="Overview" />
                  <ElementValue
                    label="Discovered by: "
                    value={
                      favourite.discovered_by ? favourite.discovered_by : "--"
                    }
                  />
                  <ElementLable label="Properties" />
                  <ElementValue
                    label="Atomic Number: "
                    value={favourite.number}
                  />
                  <ElementValue
                    label="Atomic Mass: "
                    value={`${favourite.atomic_mass} (g/mol)`}
                  />
                  <ElementValue
                    label="Melting Point: "
                    value={calculateTempEquivs(favourite.melt)}
                  />
                  <ElementValue
                    label="Boiling Point: "
                    value={calculateTempEquivs(favourite.boil)}
                  />
                  <ElementValue
                    label="Electron Configuration: "
                    value={favourite.electron_configuration}
                  />
                </CardContent>
              </Collapse>
            </Card>
          ))}
        </Grid>
      </div>
    );
  }
};

export default Favourites;
