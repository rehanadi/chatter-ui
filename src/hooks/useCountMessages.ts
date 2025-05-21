import { useCallback, useState } from "react";
import { API_URL } from "../constants/urls";
import { snackVar } from "../constants/snack";
import { UNKNOWN_ERROR_SNACK_MESSAGE } from "../constants/errors";
import { commonFetch } from "../utils/fetch";

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await commonFetch(`${API_URL}/messages/count?chatId=${chatId}`);

    if (!res.ok) {
      snackVar(UNKNOWN_ERROR_SNACK_MESSAGE);
      return;
    }

    const { count } = await res.json();
    setMessagesCount(count);
  }, [chatId]);

  return { messagesCount, countMessages };
};

export { useCountMessages };