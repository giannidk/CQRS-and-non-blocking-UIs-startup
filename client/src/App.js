import * as React from 'react';
import TodoList from './list';
import TodoForm from './todo-form/';
import Button from '@mui/material/Button';
import LinearProgress from '@mui/material/LinearProgress';
import Alert from '@mui/material/Alert';
import * as api from './api'
import * as utils from './utils'
import { itemStatus } from './constants';

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasError, setHasError] = React.useState(null);
  const [todosList, setTodosList] = React.useState([]);
  const [editingItem, setEditingItem] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  let delay = 1000


  React.useEffect(() => {
    fetchList()
    return () => setTodosList([])
  }, []);

  const editItem = (item) => {
    //TODO: here we should fetch the item and see the current status, then return if the status is not open

    setEditingItem(item)
    setOpen(true)
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setEditingItem(null)
    setOpen(false)
  };

  //https://javascript.info/settimeout-setinterval
  let fetchList = () => {
    setIsLoading(true)
    setTimeout(function request() {
      api.fetchList()
        .then(result => {
          if (result.data?.data) {
            setTodosList(utils.mergeData(result.data.data))
            setHasError(null)
          } else {
            setHasError(result.data.errors[0].message)
          }
        })
        .catch(error => setHasError(error.message))
        .finally(() => {
          setIsLoading(false)
          delay *= 2
          fetchList = setTimeout(request, delay);
          console.clear()
          let date = new Date()
          console.log(date.toLocaleTimeString(navigator.language, {hour:'2-digit', minute:'2-digit', second:'2-digit'}))
        })
    }, delay)
  }

  const onSaveItem = (formValues) => {
    if (formValues.id) {
      api.updateTodo(formValues)
        .then(result => {
          if (result.data.errors) {
            setHasError(result.data.errors[0].message)
          } else {
            setHasError(null)
            fetchList()
          }
        })
        .catch(error => setHasError(error.message))
    } else {
      api.addTodo(formValues.title)
        .then(result => {
          if (result.data.errors) {
            setHasError(result.data.errors[0].message)
          } else {
            setHasError(null)
            fetchList()
          }
        })
        .catch(error => setHasError(error.message))
    }
    setOpen(false)
  }

  const deleteItem = (itemId) => {
    api.deleteTodo(itemId)
      .then(result => {
        if (result.data.errors) {
          setHasError(result.data.errors[0].message)
        } else {
          setHasError(null)
          fetchList()
        }
      })
      .catch(error => setHasError(error.message))
  }

  return (
    <div style={{ 'padding': '20px' }}>
      <h1>To do</h1>
      {isLoading && <LinearProgress />}
      <TodoList items={todosList} onEdit={editItem} onDelete={deleteItem} />
      {hasError && <Alert sx={{ mt: 2 }} severity="error">{hasError}</Alert>}
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
