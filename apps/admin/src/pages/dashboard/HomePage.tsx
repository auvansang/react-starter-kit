import { useState } from 'react';
import { Stack } from '@mui/material';
import { EmailOutlined } from '@mui/icons-material';

import { ValidateSchema, Form } from '@sa/form';
import { DataGrid } from '@sa/data-grid';

type FormFields = {
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  email: string;
  phoneNumber: string;
};

const HomePage = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  return (
    <Stack direction="column" spacing={2} sx={{ mt: 10, ml: 10, width: 1000 }}>
      <Form<FormFields>
        defaultValues={{
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          email: '',
          phoneNumber: '',
        }}
        validateSchema={{
          firstName: ValidateSchema.string().required(),
          lastName: ValidateSchema.string().required(),
          userName: ValidateSchema.string().required('User name is required'),
          password: ValidateSchema.string().required(),
          email: ValidateSchema.string().email().required(),
          phoneNumber: ValidateSchema.string().required(),
        }}
        fieldProps={{
          layout: 'horizontal',
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        fields={[
          {
            name: 'firstName',
            label: 'First Name',
            type: 'text',
            placeholder: 'Enter your first name',
          },
          {
            name: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: 'Enter your last name',
          },
          {
            type: 'text',
            name: 'userName',
            label: 'User Name',
            placeholder: 'Enter your user name',
            endAdornment: <EmailOutlined color="action" />,
          },
          {
            type: 'password',
            name: 'password',
            label: 'Password',
            placeholder: 'Enter your password',
          },
          {
            type: 'text',
            name: 'email',
            label: 'Email',
            placeholder: 'Enter your email',
          },
          {
            type: 'number',
            name: 'phoneNumber',
            label: 'Phone Number',
            placeholder: 'Enter your phone number',
          },
        ]}
        actions={[
          {
            type: 'submit',
            label: 'Submit',
          },
        ]}
      />
      <DataGrid<{
        name: string;
        description: string;
        notes?: string;
      }>
        selection
        colDefs={[
          {
            name: 'name',
            header: 'Name',
            resizable: true,
          },
          {
            name: 'description',
            header: 'Description',
          },
          {
            name: 'notes',
            header: 'Notes',
          },
        ]}
        data={new Array(10).fill(0).map((_, index) => ({
          name: `Sang Au ${pageIndex} - ${index}`,
          description: 'Au Sang',
          notes: 'Sang',
        }))}
        pagination={{
          pageIndex: pageIndex,
          pageSize: pageSize,
          totalItems: 1000,
        }}
        onPaginationChange={(state) => {
          setTimeout(() => {
            setPagination(state);
          }, 1000);
        }}
      />
    </Stack>
  );
};

export default HomePage;
