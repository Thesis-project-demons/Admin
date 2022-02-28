import React, {useState,useEffect} from "react";
// @material-ui/core components
import {makeStyles} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import axios from 'axios'
import avatar from "assets/img/faces/marc.jpg";
import FormData from "form-data";
const styles = {
    cardCategoryWhite: {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    }
};

function UserProfile() {
    const useStyles = makeStyles(styles);
    const classes = useStyles();
    var [toggle, setToggle] = useState(false)
    var [admin, setadmin] = useState([])
    let parse= localStorage.getItem('user')
    let user= JSON.parse(parse)
    useEffect(()=>{
      axios.get("http://localhost:5000/admin/getinfo").then(res=>setadmin(res.data[0]))
    },[])
    const obj = {};
    const click = (e) => {
        console.log("fezzz nayek", obj)
        const formData = new FormData();
        formData.append("file", obj.img);
        formData.append("upload_preset", "iyhf8gx0");
        axios.post("https://api.cloudinary.com/v1_1/dod9yhmlt/image/upload",formData)
        .then((res)=>{
          obj.img=res.data.url
          obj['id']=user.admin_id

        }).then(()=>{
          axios.post("http://localhost:5000/admin/update",obj).then((res)=>{
            if(res.data === "done"){
              setToggle(false)
            }
          })
        })
    }


    return (
    <div> 
    {console.log(admin)}
         {toggle ?
           <div>
           <GridContainer>
                <GridItem xs={12}
                    sm={12}
                    md={8}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={
                                classes.cardTitleWhite
                            }>Edit Profile</h4>
                            <p className={
                                classes.cardCategoryWhite
                            }>Complete your profile</p>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12}
                                    sm={12}
                                    md={3}>
                                    <CustomInput obj={obj}
                                        labelText="Email address"
                                        id="email"
                                        formControlProps={
                                            {fullWidth: true}
                                        }/>
                                </GridItem>
                                <GridItem xs={12}
                                    sm={12}
                                    md={4}>
                                    <CustomInput obj={obj}
                                         
                                        labelText="password"
                                        type={"password"}
                                        id="password"
                                        formControlProps={
                                            {fullWidth: true,}
                                        }/>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12}
                                    sm={12}
                                    md={6}>
                                    <CustomInput obj={obj}
                                        labelText="First Name"
                                        id="firstName"
                                        formControlProps={
                                            {fullWidth: true}
                                        }/>
                                </GridItem>
                                <GridItem xs={12}
                                    sm={12}
                                    md={6}>
                                    <CustomInput obj={obj}
                                        labelText="Last Name"
                                        id="lastName"
                                        formControlProps={
                                            {fullWidth: true}
                                        }/>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12}
                                    sm={12}
                                    md={4}>
                                    <CustomInput obj={obj}
                                        labelText="img"
                                        id="img"
                                        type={"file"}
                                        formControlProps={
                                            {fullWidth: true}
                                        }/>
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12}
                                    sm={12}
                                    md={12}>
                                    <InputLabel style={
                                        {color: "#AAAAAA"}
                                    }>About me</InputLabel>
                                    <CustomInput obj={obj}
                                        labelText="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                                        id="about"
                                        formControlProps={
                                            {fullWidth: true}
                                        }
                                        inputProps={
                                            {
                                                multiline: true,
                                                rows: 5
                                            }
                                        }/>
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button onClick={
                                    (e) => {
                                        click(e);
                                        
                                    }
                                }
                                color="primary">done</Button>
                        </CardFooter>
                    </Card>
                </GridItem>
                
              
           </GridContainer>
           </div>
           :
            <div  >
              <GridContainer>
                  
              <GridItem xs={12}
                    sm={12}
                    md={4}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo"
                                onClick={
                                    (e) => e.preventDefault()
                            }>
                                <img src={admin.src}
                                    alt="..."/>
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={
                                classes.cardCategory
                            }>CEO / CO-FOUNDER</h6>
                            <h4 className={
                                classes.cardTitle
                            }>
                               {admin.firstName} {admin.lastName}
                            </h4>
                           
                            <p className={
                                classes.description
                            }>
                                {admin.about}
                            </p>
                            <Button onClick={
                                    () => {
                                        setToggle(true)
                                    }
                                }
                                color="primary"
                                round>
                                Update Profile
                            </Button>
                        </CardBody>
                    </Card>
                    </GridItem>
      
              </GridContainer>
            </div>
          }
            
                
    </div>
  );
}

UserProfile.layout = Admin;

export default UserProfile;
