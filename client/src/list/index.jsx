import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MUITableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListItem from './list-item';

const TodoList = ({items, onEdit, onDelete}) => {

	React.useEffect(() => {
		console.log({items})
	  }, [items]);	

	return (
		<TableContainer component={Paper}>
			<Table style={{ flexGrow: '1' }}>
				<TableHead>
					<MUITableRow>
						<TableCell></TableCell>
						<TableCell>title</TableCell>
						<TableCell></TableCell>
					</MUITableRow>
				</TableHead>
				<TableBody>
					{items.map((item) => <ListItem
							key={item.id}
							item={item}
							onEdit={onEdit}
							onDelete={onDelete}
						/>)}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default TodoList