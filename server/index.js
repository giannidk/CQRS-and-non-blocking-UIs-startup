
const express = require("express");
var cors = require("cors");
const { executeCreateCommand, executeDeleteCommand, createResponse, executeUpdateCommand } = require("./api");


/*
1. Create an event: create_command_event
2. Choose: Db: default . public . commands
3. Address: //! http://host.docker.internal:3010/execute-command

* Add Payload Transform: Use this in the trigger payload/ Enable request body
  {
    "data":{{$body.event.data.new}}
  }
*/


const cmdTypes = {
  UPDATE: "todo_update",
  DELETE: "todo_delete",
  CREATE: "todo_create",
}

const itemStatus = {
  LOCKED: "locked",
  OPEN: "open",
  DELETED: "deleted",
  CREATED: "created",
}





const app = express();
// makes it possible to make calls from different domain name
app.use(express.json())
app.use(cors());
const port = 3010;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/execute-command", (req, res) => {


  console.log('HASURA DATA FORMAT: ', req.body.data)

  const data = req.body.data
  const { cmd_type } = req.body.data

  

  if (cmd_type === cmdTypes.UPDATE) {
    setTimeout(() => {
      executeUpdateCommand(data)
        .then(result => {
          console.log('UPDATE SUCCESS: ', result.data.data)
          console.log('UPDATE ERRORS: ', JSON.stringify(result.data.errors, null, 4))
          createResponse({
            ...data,
            ...result.data.data,
          })
            .then(res => {
              if (res.data.errors) {
                console.log('CREATE RESP. ERRORS: ', JSON.stringify(res.data.errors, null, 4))
              } else {
                console.log('CREATE RESP. DATA: ', JSON.stringify(res.data.data, null, 4))
              }
            })
            .catch(error => console.log('CATCH 1 ERROR: ', { error }))
        })
        .catch(error => console.log('CATCH 2 ERROR: ',{ error }))
    }, 8000)
  }
  
  /* if (cmd_type === cmdTypes.DELETE) {
    setTimeout(() => {
      executeDeleteCommand(data)
        .then(result => {
          console.log('DELETE SUCCESS: ', result.data.data)
          console.log('DELETE ERRORS: ', JSON.stringify(result.data.errors, null, 4))
          createResponse({
            ...data,
            ...result.data.data,
          })
            .then(res => {
              if (res.data.errors) {
                console.log('DELETE RESP. ERRORS: ', JSON.stringify(res.data.errors, null, 4))
              } else {
                console.log('DELETE RESP. DATA: ', JSON.stringify(res.data.data, null, 4))
              }
            })
            .catch(error => console.log('CATCH 1 ERROR: ', { error }))
        })
        .catch(error => console.log('CATCH 2 ERROR: ',{ error }))
    }, 5000)
  } */
  if (cmd_type === cmdTypes.DELETE) {
    setTimeout(() => {
      createResponse(data)
        .then(res => {
          if (res.data.errors) {
            console.log('DELETE RESP. ERRORS: ', JSON.stringify(res.data.errors, null, 4))
          } else {
            console.log('DELETE RESP. DATA: ', JSON.stringify(res.data.data, null, 4))
          }
        })
        .catch(error => console.log('CATCH 1 ERROR: ', { error }))
    }, 8000)
  }

  // If cmd_type = created
  if (cmd_type === cmdTypes.CREATE) {
    setTimeout(() => {
      executeCreateCommand(data)
        .then(result => {
          console.log('DATA DATA: ', result.data.data)
          console.log('DATA ERRORS: ', JSON.stringify(result.data.errors, null, 4))
          createResponse({
            ...data,
            ...result.data.data,
          })
            .then(res => {
              if (res.data.errors) {
                console.log('ERRORS: ', JSON.stringify(res.data.errors, null, 2))
              } else {
                console.log('DATA: ', JSON.stringify(res.data.data, null, 2))
              }
            })
            .catch(error => console.log('CATCH 1 ERROR: ', { error }))
        })
        .catch(error => console.log('CATCH 2 ERROR: ',{ error }))
    }, 8000)
  }


  res.send("Command executed!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
