export const getItems = () => ({
  type: 'GET_TODO'
}); 

export const addItem = (data) => ({
 type: 'ADD',
 name: data.name,
 description: data.description
});

export const deleteItem = (id) => ({
 type: 'DELETE',
 id: id
});

export const updateItem = (item) => ({
 type: 'UPDATE',
 id: item.id,
 name: item.name,
 description: item.description
});