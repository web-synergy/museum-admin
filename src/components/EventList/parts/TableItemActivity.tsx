import { FC, useState } from 'react';
import { useTheme, useMediaQuery, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SvgSpriteIcon from '@/components/Common/SvgSprite';
import MobileMenu from './MobileMenu';
import ConfirmDelete from './ConfirmDelete';
import InfoModal from '@/components/EventForm/parts/InfoModal';

interface TableItemActivityProps {
  slug: string;
  title: string;
  onDeleteEventState: (slug: string) => void;
}

const TableItemActivity: FC<TableItemActivityProps> = ({
  slug,
  title,
  onDeleteEventState,
}) => {
  const theme = useTheme();
  const isNotMobile = useMediaQuery(theme.breakpoints.up('md'));
  const navigate = useNavigate();
  const [confirmModal, setConfirmModal] = useState(false);
  const [successInfo, setSuccessInfo] = useState(false);

  const onOpenConfirmModal = () => {
    setConfirmModal(true);
  };

  const onCloseConfirmModal = () => {
    setConfirmModal(false);
  };

  const onDeleteItem = async () => {
    onCloseConfirmModal();

    try {
      await onDeleteEventState(slug);
      setSuccessInfo(true);
    } catch (error) {
      console.log(error);
    }
  };

  const onEditItem = () => {
    navigate(`/events/${slug}`);
  };

  return (
    <>
      {isNotMobile ? (
        <>
          <IconButton
            color="inherit"
            sx={{ padding: 0, mr: { md: 3, lg: 5 } }}
            onClick={onEditItem}
          >
            <SvgSpriteIcon iconId="edit" />
          </IconButton>
          <IconButton
            color="inherit"
            sx={{ padding: 0 }}
            onClick={onOpenConfirmModal}
          >
            <SvgSpriteIcon iconId="delete" />
          </IconButton>
        </>
      ) : (
        <MobileMenu
          onOpenDeleteModal={onOpenConfirmModal}
          onEditEvent={onEditItem}
        />
      )}
      <ConfirmDelete
        open={confirmModal}
        onCloseModal={onCloseConfirmModal}
        onDeleteItem={onDeleteItem}
        title={title}
      />
      <InfoModal
        open={successInfo}
        onClose={() => setSuccessInfo(false)}
        text="Подія була успішно видалена."
      />
    </>
  );
};

export default TableItemActivity;
