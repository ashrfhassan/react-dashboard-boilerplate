import moment from 'moment';
import momentTimezone from 'moment-timezone';
import html2canvas from 'html2canvas';
import 'moment/min/locales.min';
declare global {
  interface Window {
    eventWaiters: any;
  }
}
window.eventWaiters = {};

export const partialText = (txt: string, maxLength = 20): string => {
  if (typeof txt !== 'string') return txt;
  if (txt.length > maxLength) return txt.substr(0, maxLength) + '... ';
  return txt;
};

export const subStringBack = (
  txt: string,
  separator: string
): string | undefined => {
  if (!txt || !separator) return '';
  return txt.split(separator).pop();
};

export const randomStr = (length = 20): string => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$&';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const timestampToDate = (
  timestamps = moment().unix(),
  format = 'DD-MM-YYYY hh:mm a'
) => {
  return momentTimezone(moment.unix(timestamps))
    .tz('Africa/Cairo')
    .format(format);
};

export const formateDate = (
  date: string | undefined,
  lang: 'ar' | 'en',
  dateFormat = 'DD-MM-YYYY HH:mm:ss',
  format = 'LL'
) => {
  if (!date) return '';
  moment.locale(lang === 'ar' ? 'ar-sa-mine' : 'en');
  return moment(date, dateFormat).format(format);
};

export const dateComparedWithToday = (
  timestamps = moment().unix(),
  format = 'DD-MM-YYYY hh:mm a'
) => {
  const today = moment();
  const yesterday = today.clone().subtract(1, 'days').startOf('day');
  const date = momentTimezone(moment.unix(timestamps)).tz('Africa/Cairo');
  if (date.isSame(today, 'd')) return `Today at ${date.format('hh:mm a')}`;
  else if (date.isSame(yesterday, 'd'))
    return `Yesterday at ${date.format('hh:mm a')}`;
  else if (date.isSame(today, 'week'))
    return `${date.format('dddd')} ${date.format('hh:mm a')}`;
  return date.format(format);
};

export const download = (path: string, fileName: string) => {
  fetch(path).then((response) => {
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
    });
  });
};

export const sleep = async (ms: number) => {
  return await new Promise((resolve) => setTimeout(resolve, ms));
};

export const isHtml = (str: string) => {
  return /<([A-Za-z][A-Za-z0-9]*)\b[^>]*>(.*?)<\/\1>/.test(str);
};

export const getFiles = async (
  files: any
): Promise<
  { name: string; type: string; size: string; base64: string; file: any }[]
> => {
  const allFiles: any = [];
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    allFiles.push(readFileAsync(file));
  }
  return await Promise.all(allFiles);
};

function readFileAsync(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const fileInfo = {
        name: file.name,
        type: file.type,
        size: Math.round(file.size / 1000) + ' kB',
        base64: reader.result,
        file: file,
      };
      resolve(
        fileInfo as {
          name: string;
          type: string;
          size: string;
          base64: string;
          file: any;
        }
      );
    };

    reader.onerror = reject;

    reader.readAsDataURL(file);
  });
}

export const isScrollBottom = (
  element: HTMLElement,
  elementHeight: number,
  gapFromBottom = 0
): boolean => {
  const position = element.scrollTop;
  const scrollerBarHeight =
    element.clientHeight * (element.clientHeight / element.offsetHeight);
  const percentageOfTotalHeight = (gapFromBottom * elementHeight) / 100;
  return !(
    position <
    elementHeight - (scrollerBarHeight + percentageOfTotalHeight)
  );
};

export const isScrollTop = (
  element: HTMLElement,
  elementHeight: number,
  gapFromTop = 0
): boolean => {
  const position = element.scrollTop;
  const percentageOfTotalHeight = (gapFromTop * elementHeight) / 100;
  return position > 0 && position <= percentageOfTotalHeight;
};

export const getFileExtension = (str: string, delimiter: string): string => {
  try {
    // is base64
    atob(subStringBack(str, ',') as string);
    return str.split(',')[0].split(';')[0].split('/').pop() as string;
  } catch (e) {
    return subStringBack(str, delimiter) as string;
  }
};

export const updateTableStyle = (domBody: any) => {
  for (let i = 0; i < domBody.getElementsByTagName('colgroup').length; i++) {
    for (let k = 0; k < domBody.getElementsByTagName('tr').length; k++) {
      const currentColWidth = domBody
        .getElementsByTagName('colgroup')
        [i].getAttribute('width');
      if (currentColWidth !== null) {
        domBody.getElementsByTagName('tr')[k].getElementsByTagName('td')[
          i
        ].style.minWidth = (parseInt(currentColWidth) + 100).toString() + 'px';
      }
    }
  }
};

export const str2DOMElement = async (html: any, cb: (content: any) => void) => {
  const frameTemp: any = document.createElement('iframe');
  const frame: any = document.createElement('iframe');
  // first frame
  frame.style.position = 'absolute';
  frame.style.left = '-100rem';
  frame.style.zIndex = 10;
  document.body.appendChild(frame);
  frame.contentDocument.open();
  frame.contentDocument.write(html);
  frame.contentDocument.close();
  // update table style if it's html not html5
  updateTableStyle(frame.contentDocument.body);
  // temp frame
  frameTemp.style.position = 'absolute';
  frameTemp.style.left = '-100rem';
  frameTemp.style.zIndex = 20;
  frameTemp.style.height =
    frame.contentWindow.document.body.scrollHeight.toString() + 'px';
  frameTemp.style.width =
    frame.contentWindow.document.body.scrollWidth.toString() + 'px';
  document.body.appendChild(frameTemp);
  frameTemp.contentDocument.open();
  frameTemp.contentDocument.write(frame.contentDocument.body.outerHTML);
  frameTemp.contentDocument.close();
  const results = await cb(frameTemp.contentDocument);
  document.body.removeChild(frame);
  document.body.removeChild(frameTemp);
  return results;
};

export const generateCanvas = async (domEl: any) => {
  return await html2canvas(domEl.querySelector('html'), {});
};

export const dataURLtoFile = (dataUrl: string, filename: string) => {
  const arr: any = dataUrl.split(',') as any,
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const isUnicode = (str: any) => {
  const letters = [];
  for (let i = 0; i <= str.length; i++) {
    letters[i] = str.substring(i - 1, i);
    if (letters[i].charCodeAt() > 255) {
      return true;
    }
  }
  return false;
};
/*
example usage
el.on("keyup", () => {eventFinishedWaiter('searching', 2000, () => { console.log('fired!') })});
el.on("keydown", () => {eventFinishedWaiter('searching')});
*/
export const eventFinishedWaiter = (
  eventName: string,
  ms?: number,
  action?: () => void
) => {
  if (typeof action !== 'undefined') {
    clearTimeout(window.eventWaiters[eventName]);
    window.eventWaiters[eventName] = setTimeout(action, ms);
  } else {
    clearTimeout(window.eventWaiters[eventName]);
  }
};

export const yupErrorMapping = async (schema: any, values: any) => {
  const errors: any = {};
  return await schema
    .validate(values, {
      abortEarly: false,
      strict: false,
    })
    .then(() => errors)
    .catch((err: any) => {
      err.inner.forEach((errVal: any) => {
        errors[errVal.path] = errors[errVal.path]
          ? [...errors[errVal.path], errVal.message]
          : [errVal.message];
      });
      return errors;
    });
};

export function isInt(n: number) {
  return Number(n) === n && n % 1 === 0;
}

export function isFloat(n: number) {
  return Number(n) === n && n % 1 !== 0;
}

export const deepFind = (propPath: string, obj: any, defaultVal?: any): any => {
  const keys = propPath.split('.');
  for (let i = 0; i < keys.length; i++) {
    obj = obj[keys[i]];
  }
  return obj ?? defaultVal;
};

export const IsJsonString = (str: string) => {
  if (!str) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const highlight = (text: string, htmlelements: NodeListOf<Element>) => {
  htmlelements.forEach((el) => {
    let innertext = el.innerHTML;
    if (innertext.indexOf('highlight-text') !== -1) {
      innertext = innertext
        .replace('<span class="highlight-text">', '')
        .replace('</span>', '');
      el.innerHTML = innertext;
    }
    const index = innertext.indexOf(text);
    if (index >= 0 && text.trim() !== '') {
      el.innerHTML =
        innertext.substring(0, index) +
        "<span class='highlight-text'>" +
        innertext.substring(index, index + text.length) +
        '</span>' +
        innertext.substring(index + text.length);
    }
  });
};
