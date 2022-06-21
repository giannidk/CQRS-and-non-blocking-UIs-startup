import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import styles from './styles'

export default function TodoForm({ isOpen, handleClose, editingItem, onSave }) {

	const defaultValues = editingItem || {
		title: '',
	}

	const [formValues, setformValues] = React.useState(defaultValues)
	const [hasError, setHasError] = React.useState(null)

	const onChangeValue = (e) => {
		setformValues({
			...formValues,
			[e.target.name]: e.target.value
		})
	}

	const onSubmit = () => {
		if (!formValues.title) {
			setHasError('Please fix the errors')
		} else {
			onSave(formValues)
			setHasError(null)
		}
	};

	return (
		<div>
			<Modal
				open={isOpen}
				onClose={handleClose}
			>
				<Box sx={styles.box}>
					<h3>Todo</h3>
					<TextField
						name="title"
						variant="outlined"
						fullWidth
						defaultValue={formValues.title}
						error={hasError && !formValues.title}
						onChange={onChangeValue}
					/>
					<hr />
					{hasError && <Alert severity="error">{hasError}</Alert>}

					<Button
						variant="outlined"
						onClick={handleClose}
					>CLOSE</Button>
					<Button
						sx={{
							m: 2
						}}
						variant="contained"
						onClick={onSubmit}
					>SAVE</Button>

				</Box>
			</Modal>
		</div>
	);
}
