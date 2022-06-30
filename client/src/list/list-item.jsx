import MUITableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import Tooltip from '@mui/material/Tooltip';
import { itemStatus } from '../constants';

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
	deleted: {
		border: '1px dashed #AAA',
		background: 'rgba(0,0,0, 0.1)',
		color: "#FFF",
		cursor: 'not-allowed',
		pointerEvents: 'none',
		textShadow: '0px 1px 1px #BBB'
	},
	created: {
		border: '1px solid #FFA900',
		background: 'rgba(255,169,0, 0.2)',
		color: "#FFF",
		cursor: 'not-allowed',
		pointerEvents: 'none',
		textShadow: '0px 1px 1px #BBB',
		opacity: 0.5
	},
	error:  {
		border: '3px solid red',
		background: 'rgba(255,0,0, 0.2)',
	}
}


const printStatusIcon = (status) => {
	if(!status) return null

	let displayIcon = <LockOpenIcon />
	let iconColor = 'primary'

	switch(status) {
		case itemStatus.CREATED:
			displayIcon = <AccessTimeFilledIcon />
			iconColor = 'primary'
			break;
		case itemStatus.PROCESSING:
			displayIcon = <LockIcon />
			iconColor = 'warning'
			break;
		case itemStatus.OPEN:
			displayIcon = <LockOpenIcon />
			iconColor = 'success'
			break;
		case itemStatus.ERROR:
			displayIcon = <ReportProblemIcon />
			iconColor = 'error'
			break;
		case itemStatus.DELETED:
			displayIcon = <AutoDeleteIcon />
			iconColor = 'warning'
			break;
		default:
			displayIcon = <AccessTimeFilledIcon />
			iconColor = 'warning'
	}

	return <Tooltip title={status}><IconButton color={iconColor}>{displayIcon}</IconButton></Tooltip>
}

const ListItem = ({ item, onEdit, onDelete }) => {
	return (
		<MUITableRow style={{ ...styles.general, ...styles[item.status] }}>
			<TableCell sx={{ width: 100 }} align="center">
				{printStatusIcon(item.status)}
			</TableCell>
			<TableCell style={{ flexGrow: '1' }}>
				{item.title}
			</TableCell>
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