import MUITableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


const styles = {
	general: {
		padding: '20px',
		margin: '4px',
	},
	processing: {
		background: 'pink',
		cursor: 'not-allowed',
		pointerEvents: 'none',
		opacity: 0.5,
	},
	open: {
		background: 'rgba(65, 203, 113, 0.1)',
	},
}


const ListItem = ({ item, onEdit, onDelete }) => {
	return (
		<MUITableRow style={{ ...styles.general, ...styles[item.status] }}>
			<TableCell sx={{ width: 50 }} align="center">
				{item.status && `[${item.status}]`}
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