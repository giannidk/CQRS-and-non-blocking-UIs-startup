import { cmdTypes, itemStatus } from "../constants";

export const mergeData = (data) => {
  console.log({ data });
  const { todos, commands } = data;
  const map = new Map();

  todos.forEach((item) => map.set(item.id, item));
  commands.forEach((command) => {
    return map.set(
      command.item_id,
      createItemForDisplay(map.get(command.item_id), command)
    );
  });

  const itemsList = Array.from(map.values());

  console.group("MAPPED DATA");
  console.log({ itemsList });
  console.groupEnd("MAPPED DATA");

  return itemsList;
};

const createItemForDisplay = (item, command) => {
  if (!item) {
    //! handle this case by looking if there is a response or not in the command
    if (command.last_response_at) {
      return {
        ...command.data_out,
      };
    } else {
      return {
        ...command.data_in,
        status: itemStatus.CREATED,
      };
    }
  }

  if (!command)
    return {
      ...item,
    };

  if (!command.last_response_at)
    return {
      ...item,
      status: itemStatus.PROCESSING,
    };

  if (command.cmd_type === cmdTypes.UPDATE) {
    if (Boolean(command.last_response_at > item.updated_at)) {
      return {
        ...item,
        ...command.data_out,
        status: itemStatus.OPEN,
      };
    }
  }

  if (command.cmd_type === cmdTypes.DELETE) {
    if (Boolean(command.last_response_at > item.updated_at)) {
      return {
        ...item,
        status: itemStatus.DELETED,
      };
    }
  }

  if (command.cmd_type === cmdTypes.CREATE) {
    if (Boolean(command.last_response_at > item.updated_at)) {
      return {
        ...item,
        ...command.data_out,
        status: itemStatus.OPEN,
      };
    } else {
      return {
        ...item,
        status: itemStatus.OPEN,
      };
    }
  }

  return {
    ...item,
    command,
  };
};
