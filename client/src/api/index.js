import { cmdTypes } from '../constants'
const axios = require('axios').default;
const BASE_URL = "http://localhost:8080/v1/graphql";
const ADMIN_SECRET = 'hasura'
const USER_ID = 'Gianni'

export const fetchTodos = () => {
	return axios({
		url: BASE_URL,
		method: 'post',
		headers: {
			"x-hasura-admin-secret": ADMIN_SECRET
		},
		data: {
			query: `
			query FetchTodos {
				todos(order_by: {created_at: desc}) {
					created_at
					id
					is_completed
					title
					updated_at
				  }
			  }
			`
		}
	})
}

export const addTodo = (title) => {
	return axios({
		url: BASE_URL,
		method: "POST",
		headers: {
			"x-hasura-admin-secret": ADMIN_SECRET
		},
		data: {
			variables: {
				id: Date.now(),
				title,
				user_id: USER_ID				
			},
			query: `
			mutation addTodo($id: bigint!, $title: String!, $user_id: String!){
				insert_todos(objects:[{id: $id,title: $title, user_id: $user_id}]) {
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

export const updateTodo = (data) => {
	const {id, title} = data
	return axios({
		url: BASE_URL,
		method: "POST",
		headers: {
			"x-hasura-admin-secret": ADMIN_SECRET
		},
		data: {
			variables: {
				id,
				title,
				user_id: USER_ID
			},
			query: `
			mutation insertCommand($id: bigint!, $title: String!, $user_id: String!){
				insert_commands(objects:[{cmd_type: "${cmdTypes.UPDATE}", item_id: $id, payload: {id: $id, title: $title}, cmd_ref: $user_id}]) {
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



export const deleteTodo = (id) => {
	return axios({
		url: BASE_URL,
		method: "POST",
		headers: {
			"x-hasura-admin-secret": ADMIN_SECRET
		},
		data: {
			variables: {
				id
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
