

export const port = 'http://fund.mahayanamedia.com';
///export const port = 'http://192.168.1.10:8080';

export function getCookie(c_name) {
  if (document.cookie.length>0) {
      let c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1) {
          c_start=c_start + c_name.length+1;
          let c_end = document.cookie.indexOf(";",c_start);
          if (c_end==-1) c_end=document.cookie.length;
          return unescape(document.cookie.substring(c_start,c_end));
      }
  }
  return undefined;
}

export function setCookie(c_name,value,expiredays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate()+expiredays);
    document.cookie=c_name+ "=" +escape(value)+
        ((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
}

export function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}


export function isPromise(value) {
    if (value !== null && typeof value === 'object') {
        return value.promise && typeof value.promise.then === 'function';
    }
}