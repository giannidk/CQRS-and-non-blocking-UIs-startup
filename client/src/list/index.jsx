import * as React from 'react';
import ItemsTable from './items-table';
import ListItem from './list-item';
import * as utils from '../utils'

const TodoList = ({ items, onEdit, onDelete }) => {
	const [mappedItems, setMappedItems] = React.useState({});

	console.group("MAPPED ITEMS");
		console.log({ mappedItems });
	console.groupEnd("MAPPED ITEMS");

	React.useEffect(() => {
		console.log({ items })
		setMappedItems(utils.groupItemsByStatus(items, 'status'))
	}, [items]);

	const displayList = (listItems) => {
		if (!listItems) return null
		return listItems.map((item) => <ListItem
			key={item.id}
			item={item}
			onEdit={onEdit}
			onDelete={onDelete}
		/>)
	}

	return (
		<>
			<ItemsTable list={displayList(mappedItems.created)} />
			<hr />
			<ItemsTable list={displayList(mappedItems.current)} />
		</>
	);
}

export default TodoList