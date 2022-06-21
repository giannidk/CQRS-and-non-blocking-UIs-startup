import MUITableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const ListItem = ({ item, onEdit, onDelete }) => {
	return (
		<MUITableRow>
			<TableCell sx={{ width: 50 }} align="center">
				<Checkbox
					checked={item.is_completed}
					onChange={(e) => alert('Changing status ...')}
					tabIndex={-1}
				/>
			</TableCell>
			<TableCell>{item.title}</TableCell>
			<TableCell sx={{ width: 170 }} align='right'>
				<IconButton color="primary" onClick={() => onEdit(item)}>
					<EditIcon />
				</IconButton>
				<IconButton sx={{color: '#CC0000'}} onClick={() => onDelete(item.id)}>
					<DeleteForeverIcon />
				</IconButton>

			</TableCell>
		</MUITableRow>
	);
}

export default ListItem