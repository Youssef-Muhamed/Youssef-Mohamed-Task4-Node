const deal = require("../helpers/dealWithJson")
const showAll = (req,res)=>{
    const users = deal.readData()
    res.render("showAll", {
        pageTitle:"All Users",
        users,
        isEmpty:users.length==0 ?true : false
    })
}
const show = (req,res)=>{
    let userId = req.params.accNum
    const allUsers = deal.readData();
    let user = allUsers.find(u=>u.accNum == userId)
    res.render("show", {
        pageTitle:"User Data",
        user,
        isEmpty: user?false : true
    })
}
const addUser = (req,res)=>{
  
    res.render("add", {
        pageTitle:"Add New User"
    })
}
const addLogic = (req,res)=>{
    let user = {
        accNum:Date.now(),
        ...req.body,
        op:[]
    }
        let data = deal.readData()
        data.push(user)
        deal.writeData(data)
        res.redirect("/")
}
const editUser = (req,res)=>{
    let userId = req.params.accNum
    const allUsers = deal.readData();
    let user = allUsers.find(u=>u.accNum == userId)
    res.render("edit", {
        pageTitle:"Edit User",
        user
    })
}
const editUserLogic =(req,res)=>{
    let userId = req.params.accNum
    const allUsers = deal.readData();
    let index = allUsers.findIndex(u=>u.accNum == userId)
    let newUser = {
        accNum:userId,
        ...req.body,
        op:[]
    }
    allUsers[index]  = newUser
     deal.writeData(allUsers)
     res.redirect("/")
  }


const deleteUser = (req,res)=>{
    let userId = req.params.accNum
    const users = deal.readData()
    let data = users.filter(u=> u.accNum!=userId)
    deal.writeData(data)
    res.redirect("/")
}

const addOp = (req,res)=>{
  
    res.render("addOp", {
        pageTitle:"Add Operation"
    })
}



const addOpLogic = (req,res)=>{
    let userId = req.params.accNum
    const allUsers = deal.readData();
    let user = allUsers.find(u=>u.accNum == userId)
    const op = req.body.op
    const number = req.body.value
    let message = ""
    let messageSuc = ""
    if(op == "withdrow") {
        
        if(number >= 6000)  message +=   'You Not withdrow Alot Of 6000 EGP'
       else if(user.rBalance < number ) message +='Sorry You Not Have Money'
        else {
            user.rBalance -= Number(number)
            let userOp = user.op
            userOp.push({type:"Withdrow",value:number,theDate:(new Date()).toUTCString()})
            messageSuc += 'operation Success'
        }
     }
     else if(op == "add") {
        user.rBalance += Number(number) 
        let userOp = user.op
        userOp.push({type:"Add",value:number,theDate:(new Date()).toUTCString()})
        messageSuc += 'operation Success'
    }
    deal.writeData(allUsers)
   res.render("addOp", { 
       message,
       messageSuc,
       user,
       isEmpty: user?false : true
    })
        
}
// const showOp = (req,res)=>{
//     let userId = req.params.accNum
//     const allUsers = deal.readData();
//     let user = allUsers.find(u=>u.accNum == userId)
//     res.render("addOp", {
//         user,
//         isEmpty: user?false : true
//     })
// }
module.exports = { showAll, addUser, editUser, show , deleteUser, addLogic, editUserLogic,addOp,addOpLogic}