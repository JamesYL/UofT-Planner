import { Snackbar, SnackbarProps } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import Alert, { AlertProps } from "@material-ui/lab/Alert";
export interface NotificationProps {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  onClose: () => unknown;
  message: React.ReactNode;
  title?: React.ReactNode;
  alertProps?: AlertProps;
  snackbarProps?: SnackbarProps;
}
const Notification = (props: NotificationProps) => {
  const { open, onClose, message, alertProps, snackbarProps, title } = props;
  const handleClose = () => {
    open[1](false);
    onClose();
  };
  return (
    <Snackbar
      open={open[0]}
      autoHideDuration={5000}
      onClose={handleClose}
      {...snackbarProps}
    >
      <Alert
        elevation={6}
        variant="filled"
        severity="error"
        {...alertProps}
        onClose={handleClose}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Notification;
