import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
// import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { useRouter } from "next/router";
const styles = {
    cardCategoryWhite: {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
    },
    cent:{
        display:" block",
        marginLeft: "auto",
        marginRight: 'auto',
        width:' 40%',
        marginTop: "10%",
      }
  };
const login = () => {
    const router = useRouter();
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    let obj={}
    const click=(e)=>{
      // window.location.href="http://localhost:3000/admin/user-profile"
      router.push('/admin/dashboard')
    }

  return (
    <div className={classes.cent}>
        <GridContainer>
            <GridItem xs={12} sm={22} md={18}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>wellcome</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={15}>
                                {/* <InputLabel style={{ color: "#AAAAAA" }}>About me</InputLabel> */}
                                    <CustomInput
                                        obj={obj}
                                        labelText="email"
                                        id="email"
                                        formControlProps={{
                                            fullWidth: true,
                                        }}
                                    />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={15}>
                                <CustomInput
                                 obj={obj}
                                  labelText="password"
                                  id="password"
                                  formControlProps={{
                                    fullWidth: true,
                                  }}
                                />
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={(e)=>{click(e)}} color="primary">login</Button>
                    </CardFooter>
                </Card>
            </GridItem>
        </GridContainer>
    </div>
  )
}
export default login;