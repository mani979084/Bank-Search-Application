import React, { useEffect, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Favor = ({ favData }) => {
  const [change, setchange] = useState(false);
  const [getLocal, setLocal] = useState([]);
  const [open, setOpen] = useState(false);
  const [getmsg, setmsg] = useState("");

  function addFavor() {
    if (favData.length) {
      const data = [...favData, ...getLocal];

      const uniqueAddresses = Array.from(new Set(data.map((a) => a.ifsc))).map(
        (id) => {
          return data.find((a) => a.ifsc === id);
        }
      );

      localStorage.setItem("data", JSON.stringify(uniqueAddresses));
      setchange(!change);

      var inputs = document.querySelectorAll(".checkbox");
      for (var i = 0; i < inputs.length; i++) {
        inputs[i].checked = false;
      }
      setmsg({ msg: "Successfully Added", type: "success" });
      setOpen(true);
    } else {
      setmsg({ msg: "Please select the Checkboxes", type: "error" });
      setOpen(true);
    }
  }

  useEffect(() => {
    setLocal(JSON.parse(localStorage.getItem("data")) || []);
  }, [change]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className="h-100 btn btn-outline-info"
        onClick={addFavor}
      >
        Add to Favourites
      </button>

      <Snackbar
        open={open}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={getmsg.type}>
          {getmsg.msg}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Favor;
