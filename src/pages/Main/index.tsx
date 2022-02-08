/* eslint-disable react/prop-types */
import {
  Button,
  Container,
  Dialog,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { UserType } from 'src/@types/user.type';
import CreateUserComponent from 'src/components/CreateUserComponent';
import DeleteUserComponent from 'src/components/DeleteUserComponent';
import EditUserComponent from 'src/components/EditUserComponent';
import { getUsersList } from 'src/service/api';
import theme from 'src/theme';

type ColumnType = {
  field: string,
  headerName: string,
  minWidth?: number,
  width?: number
  valueGetter?: any,
  renderCell?: any,
  align?: 'center' | 'right',
  sortable?: boolean,
};
function getUserName(params: any) {
  return params.row.username ? `${params.row.username}` : 'Not available';
}
function getCity(params: any) {
  return (
    params.row.address
      ? `${params.row.address.city}`
      : params.row.city || 'Not available'
  );
}

function Main(props) {
  const {
    dispatch, editModalState, deleteModalState, userState,
  } = props;
  const [loading, setLoading] = useState<boolean>(true);
  const [createModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [users, setUsers] = useState<UserType[]>([]);
  const [pageSize, setPageSize] = useState<number>(5);

  const columns: ColumnType[] = [
    {
      field: 'id', headerName: 'Id', width: 20, sortable: false,
    },
    { field: 'name', headerName: 'Name', minWidth: 200 },
    {
      field: 'username', headerName: 'Username', minWidth: 200, valueGetter: getUserName,
    },
    {
      field: 'email', headerName: 'Email', minWidth: 200, sortable: false,
    },
    {
      field: 'address',
      headerName: 'City',
      width: 180,
      align: 'center',
      valueGetter: getCity,
      sortable: false,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      align: 'right',
      renderCell: (userInfo) => (
        <Button
          variant="contained"
          color="warning"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch({ type: 'USER', payload: userInfo.row });
            dispatch({ type: 'SET_EDIT' });
          }}
        >
          Edit
        </Button>
      ),
      sortable: false,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      align: 'right',
      renderCell: (userInfo) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          style={{ marginLeft: 16 }}
          onClick={() => {
            dispatch({ type: 'USER', payload: userInfo.row });
            dispatch({ type: 'SET_DELETE' });
          }}
        >
          Delete
        </Button>
      ),
      sortable: false,
    },
  ];

  const handleCreateModal = () => setCreateModalOpen(!createModalOpen);
  const closeEditModal = () => dispatch({ type: 'SET_EDIT' });
  const closeDeleteModal = () => dispatch({ type: 'SET_DELETE' });

  async function getUsers() {
    setLoading(true);
    try {
      const data = await getUsersList();

      setUsers(data);
      dispatch({ type: 'ADD', payload: data });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      throw new Error(err);
    }
  }

  const update = () => {
    setUsers(userState.users);
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    update();
  }, [users]);

  return (
    <Container style={{ padding: 20 }}>
      <Typography variant="h3" style={theme.bold}>
        Dashboard
      </Typography>
      <Paper
        elevation={0}
        style={{
          marginTop: 30,
          borderRadius: 10,
          height: 500,
          width: '100%',
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          style={{
            paddingInline: 20,
            paddingBlock: 10,
          }}
        >
          <Typography variant="h5">Users List</Typography>
          <Button variant="contained" disableElevation onClick={handleCreateModal}>
            <Typography variant="button" color={theme.palette.colors.white}>
              Add user
            </Typography>
          </Button>
        </Stack>
        {!loading && (
          <DataGrid
            columns={columns}
            rows={users}
            rowHeight={77}
            rowsPerPageOptions={[5, 10, 15]}
            rowCount={users.length}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            style={{ paddingLeft: 10, paddingRight: 10, width: '100%' }}
            disableColumnSelector
            disableSelectionOnClick
            disableColumnMenu
          />
        )}
      </Paper>
      <Dialog open={createModalOpen} onClose={handleCreateModal}>
        <CreateUserComponent
          users={users}
          setUsers={setUsers}
          setModalState={setCreateModalOpen}
        />
      </Dialog>
      <Dialog open={editModalState} onClose={closeEditModal}>
        <EditUserComponent users={users} setUsers={setUsers} />
      </Dialog>
      <Dialog open={deleteModalState} onClose={closeDeleteModal}>
        <DeleteUserComponent users={users} setUsers={setUsers} />
      </Dialog>
    </Container>
  );
}

const mapStateToProps = (state) => {
  const { userState, modalState } = state;

  return {
    userState,
    editModalState: modalState.editModal,
    deleteModalState: modalState.deleteModal,
  };
};

export default connect(mapStateToProps)(Main);
