const axios = require('axios');
const BASE_URL = "http://localhost:8080/v1/graphql";
const ADMIN_SECRET = 'hasura'

// 5 - creating branch

const executeUpdateCommand = (data) => {
  console.log('*************************************')
  console.log('*************************************')
  console.log('UPDATE COMMAND DATA')
  console.log({ data })
  console.log('*************************************')
  console.log('*************************************')

  return axios({
    url: BASE_URL,
    method: "POST",
    headers: {
      "x-hasura-admin-secret": ADMIN_SECRET
    },
    data: {
      variables: {
        id: data.payload.id,
        title: data.payload.title
      },
      query: `
      mutation updateTodo($id: bigint!, $title: String!) {
          update_todos_by_pk(
            pk_columns: {id: $id}
            _set: {title: $title}
          ){
            id
            title
          }
      }
    `
    }
  });
}


const executeDeleteCommand = (data) => {
  console.log('*************************************')
  console.log('*************************************')
  console.log('UPDATE COMMAND DATA')
  console.log({ data })
  console.log('*************************************')
  console.log('*************************************')

  return axios({
    url: BASE_URL,
    method: "POST",
    headers: {
      "x-hasura-admin-secret": ADMIN_SECRET
    },
    data: {
      variables: {
        id: data.payload.id
      },
      query: `
      mutation deleteTodo($id: bigint!) {
				delete_todos_by_pk(id: $id){
				  id
				  title
				}
			  }
    `
    }
  });
}



const executeCreateCommand = (data) => {
  console.log('*************************************')
  console.log('*************************************')
  console.log('CREATE COMMAND DATA')
  console.log({ data })
  console.log('*************************************')
  console.log('*************************************')

  return axios({
    url: BASE_URL,
    method: "POST",
    headers: {
      "x-hasura-admin-secret": ADMIN_SECRET
    },
    data: {
      variables: {
        id: data.payload.id,
        title: data.payload.title,
        user_id: data.cmd_ref
      },
      query: `
			mutation addTodo($id: bigint!, $title: String!, $user_id: String!){
				insert_todos(objects:[{id: $id, title: $title, user_id: $user_id}]) {
				  affected_rows
				  returning {
					id
					title
				  }
				}
			  }
			`
    }
  });
}

const createResponse = (data) => {
  console.log('*************************************')
  console.log('*************************************')
  console.log('CREATE RESPONSE DATA')
  console.log({ data })
  console.log('*************************************')
  console.log('*************************************')

  return axios({
    url: BASE_URL,
    method: "POST",
    headers: {
      "x-hasura-admin-secret": ADMIN_SECRET
    },
    data: {
      variables: {
        cmd_id: data.cmd_id,
        payload: data.payload,
        cmd_ref: data.cmd_ref
      },
      query: `
			mutation addResponse($cmd_id: Int!, $payload: json!, $cmd_ref: String!){
				insert_responses(objects:[{
                    cmd_id: $cmd_id, 
                    payload: $payload, 
                    cmd_ref: $cmd_ref
                }]) {
				  affected_rows
				  returning {
					cmd_id
					payload
				  }
				}
			  }
			`
    }
  });
}


module.exports = {
  executeUpdateCommand,
  executeDeleteCommand,
  executeCreateCommand,
  createResponse
}