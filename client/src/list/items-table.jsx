import MUITableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';

const ItemsTable = ({ list }) => {
	if(!list || !list.length) return null
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
					{list}
				</TableBody>
			</Table>
		</TableContainer>
	);
}

export default ItemsTable