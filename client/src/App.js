import * as React from 'react';
import TodoList from './list';
import TodoForm from './todo-form/';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import * as api from './api'

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(null);
  const [todosList, setTodosList] = React.useState([]);
  const [editingItem, setEditingItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {    
    fetchTodos()
  }, []);

  const editItem = (item) => {
    setEditingItem(item)
    setOpen(true)
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    setEditingItem(null)
  };


  const fetchTodos = () => {
    setIsLoading(true)
   setTimeout(() => {
    api.fetchTodos()
    .then( result => {
      if(result.data?.data?.todos){
        setTodosList(result.data.data.todos)
        setHasError(null)
      } else {
        setHasError(result.data.errors[0].message)
      }
    })
    .catch( error => setHasError(error.message))
    .finally( () => setIsLoading(false))
   }, 1000)
  }

  const onSaveItem = (formValues) => {
    if(formValues.id){
      api.updateTodo(formValues)
      .then(result => {
        if(result.data.errors){
          setHasError(result.data.errors[0].message)
        }else{
          setHasError(null)
          fetchTodos()
        }
      })
      .catch(error => setHasError(error.message))
    }else{
      api.addTodo(formValues.title)
      .then(result => {
        if(result.data.errors){
          setHasError(result.data.errors[0].message)
        }else{
          setHasError(null)
          fetchTodos()
        }
      })
      .catch(error => setHasError(error.message))
    }
    setOpen(false)
  }

  const deleteItem = (itemId) => {
    api.deleteTodo(itemId)
      .then(result => {
        if(result.data.errors){
          setHasError(result.data.errors[0].message)
        }else{
          setHasError(null)
          fetchTodos()
        }
      })
      .catch(error => setHasError(error.message))
  }

  return (
    <div style={{ 'padding': '20px' }}>
      <h1>To do</h1>
      {isLoading && <LinearProgress />}
      <TodoList items={todosList} onEdit={editItem} onDelete={deleteItem} />
      {hasError && <Alert sx={{mt: 2}} severity="error">{hasError}</Alert>}
      <Button
        sx={{
          mt: 2
        }}
        variant="contained"
        onClick={handleOpen}>NEW TO DO</Button>
      {open && <TodoForm 
        isOpen={open} 
        handleClose={handleClose} 
        editingItem={editingItem} 
        onSave={onSaveItem}
        />}
    </div>
  );
}

export default App;
