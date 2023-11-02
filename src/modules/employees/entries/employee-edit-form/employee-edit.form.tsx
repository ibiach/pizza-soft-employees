import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { MaskHelper } from '@helpers/mask';
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';

import { EMPLOYEES_TAB } from '@config/constants/routes';
import { useAppDispatch } from '@lib/store/hooks';

import { updateEmployee } from '@modules/employees/features/slice';

import styles from './index.module.scss';

import type { TypeEmployee } from '@modules/employees/features/slice';
import type { TypeInputs } from '@modules/employees/organism/employee-modal-add/employee-modal-add';

type EmployeeEditFormProps = {
  id: string;
  employee: TypeEmployee | null;
};

const EmployeeEditForm = (props: EmployeeEditFormProps) => {
  const { id, employee } = props;

  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeInputs>();

  const onSubmit: SubmitHandler<TypeInputs> = (data) => {
    dispatch(updateEmployee({ id, data }));

    reset();

    navigate(EMPLOYEES_TAB);
  };

  if (!employee) {
    return;
  }

  return (
    <Box className={styles.root}>
      <Box className={styles.container}>
        <Box className={styles.form} component={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Typography className={styles.title} fontSize={24} fontWeight={700} component={'h1'}>
            Изменить данные сотрудника
          </Typography>

          <FormGroup className={styles.form_group_elements}>
            <Controller
              name="name"
              control={control}
              defaultValue={employee.name}
              render={({ field }) => <TextField {...field} label="ФИО" placeholder="Иван Иванов" fullWidth />}
            />
            <Controller
              name="role"
              defaultValue={employee.role}
              control={control}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  fullWidth
                  disablePortal
                  options={['Повар', 'Официант', 'Водитель']}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => <TextField {...params} label="Выберите должность" />}
                  onChange={(_, value) => field.onChange(value)}
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              defaultValue={employee.phone}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Телефон"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  InputProps={{ inputComponent: MaskHelper.PhoneTextMask }}
                />
              )}
              rules={{
                pattern: {
                  value: /^(?:\+7|8)[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/,
                  message: 'Неправильный формат номера телефона',
                },
              }}
            />
            <Controller
              name="birthday"
              control={control}
              defaultValue={employee.birthday}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Дата рождения в формате (ДД/ММ/ГГГГ)"
                  fullWidth
                  error={!!errors.birthday}
                  helperText={errors.birthday?.message}
                  InputProps={{ inputComponent: MaskHelper.BirthdayTextMask }}
                />
              )}
              rules={{
                pattern: {
                  value: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
                  message: 'Неправильный формат даты (ДД/ММ/ГГГГ)',
                },
              }}
            />
            <Controller
              name="isArchive"
              control={control}
              defaultValue={employee.isArchive}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="Архив"
                  checked={field.value}
                  onChange={(_, value) => field.onChange(value)}
                />
              )}
            />
            <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', gap: 1 }}>
              <Button fullWidth sx={{ maxHeight: '50px' }} type="submit" variant="contained" color="primary">
                Изменить
              </Button>
              <Button
                fullWidth
                sx={{ maxHeight: '50px' }}
                onClick={() => navigate(EMPLOYEES_TAB)}
                variant="contained"
                color="primary"
              >
                Вернуться назад
              </Button>
            </FormGroup>
          </FormGroup>
        </Box>
      </Box>
    </Box>
  );
};

export { EmployeeEditForm };
