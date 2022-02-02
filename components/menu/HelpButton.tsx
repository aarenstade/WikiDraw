import { useState } from "react";
import { IconButton, NormalButton, SmallButton } from "../Buttons";
import HelperDialog from "../HelperDialog";
import HelpIcon from "../icons/help.svg";
import styles from "./menu.module.css";

const HelpButton = () => {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <div className={styles.helpButton}>
      {showDialog && (
        <HelperDialog bottom="40px" right={0} displayTime={2500}>
          <h4>How to use:</h4>
          <ul style={{ fontSize: "14px", padding: "0", listStyleType: "none" }}>
            <li>1. Select color (left) and brush size (right).</li>
            <li>2. Draw a nice picture!</li>
            <li>3. Click "Submit Additions" to upload!</li>
          </ul>
        </HelperDialog>
      )}
      <NormalButton text="Help" icon={<HelpIcon />} onClick={() => setShowDialog(!showDialog)} />
    </div>
  );
};

export default HelpButton;
