import { FC, useState, useRef, DragEvent, ChangeEvent, useEffect } from 'react';
import { InputLabel, Box, Typography, IconButton } from '@mui/material';
import { Controller, useController } from 'react-hook-form';
import SvgSpriteIcon from '@/components/Common/SvgSprite';
// import Loader from '@/components/Common/Loader';
import ModalBase from '@/components/Common/ModalBase';
import EditImage from './EditImage';
import { VisuallyHiddenInput, DragDropWrapper, UploadImageBox } from './styles';
import { IImageState, InputFormProps } from '@/types/events';
import { getImage } from '@/api';
import { saveNewImage } from '@/helpers/imageUrl';
import picture from '@/assets/images/picture.svg';

interface ImageFieldProps extends InputFormProps {
  error: boolean;
}

const ImageField: FC<ImageFieldProps> = ({
  control,
  label,
  name,
  required,
  error,
}) => {
  const {
    field: { value, onChange },
  } = useController({ control, name });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<IImageState | null>(null);
  const [banner, setBanner] = useState<IImageState | null>(null);
  const [editImageModal, setEditImageModal] = useState(false);
  const [openErrorModal, setOpenErrorModal] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (value === '' && banner && banner.id) {
      setImage(null);
      setBanner(null);
    }
    if (value !== '' && !banner) {
      const getImageFile = async () => {
        const { data } = await getImage(value);
        const image: IImageState = {
          id: value,
          url: URL.createObjectURL(data),
        };
        setImage(image);
        setBanner(image);
      };
      getImageFile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  useEffect(() => {
    if (banner) onChange(banner.id);
  }, [banner, onChange]);

  const setFile = async (file: File) => {
    setLoading(true);
    const serverImage = await saveNewImage(file);
    if (serverImage) {
      setImage(serverImage);
      setBanner(serverImage);
    } else {
      setOpenErrorModal(true);
    }

    setLoading(false);
  };

  const onChangeImage = async (file: Blob) => {
    setLoading(true);
    const serverImage = await saveNewImage(file);
    if (serverImage) {
      setBanner(serverImage);
    } else {
      setEditImageModal(true);
    }
    setLoading(false);
  };

  const onDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const onUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;
    if (files[0].type.split('/')[0] !== 'image') return;
    setFile(files[0]);
  };

  const onDragLeave = (e: DragEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <>
            <InputLabel shrink={false} htmlFor={field.name} required={required}>
              {label}
            </InputLabel>
            <DragDropWrapper
              onDrop={onDrop}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              draggable="true"
              isError={error}
            >
              {banner ? (
                <Box position="relative">
                  {loading ? (
                    // <Loader visible={loading} />
                    <div>loading...</div>
                  ) : (
                    <>
                      <Box
                        component="img"
                        src={banner.url}
                        alt="events image"
                        sx={{
                          width: '100%',
                          height: 'auto',
                          maxHeight: 900,
                        }}
                      />
                      <IconButton
                        aria-label="edit-image"
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          boxShadow:
                            '0px 1px 2px 0px rgba(0, 0, 0, 0.04), 0px 4px 4px 0px rgba(0, 0, 0, 0.03), 0px 10px 6px 0px rgba(0, 0, 0, 0.02), 0px 17px 7px 0px rgba(0, 0, 0, 0.01), 0px 27px 7px 0px rgba(0, 0, 0, 0.00)',
                        }}
                        onClick={() => setEditImageModal(true)}
                      >
                        <SvgSpriteIcon iconId="edit" />
                      </IconButton>
                    </>
                  )}
                </Box>
              ) : (
                <UploadImageBox component="label">
                  {loading ? (
                    // <Loader visible={loading} />
                    <div>loading...</div>
                  ) : (
                    <>
                      <Box
                        component="img"
                        src={picture}
                        alt="picture"
                        sx={{ mr: 1 }}
                      />
                      <Box>
                        <Typography sx={{ fontWeight: 600 }}>
                          Завантажити файл
                        </Typography>
                        <Typography>
                          допустимий формат файлів — .jpeg
                        </Typography>
                      </Box>
                      <VisuallyHiddenInput
                        type="file"
                        ref={imageRef}
                        onChange={onUploadImage}
                      />
                    </>
                  )}
                </UploadImageBox>
              )}
            </DragDropWrapper>
          </>
        )}
      />
      {image && (
        <EditImage
          open={editImageModal}
          onClose={() => setEditImageModal(false)}
          imageSrc={image.url}
          onChangeImage={onChangeImage}
          onUploadFile={onUploadImage}
          loading={loading}
        />
      )}
      <ModalBase open={openErrorModal} onClose={() => setOpenErrorModal(false)}>
        <Box sx={{ padding: '0 24px 56px 24px', textAlign: 'center' }}>
          <Typography>
            Невірний формат картинки. Додавати можна картинки в форматах .jpg,
            .png, .jpeg, .bmp, .jiff.
          </Typography>
        </Box>
      </ModalBase>
    </>
  );
};

export default ImageField;
