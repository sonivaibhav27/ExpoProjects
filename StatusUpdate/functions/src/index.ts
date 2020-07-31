import * as functions from "firebase-functions";

export const onUpdates = functions.database
  .ref("/rooms/{chatRoom}/messages/{roomId}")
  .onCreate((snapshot, context) => {
    const messages = snapshot.val();
    const replace = addPizzazz(messages.text);
    return snapshot.ref.update({ text: replace });
  });

function addPizzazz(text: string): string {
  return text.replace(/\bpizza\b/g, "🍕");
}

function returnPromise(text: number): Promise<Array<Number>> {
  return new Promise((res, rej) => {
    res([1, 2, 3, 4, 5, 6, text]);
  });
}

returnPromise(12).then((stringWrrod: Array<Number>) =>
  console.log(stringWrrod)
);
