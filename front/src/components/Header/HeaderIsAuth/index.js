import { useNavigate } from "react-router-dom";
import { Button } from "@material-ui/core";

import Header from "../index";
import useStyles from "../style";
import authService from "../../../services/AuthService";
import { HEADER_LOGOUT } from "../../../common/constants";

const HeaderIsAuth = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const handelLogout = async () => {
    try {
      await authService.logout();
    } catch (e) {
      console.log("Ошибка выхода", e);
    }
    navigate("../shop-family/sign-in");
    localStorage.clear("accessToken");
    localStorage.clear("userId");
  };

  return (
    <Header>
      <Button
        className={classes.logoutButton}
        color="secondary"
        variant="contained"
        onClick={() => handelLogout()}
      >
        {HEADER_LOGOUT}
      </Button>
    </Header>
  );
};

export default HeaderIsAuth;
