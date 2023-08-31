/* eslint-disable react/prop-types */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Rating from '@mui/material/Rating';

/* eslint-disable no-unused-vars */
export default function CommentForm(props) {
    const { handleClosecomment, opencomment, setScore, score, setComment, handleSave } = props;

    return (
        <>
            <Dialog
                open={opencomment}
                onClose={handleClosecomment}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    Rating
                </DialogTitle>
                <DialogContent>
                    <Rating
                        name="simple-controlled"
                        value={score}
                        onChange={(event, newValue) => {
                            setScore(newValue);
                        }}
                    />
                    <TextField id="standard-basic" label="ความคิดเห็น" variant="standard" fullWidth onChange={(e) => { setComment(e.target.value) }} />

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={() => handleSave()}>ยืนยัน</Button>
                    <Button onClick={handleClosecomment} autoFocus>
                        ปิด
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );



}