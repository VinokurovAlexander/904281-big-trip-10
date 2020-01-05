import flatpickr from "flatpickr";
import {Russian} from "flatpickr/dist/l10n/ru.js";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/light.css";

export const flatpickrInit = (element, date) => {
  return flatpickr(element, {
    allowInput: true,
    defaultDate: date,
    enableTime: true,
    locale: Russian,
    dateFormat: `m/d/y H:m`,
    altInput: true,
    altFormat: `d/m/y H:m`,
  });
};
