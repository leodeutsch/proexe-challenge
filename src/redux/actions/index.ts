export const addUser = (data: any) => ({ type: 'ADD', payload: data });
export const editUser = (data: any) => ({ type: 'EDIT', payload: data });
export const removeUser = (data: any) => ({ type: 'REMOVE', payload: data });
export const sendUser = (data: any) => ({ type: 'USER', payload: data });
export const editModal = () => ({ type: 'SET_EDIT' });
export const deleteModal = () => ({ type: 'SET_DELETE' });
