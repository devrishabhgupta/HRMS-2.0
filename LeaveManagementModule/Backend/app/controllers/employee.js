var router = require('express').Router();
var sGrid = require('../../sendgrid');
const sql = require('mssql');
var mssqlConfig = require('../../config/mssql');

//Database Connection
var connect = mssqlConfig.CreateConnection(
{
    host:'DESKTOP-OHFBEH1',
    user:'root',
    password:'admin',
    database:'PROJECTHRMS2'
})

connection.connect (function (error){
    if(!!error){
        console.log('Error')
    }
    else {
        console.log('Connected')
        
}
});
    




var employee = {
    //all methods for Employee Controller

    //Sample Method of Employee Controller
    'sample' : (req,res) => {
        res.send("Welcome to HRMS");
    },
    'sendEmail' : (req,res) => {
        console.log(sGrid);
        res.send(sGrid.send());
    },
    'createLeave' : (req,res) => {
        if(!req.params.id)
        { res.status(400).json({
             message : "Employee Id Required",
         }); 
         } //Procedure for creating a request 
         sql.connect(mssqlConfig).then(() => {
             return sql.query("exec pConditionForLeave @EmployeeId= "+EmployeeId+", @LeaveId="+LeaveId+", @StartDate="+StartDate+", @EndDate="+EndDate+"; ")
             
         }).then(result => { 
             res.status(201).json({"message" : "leave request created"});
             console.dir(result)
         }).catch(err => {
             // ... error checks
         })
        sql.close();   //closing a database connection 
    },
    'getLeaves' : (req,res) => {
      
            if(!req.params.id)
           { res.status(400).json({
                message : "Employee Id Required",
            }); 
            } 
           // View showing employee leave details
        
           sql.connect(mssqlConfig).then(() => {
           return sql.query("SELECT fUserLeaveDetail (@EmployeeId= "+EmployeeId+", @LeaveId="+LeaveId+") as result")
           }).then(result => {
           res.status(201).json({"message" : "My Request Table"});
               console.dir(result)
           }).catch(err => {
               
           })
        sql.cose();
           },
         
       /* 
        var data = [{ "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Approved',"by":'25/01/2019',"request":'Manager'},
            { "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Approved',"by":'25/01/2019',"request":'Manager'}
            ,{ "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Approved',"by":'25/01/2019',"request":'Manager'},
            { "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Approved',"by":'25/01/2019',"request":'Manager'},
            { "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Approved',"by":'25/01/2019',"request":'Manager'}
           ];
            res.json({"leaves":data});
            
        },*/
        'getLeavesByStatus' : (req,res) => {
      
            if(!req.params.id || !req.params.status)
           { res.status(400).json({
                message : "Employee Id Required",
            }); 
            } 
            //view showing employee leave status
            
             sql.connect(mssqlConfig).then(() => {
           return sql.query("SELECT fUserLeaveStatus (@ManagerId='"+ManagerId+"') as result") 
           }).then(result => {
           res.status(201).json({"message" : "Leave Status"});
               console.dir(result)
           }).catch(err => {
               
           })
        sql.cose();
           },
            
            /*console.log(req.params.status);

            var data = [{ "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Approved',"by":'25/01/2019',"request":'Manager'},
            { "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Open',"by":'25/01/2019',"request":'Manager'}
            ,{ "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Open',"by":'25/01/2019',"request":'Manager'},
            { "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Closed',"by":'25/01/2019',"request":'Manager'},
            { "type":'Medical',"startDate" : '21/01/2019', "endDate" : '22/01/2019', "nDays":'2',"status":'Closed',"by":'25/01/2019',"request":'Manager'}
           ];
           let filteredData =  data.filter(leave => leave.status == req.params.status)
            res.json({"leaves":filteredData});
            */
        },

    'getBalanceLeaves' : (req,res) => {

        if(!req.params.id)
        { res.status(400).json({
             message : "Employee Id Required",
         }); 
         } 
        //View showing employee leave balance
        sql.connect(mssqlConfig).then(() => {
           return sql.query("SELECT fUserLeaveBalance (@EmployeeId='"+EmployeeId+"') as result") 
           }).then(result => {
           res.status(201).json({"message" : "Balance Leaves Status"});
               console.dir(result)
           }).catch(err => {
               
           })
        sql.cose();
           },
        
        
         /*var data = [
         { "type":'Casual Leave',"total" : 10 , "balance" : 10 , "pending":0,"approved":0,"rejected":0},
         { "type":'Sick Leave',"total" : 15 , "balance" : 15 , "pending":0,"approved":0,"rejected":0},
         { "type":'Earned Leave',"total" : 15 , "balance" : 15 , "pending":0,"approved":0,"rejected":0},
         { "type":'Leave Without Pay',"total" : 0 , "balance" : 0 , "pending":0,"approved":0,"rejected":0},
         { "type":'Marital Leave',"total" : 5 , "balance" : 5 , "pending":0,"approved":0,"rejected":0},
         { "type":'Breavement Leave',"total" : 3 , "balance" : 3 , "pending":0,"approved":0,"rejected":0},  
         { "type":'Work From Leave',"total" : 0 , "balance" : 0 , "pending":0,"approved":0,"rejected":0}
        ];

        
         res.json({"leaves":data});*/

   
    'getHolidaysList' : (req,res)=>{

        var data = [
            {'name':"New Years Day","date":"Jan 01, 2019","location" : "India"},
            {'name':"Holi","date":"Mar 21, 2019","location" : "India"},
            {'name':"Good Friday","date":"April 19,2019","location" : "India"}
        ];

        res.json({"holidays":data});
    } 
} 

module.exports = employee
    
    