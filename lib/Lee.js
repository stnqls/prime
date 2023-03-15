const axios = require("axios");

const addClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (element) {
    if (check.test(element.className)) {
      return 0;
    } else {
      element.className += " " + className;
    }
  }
};

const removeClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (element) {
    element.className = element.className.replace(check, " ").trim();
  }
};

const removeAllClass = (element) => {
  element.className = " ";
};

const toggleClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (check.test(element.className)) {
    element.className = element.className.replace(check, " ").trim();
  } else {
    element.className += " " + className;
  }
};

const checkClass = (element, className) => {
  const check = new RegExp("(\\s|^)" + className + "(\\s|$)");
  if (check.test(element.className)) {
    return true;
  } else {
    return false;
  }
};

const get = (element) => {
  return document.getElementById(element);
};

const gets = (element) => {
  return document.getElementsByClassName(element);
};

const loadingStart = () => {
  const Document = get("Document");

  addClass(Document, "fade");

  setTimeout(() => {
    addClass(Document, "lock");
    window.scrollTo(0, 0);
  }, 200);
};

const loadingFinish = () => {
  const Document = get("Document");

  removeClass(Document, "lock");
  // window.scrollTo(0, 0);
  addClass(Document, "lock");

  setTimeout(() => {
    removeClass(Document, "fade");
  }, 200);

  setTimeout(() => {
    removeClass(Document, "lock");
  }, 400);
};

const addComma = (target) => {
  if (target === 0) {
    return 0;
  } else {
    return String(target).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    // return target.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
};

const checkLogin = () => {
  if (window.sessionStorage.getItem("uid")) {
    return true;
  } else {
    return false;
  }
};

const checkNickname = (target) => {
  const special_pattern = /^[|가-힣|a-z|A-Z|0-9|\s]*$/;

  if (special_pattern.test(target) === true) {
    return true;
  } else {
    return false;
  }
};

const checkPhone = (target) => {
  const special_pattern = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;

  if (special_pattern.test(target) === true) {
    return true;
  } else {
    return false;
  }
};

const handlePhone = (ref, e) => {
  const value = ref.current.value.replace(/\D+/g, "");
  const numberLength = 11;

  let result;
  result = "";

  for (let i = 0; i < value.length && i < numberLength; i++) {
    switch (i) {
      case 3:
        result += "-";
        break;
      case 7:
        result += "-";
        break;
      default:
        break;
    }
    result += value[i];
  }
  ref.current.value = result;
  return e.target.value;
};

const checkEmail = (email) => {
  const checkEmail =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  if (email !== null) {
    if (checkEmail.test(email) === true) {
      return true;
    } else {
      return false;
    }
  }
};

const refreshToken = (recall) => {
  axios({
    method: "POST",
    url: `https://securetoken.googleapis.com/v1/token?key=AIzaSyC4n5Ld6Rx_g9HZum_H5Wxhu5dI5BJy5hU`,
    data: {
      grant_type: "refresh_token",
      refresh_token: window.sessionStorage.getItem("refresh"),
    },
  })
    .then((res) => {
      window.sessionStorage.setItem("accessToken", res.data.access_token);
      window.sessionStorage.setItem("token", res.data.id_token);
      window.sessionStorage.setItem("refresh", res.data.refresh_token);
      recall();
    })

    .catch((err) => {
      alert("서버 인증 중 문제가 발생했습니다. 다시 로그인 후 이용해주세요.");
    });
};

module.exports = {
  addClass,
  removeClass,
  removeAllClass,
  toggleClass,
  checkClass,
  get,
  gets,
  loadingStart,
  loadingFinish,
  addComma,
  checkLogin,
  checkNickname,
  checkPhone,
  handlePhone,
  checkEmail,
  refreshToken,
};
