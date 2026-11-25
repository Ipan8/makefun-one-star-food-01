// One Star, Five Stars for the Food — make.fun bounty
// u-po-pu-one-star-five-stars-for-the-food-f9166ee7
//
// Brief: one sentence, at most 200 characters, in the voice of an alien
// tourist giving planet Earth a one-star review while still slipping in a
// real compliment about the food. The judge compares entries two at a time
// in private rounds, so the line has to land on its own, with no setup.
//
// Why the winner wins: the complaint is alien-specific (a hotel charging
// extra for gravity, luggage still in orbit), the compliment names a real
// dish (nasi goreng from a nameless cart) instead of generic "nice food",
// and it escalates past the complaint — the food was worth a 40-light-year
// flight. One angle, one sentence, complaint and compliment in one breath.
// The two weaker contenders stay in the file as the ranked shortlist: a
// generic noodle compliment first, then satay with a weaker escalation.

import { mkdirSync, writeFileSync } from "node:fs";

const CONTENDERS: string[] = [
  "One star: the Wi-Fi password is 'password,' the rain ruined my tentacles, but the noodles were nice.",
  "One star: my saucer got towed, the tour guide abducted the wrong tourist, but the street satay was so good I stayed an extra orbit.",
  "One star: the hotel charged extra for gravity, my luggage is still in orbit, but the nasi goreng from the cart with no name was worth the 40-light-year flight.",
];

function validate(sentence: string): void {
  if (sentence.length === 0) {
    throw new Error("contender is empty");
  }
  if (sentence.includes("\n") || sentence.includes("\r")) {
    throw new Error(`contender contains a newline: ${sentence}`);
  }
  if (sentence.length > 200) {
    throw new Error(`contender is ${sentence.length} chars, over the 200-char limit: ${sentence}`);
  }
  const periods = (sentence.match(/\./g) ?? []).length;
  if (periods !== 1) {
    throw new Error(`contender must contain exactly one period, found ${periods}: ${sentence}`);
  }
  if (!sentence.endsWith(".")) {
    throw new Error(`contender must end with a period: ${sentence}`);
  }
}

for (const contender of CONTENDERS) {
  validate(contender);
}

const winner = CONTENDERS[CONTENDERS.length - 1];
validate(winner);

console.log(winner);
console.log(`(${winner.length} chars, one sentence)`);

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", winner + "\n");
