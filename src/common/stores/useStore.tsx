import {useState} from "react";
import {Store} from "@common/stores/Store";

export const useStore = <T extends Store>(createStore: () => T) => {
  const [store] = useState(() => {
    const newStore = createStore()
    if (newStore.init) {
      newStore.init()
    }

    return newStore
  })

  return store
}