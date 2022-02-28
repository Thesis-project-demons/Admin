import React from "react";
import  { useState, useEffect } from 'react'
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import  {ArrowDownward}  from "@material-ui/icons";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
import axios from "axios"
// layout for this page
import Admin from "layouts/Admin.js";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { bugs, website, server } from "variables/general.js";
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts.js";
import styles from "assets/jss/nextjs-material-dashboard/views/dashboardStyle.js";

var emailData= {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  series: [[0, 0, 0, 0,0,0,0,0,0,0,0,0]],
}
var Time = [24,3,6,9,12,13,18,21]
var userLoggin = {
  labels: ["12AM", "3PM", "6PM", "9PM", "12PM", "3AM", "6AM", "9AM"],
  series: [[0, 0, 0, 0, 0, 0, 0, 0]],
 }
 function TheRightInterval(time){ 
var hour = parseInt(time[0]) 
console.log(hour , " Se")
var  best= 100
var  bestTime = 100 
for (let i = 0 ; i<Time.length-1; i ++){
if(Math.abs(Time[i]-hour)<best) 
{ 
  bestTime=  i 
  best = Math.abs(Time[i]-hour) 
}
}
return bestTime
 }
var arr2 = []
function max(s){
var x =s.substr(0 , s.indexOf("T"))
var all  = x.split("-")
console.log(all)
var result =  []
for (let i = 0 ; i< all.length; i ++){
result.push(parseInt(all[i]))
}
return result
}
function is_leap (year){
return( year%4==0 && (year%100!=0 || year%400==0))
}
function Dashboard() {
var data = {
  labels: [],
  series: [[0, 0, 0, 0, 0, 0, 0]],
}
const [color , setcolor] = useState("green") 
const [doesItUp , setdoesItUp] = useState(0)
const [howManyUsersToday, sethowManyUsersToday] = useState(0);
const [howMuchMoney, sethowMuchMoney] = useState(0);
const [howMuchChange, sethowMuchChange] = useState(0);
const [userList, setuserList]= useState([[]])
const [dash , setDash] = useState({label:[] , 
    series:[[0,0,0,0,0,0,0]],
    })
const [bugs , setbugs]= useState([])
const[weebsite  , setweebsite] = useState([])
const[server , setserver]= useState([])

var dayOfTheWeek =  ["M", "T", "W", "T", "F", "S", "S"] 
function DoTheDay(){ 
  var numberOfTheDay = new Date().getDay()
  for (let i = 0 ; i < 7 ; i ++ ){ 
    if((numberOfTheDay-1)-i<0){
   data.labels.push(dayOfTheWeek[((numberOfTheDay-1)-i)+7] ) 
   }
   else 
   data.labels.push(dayOfTheWeek[(numberOfTheDay-1)-i])
  }
  data.labels.reverse()
}
function existe(x,  arr){ 
for (let i  = 0 ; i< arr.length ; i++){ 
if(arr[i][0]==x)
return true 
}
return false 
}
function is_in_interval (arr){ 
  var year = new Date().getFullYear()
  var month = new Date().getMonth()
  var day = new Date().getDate()
  var intervalmonth =month
 var intervalday = day 
  if(parseInt(arr[0])==year)
                  { 
            if(day- 7 <0){
              intervalmonth = month-1
              if(month-1==2){
          if(is_leap(year))
             intervalday = 29 - Math.abs((day)- 7)
             else 
                 intervalday = 28 - Math.abs((day)- 7) 
             }
             else 
             {
             if([1,3,5,7,8,10,12].indexOf(month-1)!=-1)
             intervalday= 31-Math.abs((day)- 7)
             else 
              intervalday = 30-Math.abs((day)- 7)
             }
                    // check if  the month the febr has 29 28 
               }
               else 
               {
                intervalday = 31 - ((day)- 7)
              }     
             if(intervalday<= parseInt(arr[2]) &&  parseInt(arr[2])<=day){
               return true 
             }
                  }
 return false 
}
var count = 0 
 useEffect(async () => {
   await DoTheDay()
    // function  for getting followers last from now to week before 
        await  axios.get("http://localhost:5000/admin/getAllUsers").then(res=>{
           var year = new Date().getFullYear()
           var month = new Date().getMonth()
           var day = new Date().getDate()
           var intervalmonth =month
          var intervalday = day 
var m = new Map()
            for (var i = 0 ; i< res.data.length ; i ++){
              if(!m.has(res.data[i].user_id))
      m.set(res.data[i].user_id , [res.data[i].user_id,res.data[i].email , res.data[i].stars])
         var login = res.data[i].last_time_logged ; 
         var time = login.substr(login.indexOf("T")+1, 8).split(':')
         userLoggin.series[0][TheRightInterval(time)]++   
            var dateofUser =res.data[i].login_time
            var login_dat = dateofUser.split("T")
            var login_data = login_dat[0].split('-')
             emailData.series[0][parseInt(login_data[1])-1]++
                 if(parseInt(login_data[0])==year)
                  { 
            if(day- 7 <0){
              intervalmonth = month-1
              if(month-1==2){
          if(is_leap(year))
             intervalday = 29 - Math.abs((day)- 7)
             else 
                 intervalday = 28 - Math.abs((day)- 7) 
             }
             else 
             {
             if([1,3,5,7,8,10,12].indexOf(month-1)!=-1)
             intervalday= 31 -  Math.abs((day)- 7)
             else 
              intervalday = 30 -  Math.abs((day)- 7)
             }
                    // check if  the month the febr has 29 28 
               }
               else 
               {
                intervalday = 31 - ((day)- 7)
              }     
              console.log(intervalday," ", login_data[2]," " , day )
             if(intervalday<= parseInt(login_data[2]) &&  parseInt(login_data[2])<=day){
              ++count
             }
                  }            
           }
           sethowManyUsersToday(count) 

           for (let [key,val] of m){ 
            if(!existe(key, arr2 ))
            arr2.push(val)
           }
           arr2.sort(function(a,b){ 
            return b[2]- a[2]
            })
            setuserList(arr2)
        })
        // function of users is Done here 
        var prices = []
        await axios.get("http://localhost:5000/admin/getAllPrices").then(res1=>{
        prices=JSON.parse(res1.data[res1.data.length-1].price) 
        })
        var money = 0 
        var map = new Map()
        // function to All revenues  
await axios.get("http://localhost:5000/admin/getAllMechanic").then(res=> { 
for (let i = 0 ; i< res.data.length; i ++){
money+=prices[res.data[i].subscription] 
var arr1 = max(res.data[i].login_time)
if(is_in_interval(arr1)) { 
data.series[0][6-(parseInt(arr1[1])-1)]++ 
}
}
var percent =data.series[0][6] - data.series[0][5]
if(percent<0){
  setdoesItUp((data.series[0][6] - data.series[0][5] )* 10)
setcolor("red")  
}
else 
setdoesItUp((data.series[0][6] - data.series[0][5] )* 10)
})
console.log(data)
setDash(data)
console.log(dash)
sethowMuchMoney(money)
///// ************************* function of revenus is done 
var admin  = ""
var server = ""
var App = ""
await axios.get("https://api.github.com/repos/wajihnajjar/Admin").then(res=> { 
admin=res.data.updated_at
  })
  await axios.get("https://api.github.com/repos/wajihnajjar/Server").then(res=> { 
    server=res.data.updated_at
      })
await axios.get("https://api.github.com/repos/wajihnajjar/AppUser").then(res=> { 
  App=res.data.updated_at
    })
var still =""

var a = max(admin)
var b  = max(server) 
var c = max(App)
var maxy = []
if(a>b){
maxy = a
still = admin 
}
else {
maxy = b
still = server
}
if(maxy<c){ 
maxy = c 
still =App 
}
var last =[]
var length = 0 
await axios.get("http://localhost:5000/admin/getAllGithub").then(res=> { 
console.log(res.data)
length = res.data.length
 last = max(res.data[length-1].last)
})
if(last<maxy){
await axios.post("http://localhost:5000/admin/changeGithubRepo" ,{github : still}).then(res=> { 
console.log('Change Done')
})
}
else 
sethowMuchChange(length)
var f=[] // weebsite
var y =[] // Server
var k =[] // reste
await axios.get("http://localhost:5000/admin/getReview").then(res=> { 
console.log(res.data)
for (let  j = 0 ; j <res.data.length ; j ++){ 
if(res.data[j].review.toLowerCase().indexOf("weebsite")!=-1) { 
f.push (res.data[j].review)
}
else 
if(res.data[j].review.toLowerCase().indexOf("server")!=-1){
y.push(res.data[j].review)
}
else
k.push(res.data[j].review)

}

setbugs(k)
setweebsite(f)
setserver(y)


})
},[])

const useStyles = makeStyles(styles);
  const classes = useStyles();
  return (
    <div>
      <GridContainer>

        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="dark" stats icon>
              <CardIcon color="dark">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Revenue</p>
              <h3 className={classes.cardTitle}>${howMuchMoney}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                What You Earned
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Fixed Issues</p>
              <h3 className={classes.cardTitle}>{howMuchChange}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Tracked from Github
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+{howManyUsersToday}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dash}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText} style={{color:color}}>                 
                 {doesItUp>0 ?  <ArrowUpward className={classes.upArrowCardCategory} /> : <ArrowDownward style={{color:"red"}} />}  {doesItUp }%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailData}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>User Subscriptions</h4>
              <p className={classes.cardCategory}>Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Status sent 1 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="dark">
              <ChartistGraph
                className="ct-chart"
                data={userLoggin}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Trafic Of Your WeebSite</h4>
              <p className={classes.cardCategory}>Time of Logged Users in Specific Time</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Status Update 1 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="dark"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0]}
                    tasks={bugs}
                  />
                ),
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0]}
                    tasks={weebsite}
                  />
                ),
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0]}
                    tasks={server}
                  />
                ),
              },
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Stars"]}
                tableData={userList}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
Dashboard.layout = Admin;
export default Dashboard;
