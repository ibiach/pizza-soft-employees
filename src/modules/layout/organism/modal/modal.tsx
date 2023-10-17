import { Box, Modal as MuiModal, Typography } from '@mui/material';

import type { DialogProps } from '@mui/material';

import styles from './index.module.scss';

type ModalProps = Omit<DialogProps, 'children' | 'onClose'> & {
  title?: string;
  children: React.ReactElement;
  initialWidth?: boolean;
  hideCloseIcon?: boolean;
  onClose: () => void;
};

const Modal = (props: ModalProps) => {
  const { children, title, ...otherProps } = props;
  return (
    <MuiModal {...otherProps}>
      <Box className={styles.box}>
        <Typography className={styles.title} fontSize={24} fontWeight={700} component={'h1'}>
          {title}
        </Typography>
        {children}
      </Box>
    </MuiModal>
  );
};

export { Modal };
