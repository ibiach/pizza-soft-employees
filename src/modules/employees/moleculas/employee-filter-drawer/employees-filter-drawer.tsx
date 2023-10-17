import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Autocomplete,
} from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { TypeInputs } from '@/modules/employees/organism/employee-modal-add/employee-modal-add';
import { useAppDispatch } from '@/lib/store/hooks';
import { filterEmployees } from '@/modules/employees/features';

type FilterDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type TypeFilterQueries = Pick<TypeInputs, 'role' | 'isArchive'>;

const FilterDrawer = (props: FilterDrawerProps) => {
  const { onClose, open } = props;

  const dispatch = useAppDispatch();

  const { control, reset, handleSubmit } = useForm<TypeInputs>();

  const onSubmit: SubmitHandler<TypeFilterQueries> = (data: TypeFilterQueries) => {
    dispatch(filterEmployees(data));

    reset();

    onClose();
  };

  const handleClose = () => {
    onClose();

    reset();
  };

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <Box component={'form'} sx={{ width: 350 }} onSubmit={handleSubmit(onSubmit)}>
        <List>
          <ListItem>
            <ListItemText primary="Фильтрация сотрудников" />
          </ListItem>

          <ListItem>
            <Controller
              name="role"
              defaultValue="Повар"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  getOptionLabel={(option) => option}
                  fullWidth
                  disablePortal
                  options={['Повар', 'Официант', 'Водитель']}
                  renderInput={(params) => <TextField {...params} label="Должность" variant="outlined" />}
                  onChange={(_, value) => field.onChange(value)}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Controller
              name="isArchive"
              control={control}
              defaultValue={undefined}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={`Aрхив ${
                    field.value === undefined ? '(без фильтрации архива)' : field.value ? '(да)' : '(нет)'
                  } `}
                  onChange={(event, value) => field.onChange(value)}
                />
              )}
            />
          </ListItem>

          <ListItem>
            <Button type="submit" variant="contained" color="primary">
              Применить
            </Button>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export { FilterDrawer };
