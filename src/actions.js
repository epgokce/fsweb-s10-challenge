import axios from "axios";

export const NOT_EKLE = "NOT_EKLE"
export const NOT_SIL = "NOT_SIL"
export const GOT_ORDER_REQUIRING_API = "GOT_ORDER_REQUIRING_API"
export const GOT_ERROR = "GOT ERROR";

export function notEkle(not) {
  // ...
  return { type: NOT_EKLE, payload: not };
}

export function notSil(notId) {
  // ...
  return { type: NOT_SIL, payload: notId };
}

function gotError(error) {
  return { type: GOT_ERROR, payload: error};
}

function gotOrderRequiringApi () {
  return {type: GOT_ORDER_REQUIRING_API};
}

export const notEkleAPI = (yeniNot) => dispatch => {
  dispatch(gotOrderRequiringApi());
  axios
    .post("https://httpbin.org/anything", yeniNot)
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notEkle ile dispatch edin
        dispatch(notEkle(res.data.json));
      }
    })
    .catch((error) => {
      dispatch((error.message));
  })
}

export const notSilAPI = (id) => dispatch => {
  dispatch(gotOrderRequiringApi());
  axios
    .delete("https://httpbin.org/anything", { data: id })
    .then((res) => {
      if (res.status === 200) {
        // res.data objesi içerisinden ihtiyaç duyduğunuz değeri bulun ve oluşturduğunuz notSil ile dispatch edin 
        dispatch(notSil(res.data.data));
      }
    })
    .catch((error) => {
      dispatch(gotError(error.message));
  });
}