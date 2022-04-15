import { AxiosResponse } from "axios";

export function hasFullnamePrefix (item: any) {
    return /^(t\d|LiveUpdateEvent)_/.test(item);
}


export function addFullnamePrefix (item: string | any, prefix: string) {
    if (typeof item === 'string') {
      return hasFullnamePrefix(item) ? item : prefix + item;
    }
    return item.name;
}

export function handleJsonErrors (response: any) {
    if (!isEmpty(response) && !isEmpty(response.json.errors)) {
      throw new Error(response.json.errors[0]);
    }
}