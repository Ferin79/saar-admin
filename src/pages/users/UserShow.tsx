import { Avatar, Box, Typography } from "@mui/material";
import {
  DateField,
  Show,
  Tab,
  TabbedShowLayout,
  TextField,
  useRecordContext,
} from "react-admin";

const UserTitle = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <span>
      User: {record.firstName} {record.lastName}
    </span>
  );
};

const UserInfoPanel = () => {
  const record = useRecordContext();
  if (!record) return null;

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mb: 2,
        p: 2,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Box sx={{ mr: 2 }}>
        <Avatar
          src={record.photo?.path}
          alt={`${record.firstName} ${record.lastName}`}
          sx={{ width: 80, height: 80 }}
        />
      </Box>
      <Box>
        <Typography variant="h4">
          {record.firstName} {record.lastName}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {record.email}
        </Typography>
        <Box sx={{ display: "flex", mt: 1 }}>
          <Box
            sx={{
              bgcolor:
                record.status?.name === "Active"
                  ? "success.light"
                  : "error.light",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              mr: 1,
              fontSize: "0.875rem",
            }}
          >
            {record.status?.name}
          </Box>
          <Box
            sx={{
              bgcolor: "info.light",
              color: "white",
              px: 1,
              py: 0.5,
              borderRadius: 1,
              fontSize: "0.875rem",
            }}
          >
            {record.role?.name}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export const UserShow = () => (
  <Show title={<UserTitle />}>
    <>
      <UserInfoPanel />
      <TabbedShowLayout>
        <Tab label="Account Info">
          <TextField source="id" label="ID" />
          <TextField source="firstName" label="First Name" />
          <TextField source="lastName" label="Last Name" />
          <TextField source="provider" label="Provider" />
          <TextField source="socialId" label="Social ID" />
        </Tab>

        <Tab label="Timestamps">
          <DateField source="createdAt" showTime label="Created At" />
          <DateField source="updatedAt" showTime label="Last Updated" />
          <DateField
            source="deletedAt"
            label="Deleted At"
            emptyText="Not deleted"
          />
        </Tab>
      </TabbedShowLayout>
    </>
  </Show>
);
