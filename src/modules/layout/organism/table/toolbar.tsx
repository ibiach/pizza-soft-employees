import { IconButton, Toolbar as MuiToolbar, Tooltip, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

import styles from './index.module.scss';

type EnhancedToolbarProps = {
  title: string;
  onAdd: () => void;
  onFilter: () => void;
};

const Toolbar = (props: EnhancedToolbarProps) => {
  const { title, onAdd, onFilter } = props;

  return (
    <MuiToolbar className={styles.toolbar_header}>
      <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
        {title}
      </Typography>
      <Tooltip title="Add">
        <IconButton onClick={onAdd}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Filter list">
        <IconButton onClick={onFilter}>
          <FilterListIcon />
        </IconButton>
      </Tooltip>
    </MuiToolbar>
  );
};

export { Toolbar };
