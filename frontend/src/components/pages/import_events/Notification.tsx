import { Snackbar } from "@material-ui/core";
import { AlertTitle } from "@material-ui/lab";
import Alert from "@material-ui/lab/Alert";
export interface NotificationProps {
  open: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  onClose: () => unknown;
  message: React.ReactNode;
  title: React.ReactNode;
  severity: "error" | "success";
}
const Notification = (props: NotificationProps) => {
  const { open, onClose, message, title, severity } = props;
  const handleClose = () => {
    open[1](false);
    onClose();
  };
  return (
    <Snackbar open={open[0]} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        elevation={6}
        variant="standard"
        severity={severity}
        onClose={handleClose}
      >
        {title && <AlertTitle>{title}</AlertTitle>}
        {message}
      </Alert>
    </Snackbar>
  );
};
export default Notification;
