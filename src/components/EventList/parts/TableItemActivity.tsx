import { FC, useState } from 'react';
import { useTheme, useMediaQuery, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SvgSpriteIcon from '@/components/Common/SvgSprite';
import MobileMenu from './MobileMenu';
import ConfirmDelete from './ConfirmDelete';
import InfoModal from '@/components/EventForm/parts/InfoModal';
import { deleteEvent } from '@/api';

interface TableItemActivityProps {
  slug: string;
  title: string;
  onUpdateEvents: () => void;
}

const TableItemActivity: FC<TableItemActivityProps> = ({
  slug,
  title,

  onUpdateEvents,
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

  const onClickConfirm = async () => {
    setConfirmModal(false);
    await deleteEvent(slug);
  };

  const onDeleteItem = async () => {
    await onClickConfirm();
    setSuccessInfo(true);
  };

  const onCloseSuccessInfoModal = async () => {
    await onUpdateEvents();
    setSuccessInfo(false);
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
        onClose={onCloseSuccessInfoModal}
        text="Подія була успішно видалена."
      />
    </>
  );
};

export default TableItemActivity;
