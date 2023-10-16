import React from 'react';
import { Autocomplete, Box, Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Modal } from '@/modules/layout/organism/modal/modal';

import styles from './index.module.scss';
import { MaskHelper } from '@/helpers/mask';
import { useAppDispatch } from '@/lib/store/hooks';
import { addEmployee } from '../../features/slice';

type EmployeeModalAddProps = {
  open: boolean;
  onClose: () => void;
};

export type TypeInputs = {
  id: string;
  name: string;
  isArchive: boolean;
  role: string;
  phone: string;
  birthday: string;
};

const requireFieldText = 'Обязательное поле';

const EmployeeModalAdd = (props: EmployeeModalAddProps) => {
  const { onClose, open } = props;

  const dispatch = useAppDispatch();

  const uniqueId = React.useId();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<TypeInputs>();

  const onSubmit: SubmitHandler<TypeInputs> = (data) => {
    data['id'] = uniqueId;

    dispatch(addEmployee(data));

    reset();

    onClose();
  };

  const handleClose = () => {
    onClose();

    reset();
  };

  return (
    <Modal title="Добавить сотрудника" open={open} onClose={handleClose}>
      <Box component={'form'} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <FormGroup className={styles.form_group_elements}>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField label="ФИО" fullWidth {...field} error={!!errors.name} helperText={errors.name?.message} />
              );
            }}
            rules={{ required: requireFieldText }}
          />

          <Controller
            name="role"
            defaultValue="Повар"
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
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Телефон"
                fullWidth
                {...field}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                InputProps={{ inputComponent: MaskHelper.PhoneTextMask }}
              />
            )}
            rules={{
              required: requireFieldText,
              pattern: {
                value: /^(?:\+7|8)[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/,
                message: 'Не правильный формат номера телефона',
              },
            }}
          />

          <Controller
            name="birthday"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                label="Дата рождения (ДД/ММ/ГГГГ)"
                fullWidth
                {...field}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                InputProps={{ inputComponent: MaskHelper.BirthdayTextMask }}
              />
            )}
            rules={{
              required: requireFieldText,
              pattern: {
                value: /^[0-9]{2}\.[0-9]{2}\.[0-9]{4}$/,
                message: 'Неправильный формат даты рождения (DD/MM/YYYY)',
              },
            }}
          />

          <Controller
            name="isArchive"
            control={control}
            defaultValue={false}
            render={({ field }) => <FormControlLabel control={<Checkbox {...field} />} label="Архив" />}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" variant="contained" color="primary">
            Добавить
          </Button>
        </FormGroup>
      </Box>
    </Modal>
  );
};

export { EmployeeModalAdd };
