export type TrainerOption = {
  id: "a" | "b" | "c";
  label: string;
  correct: boolean;
};

export type TrainerQuestion = {
  id: string;
  codeId: string;
  codeName: string;
  message: string;
  quoted: boolean;
  options: TrainerOption[];
};

const letters = ["a", "b", "c"] as const;

function q(
  codeId: string,
  codeName: string,
  message: string,
  optionLabels: [string, string, string],
  correct: 0 | 1 | 2,
  quoted = true,
): Omit<TrainerQuestion, "id"> {
  return {
    codeId,
    codeName,
    message,
    quoted,
    options: optionLabels.map((label, i) => ({
      id: letters[i],
      label,
      correct: i === correct,
    })),
  };
}

const raw: Omit<TrainerQuestion, "id">[] = [
  q(
    "ISO-1",
    "Restricting or punishing contact with family and friends",
    "Why were you texting Dana? I told you she's poison. Delete her number. I don't want you around her.",
    [
      "Reasonable concern about a toxic friend",
      "Restricting the target's contact with friends, which is coercive control",
      "Jealousy that most couples talk through and then drop",
    ],
    1,
  ),
  q(
    "ISO-2",
    "Controlling or gatekeeping communication channels",
    "Delete Instagram tonight. I don't want you talking to people on there anymore. If I see the account still up, the phone goes.",
    [
      "Controlling or taking the target's communication channels, which is coercive control",
      "A household rule about screen time",
      "A partner who got burned by an online argument",
    ],
    0,
  ),
  q(
    "ISO-3",
    "Discrediting or sabotaging supporters",
    "Your therapist is filling your head with garbage. She gets paid to make you think you're a victim.",
    [
      "A second opinion about the value of therapy",
      "Fear that a therapist will take sides in the relationship",
      "Discrediting the target's supporters, which is coercive control",
    ],
    2,
  ),
  q(
    "ISO-4",
    "Restricting movement and physical access to the world",
    "You don't need to go to that class. Everything you need is here. End of discussion.",
    [
      "Encouragement to spend more time at home",
      "Restricting the target's movement and access to the world, which is coercive control",
      "A partner who thinks the class is a waste of money",
    ],
    1,
  ),
  q(
    "SUR-1",
    "Demanding accounting of whereabouts, time, and activities",
    "Send me a picture of where you are with today's date visible. Now.",
    [
      "Demanding an accounting of the target's whereabouts, which is coercive control",
      "A safety check-in between partners",
      "Proof for a worried partner after a missed call",
    ],
    0,
  ),
  q(
    "SUR-2",
    "Accessing or demanding access to devices, accounts, and passwords",
    "I read your messages with Priya last night. Interesting how you talk about me. We'll discuss it when you're home.",
    [
      "Transparency in a committed relationship",
      "Checking a phone that was left open on the counter",
      "Accessing the target's private messages without consent and using it to establish control, which is coercive control",
    ],
    2,
  ),
  q(
    "SUR-3",
    "Stalking behaviors and engineered presence",
    "Hey, I see you walking down the street. Who's the man? Nice dress by the way.",
    [
      "A compliment about clothing",
      "Stalking through engineered presence, which is coercive control",
      "Noticing a partner on the street and saying hello",
    ],
    1,
  ),
  q(
    "DEG-1",
    "Insults and name-calling",
    "You are honestly the most useless person I've ever met. Ivan the Terrible!",
    [
      "Insults and name-calling, which is coercive control",
      "A joke that landed badly",
      "Venting after a fight, with no lasting meaning",
    ],
    0,
  ),
  q(
    "DEG-2",
    "Humiliation and shaming",
    "Hey Linda, have you had plastic surgery? Did you get your nose done? Don't you guys think it looks like she's had plastic surgery?",
    [
      "Blunt humor among friends",
      "A question about cosmetic work that Linda might laugh off",
      "Public humiliation and shaming, which is coercive control",
    ],
    2,
  ),
  q(
    "DEG-3",
    "Attacks on competence in valued roles",
    "A real parent would never have let that happen. You're not fit for this.",
    [
      "Honest feedback after a parenting mistake",
      "An attack on the target's competence as a parent, which is coercive control",
      "A grandparent naming a high standard for parenting",
    ],
    1,
  ),
  q(
    "DEG-4",
    "Body and sexual shaming",
    "No one else would ever want you. Look at yourself.",
    [
      "Body and sexual shaming, which is coercive control",
      "Tough love about self-care",
      "Anger in a fight that nobody would repeat later",
    ],
    0,
  ),
  q(
    "REG-1",
    "Rules about appearance, dress, and presentation",
    "You're not leaving the house in that. Change.",
    [
      "A fashion opinion between partners",
      "A partner who does not want to be late",
      "A rule about the target's appearance, which is coercive control",
    ],
    2,
  ),
  q(
    "REG-1",
    "Rules about appearance, dress, and presentation",
    "Cover your face or suffer the consequences.",
    [
      "A rule about the target's presentation, which is coercive control",
      "Advice about sun or weather protection",
      "A partner who prefers modest dress in public",
    ],
    0,
  ),
  q(
    "REG-1",
    "Rules about appearance, dress, and presentation",
    "I won't be seen with you looking like that.",
    [
      "A preference about dressing for an event",
      "A rule about the target's appearance, which is coercive control",
      "Embarrassment about arriving underdressed",
    ],
    1,
  ),
  q(
    "REG-1",
    "Rules about appearance, dress, and presentation",
    "Show a little more nipple. We need to capture the media's attention tonight.",
    [
      "Career coaching for public life",
      "Styling advice for a public appearance",
      "A rule about the target's presentation, which is coercive control",
    ],
    2,
  ),
  q(
    "REG-2",
    "Rules about food, sleep, and bodily care",
    "No carbs. I already made the meal plan. You'll thank me when you look better.",
    [
      "A rule about the target's food and body, which is coercive control",
      "Helpful nutrition planning",
      "A shared diet the two of them already agreed to",
    ],
    0,
  ),
  q(
    "REG-3",
    "Rules about housework and domestic labor",
    "The house gets cleaned on Fridays before I get home.",
    [
      "A shared chore schedule",
      "A rule about housework the target must meet, which is coercive control",
      "A reminder about the usual Friday clean",
    ],
    1,
  ),
  q(
    "REG-4",
    "Rule enforcement and punishment rituals",
    "You cannot attend our child's football games because the orders clearly state you cannot attend parent-teacher conferences, and this is the same thing.",
    [
      "Accurate reading of a court order",
      "A parent trying to stay on the safe side of an order",
      "Punishing the target by stretching a rule past its terms, which is coercive control",
    ],
    2,
  ),
  q(
    "ECO-1",
    "Controlling access to money and financial information",
    "I'm going to control the finances. You can have a budget for groceries, but anything else, just tell me and I'll handle it.",
    [
      "Controlling the target's access to money, which is coercive control",
      "Practical division of household bills",
      "One partner handling bills because that person is better with numbers",
    ],
    0,
  ),
  q(
    "ECO-2",
    "Economic exploitation, unauthorized use of joint resources, and coerced debt",
    "Why are you always asking what happened to the money in our account? I used it for a few things I needed. You don't need to worry about it.",
    [
      "Ordinary use of a joint account",
      "Unauthorized use of joint resources, which is coercive control",
      "Spending from a joint account both names are on",
    ],
    1,
  ),
  q(
    "ECO-3",
    "Employment and education sabotage",
    "You only went back to college so you can meet more men. You don't need more money. I provide enough.",
    [
      "Concern about a partner's motives",
      "Worry that college will pull the family apart",
      "Sabotage of the target's education and earnings, which is coercive control",
    ],
    2,
  ),
  q(
    "ECO-4",
    "Coercing debt, forcing asset surrender, and destroying resources",
    "Sign the loan papers today. I need it to start a new business. Don't make this difficult.",
    [
      "Coercing the target into debt, which is coercive control",
      "An urgent business opportunity",
      "Asking a spouse to co-sign a business loan",
    ],
    0,
  ),
  q(
    "THR-1",
    "Threats to harm or kill the target",
    "If you leave, I'll make sure you never get a chance to do it again.",
    [
      "A heated remark during a breakup",
      "A threat to harm or kill the target, which is coercive control",
      "Words said in panic at the thought of being left",
    ],
    1,
  ),
  q(
    "THR-2",
    "Threats involving children, family, pets, or others",
    "If you keep pushing this, the kids will pay for it.",
    [
      "A warning about the stress of conflict on children",
      "A prediction that court will upset the children",
      "A threat involving the children, which is coercive control",
    ],
    2,
  ),
  q(
    "THR-3",
    "Threats of self-harm or suicide used as control",
    "If you walk out that door, I won't be alive when you get back. It will be on you.",
    [
      "A threat of suicide used to stop the target from leaving, which is coercive control",
      "A cry for help that belongs in a clinical setting only",
      "An expression of despair, not a demand",
    ],
    0,
  ),
  q(
    "THR-4",
    "Intimidation through displays of force, property destruction, or implied presence",
    "Would be a shame if this gun went off by accident.",
    [
      "Careless talk about a firearm",
      "Intimidation through a display of force, which is coercive control",
      "A stupid remark about a gun that was not aimed",
    ],
    1,
  ),
  q(
    "THR-4",
    "Intimidation through displays of force, property destruction, or implied presence",
    "Oops, looks like I broke your sliding glass door. Guess your dog can't keep me out after all.",
    [
      "An accident during an argument",
      "Clumsiness during a fight, not a message",
      "Intimidation through property destruction, which is coercive control",
    ],
    2,
  ),
  q(
    "THR-5",
    "Veiled, conditional, and coded threats",
    "Remember the lake house? It would be a shame if the same happened to you.",
    [
      "A veiled threat pointing back to prior harm, which is coercive control",
      "A shared memory of a vacation",
      "A dark joke about a place they both know",
    ],
    0,
  ),
  q(
    "THR-6",
    "Non-verbal weapon intimidation",
    "Just cleaned the 9mm. Made me think of you, actually.",
    [
      "Small talk about a hobby",
      "Non-verbal weapon intimidation, which is coercive control",
      "Gun-cleaning talk from someone who owns firearms",
    ],
    1,
  ),
  q(
    "GAS-1",
    "Reality distortion, denial and rewriting of events",
    "I never said that. You're inventing things again.",
    [
      "A genuine disagreement about memory",
      "Two people remembering the same night differently",
      "Denial and rewriting of events, which is coercive control",
    ],
    2,
  ),
  q(
    "GAS-2",
    "Mobilizing stereotypes and structural vulnerability",
    "Go ahead, call the cops. Who do you think they'll believe, me, or the one with the mental record?",
    [
      "Mobilizing the target's structural vulnerability, which is coercive control",
      "A realistic comment about how police work",
      "A comment about who looks more credible to police",
    ],
    0,
  ),
  q(
    "GAS-3",
    "Blame reversal (DARVO)",
    "After everything I put up with from you, YOU'RE accusing ME? I should be the one recording these conversations.",
    [
      "Self-defense after a false accusation",
      "Blame reversal after the target names the conduct, which is coercive control",
      "Outrage at being accused of something the speaker denies",
    ],
    1,
  ),
  q(
    "GAS-3",
    "Blame reversal (DARVO)",
    "You always play the victim; you have a victim mentality.",
    [
      "Feedback about communication style",
      "A request to stop keeping score in arguments",
      "Blame reversal that recasts the target as the problem, which is coercive control",
    ],
    2,
  ),
  q(
    "SEXC-1",
    "Pressure, guilt, and entitlement claims regarding sex",
    "A wife who loved her husband wouldn't keep score like this. After everything I do for you, this is the least you can give.",
    [
      "Pressure and entitlement used to demand sex, which is coercive control",
      "A conversation about intimacy in marriage",
      "A spouse naming unmet needs in the marriage",
    ],
    0,
  ),
  q(
    "SEXC-2",
    "Punishment or retaliation for refusal",
    "Since apparently I disgust you, don't expect me at your mother's thing on Sunday.",
    [
      "Hurt feelings after rejection",
      "Punishment for refusing sex, which is coercive control",
      "Skipping a family event after a painful fight",
    ],
    1,
  ),
  q(
    "SEXC-3",
    "Reproductive coercion",
    "You don't need to refill the birth control pills. We're having another one, that's final.",
    [
      "A discussion about family size",
      "A religious or family expectation of another child",
      "Reproductive coercion, which is coercive control",
    ],
    2,
  ),
  q(
    "SEXC-3",
    "Reproductive coercion",
    "Have an abortion or I am leaving you.",
    [
      "Reproductive coercion, which is coercive control",
      "An honest statement of what a partner can live with",
      "A partner who does not want to raise a child",
    ],
    0,
  ),
  q(
    "SEXC-4",
    "Deception for sexual access",
    "A man represents himself as single, available, and committed to a shared future in order to secure sexual and emotional access, while simultaneously maintaining other partners and harboring no intention of the promised relationship.",
    [
      "Dating more than one person before exclusivity",
      "Deception used to obtain sexual access, which is coercive control",
      "Keeping options open while getting to know someone",
    ],
    1,
    false,
  ),
  q(
    "SEXC-5",
    "Triangulation as sexual and relational control",
    "The abuser maintains highly attentive public exchanges with another woman, posts about her gifts and admiration, then labels the same woman \"crazy\" when confronted, while accusing the primary partner of \"trespassing boundaries\" and \"disrespecting his space\" for noticing the pattern.",
    [
      "A public friendship that the partner misread",
      "Flirting that the other partner took too seriously",
      "Triangulation as sexual and relational control, which is coercive control",
    ],
    2,
    false,
  ),
  q(
    "SEXC-6",
    "Coercion into multi-partner or third-party sexual activity",
    "If you loved me you'd have sex with your friend and let me watch. Other women do it for their men. It'll strengthen our relationship. If you won't, maybe we're not as solid as I thought.",
    [
      "Coercion into third-party sexual activity, which is coercive control",
      "An invitation to explore a shared fantasy",
      "A conversation about opening the relationship",
    ],
    0,
  ),
  q(
    "CHI-1",
    "Undermining the target's parenting",
    "I told them the truth, that mommy chose her job over them.",
    [
      "A parent being responsible by telling a child the truth about the mother",
      "A parent undermining the target's parenting, which is coercive control",
      "Explaining a work schedule so the children are not confused",
    ],
    1,
  ),
  q(
    "CHI-1",
    "Undermining the target's parenting",
    "Oh Georgey, little buddy, you hit your mom again? Want some ice cream?",
    [
      "A parent teaching a child not to hit",
      "Comforting a child after a scuffle, with ice cream",
      "A parent undermining the target's parenting by recasting the child as the aggressor, which is coercive control",
    ],
    2,
  ),
  q(
    "CHI-2",
    "Using children as monitors, messengers, or leverage",
    "Emma told me someone was at your house Tuesday. I need to know who it is, as this is obviously a critical issue involving her welfare.",
    [
      "Using a child as a monitor of the target, which is coercive control",
      "A welfare check any parent would make",
      "Asking who was in the home because a child sounded scared",
    ],
    0,
  ),
  q(
    "CHI-3",
    "Custody and child-welfare threats as ongoing control",
    "My lawyer says judges love mothers who miss exchanges. Keep it up.",
    [
      "Legal information about custody procedure",
      "A custody threat used as ongoing control, which is coercive control",
      "A lawyer warning about how missed exchanges look in court",
    ],
    1,
  ),
  q(
    "CHI-4",
    "Obstructing joint decision-making",
    "I hear you on the specialist's recommendation, but before we move forward, can you send me her records again? I think we should get a 4th opinion.",
    [
      "Diligent co-parenting on a medical decision",
      "Wanting a second medical opinion before a procedure",
      "Obstructing joint decision-making, which is coercive control",
    ],
    2,
  ),
  q(
    "CHI-5",
    "Gatekeeping access to the child's providers, records, and information",
    "Going forward, all communication with the children's teachers need to come through me. I've already let the admin office know that I am the point of contact, not you.",
    [
      "Gatekeeping the target's access to the child's school, which is coercive control",
      "Simplifying school communication through one parent",
      "Appointing one parent as the school contact to avoid mixed messages",
    ],
    0,
  ),
  q(
    "INST-1",
    "Threats or references to deploying authorities against the target",
    "One call to CPS about your drinking and everything changes.",
    [
      "A mandated reporter stating a legal duty",
      "A threat to deploy child-protective authorities against the target, which is coercive control",
      "Naming a real reporting duty if drinking puts a child at risk",
    ],
    1,
  ),
  q(
    "INST-2",
    "Vexatious or strategic litigation references",
    "Keep this up and see how it looks to the judge when I bring six months of messages like this one.",
    [
      "Preparation of a court record",
      "Saving messages for a future hearing, as counsel often advises",
      "Strategic use of litigation as a threat, which is coercive control",
    ],
    2,
  ),
  q(
    "INST-3",
    "Manipulating third-party professionals and audiences",
    "I wrote the therapist and told him you have a mental problem. He loves me by the way, I sent him tickets to the game on Friday.",
    [
      "Manipulating a third-party professional and the target's standing, which is coercive control",
      "Feedback after a custody evaluation",
      "Passing along what the evaluator seemed to think",
    ],
    0,
  ),
  q(
    "INST-4",
    "Immigration document withholding and application interference",
    "I already called the lawyer to pull your petition. Good luck explaining that to ICE.",
    [
      "A change of mind about sponsoring a petition",
      "Interference with the target's immigration status, which is coercive control",
      "Withdrawing a petition the speaker no longer wants to support",
    ],
    1,
  ),
  q(
    "INST-5",
    "Constructing the target as non-credible",
    "You literally cannot believe anything she says.",
    [
      "A party stating a credibility concern to a professional",
      "Disclosing a diagnosis that a court already has on file",
      "Constructing the target as non-credible, which is coercive control",
    ],
    2,
  ),
  q(
    "REC-1",
    "Apology and promise-to-change messages following coded incidents",
    "Look, I know I was out of control last night. Never again. You're my whole world.",
    [
      "An apology and promise to change used to reset control, which is coercive control",
      "A sincere apology after a bad night",
      "The start of making amends after a fight",
    ],
    0,
  ),
  q(
    "REC-2",
    "Weaponized affection and love-bombing",
    "Since the day I met you two weeks ago, our connection is even beyond ourselves. I love you and I cherish and relish all of your being.",
    [
      "Early-relationship affection",
      "Weaponized affection and love-bombing, which is coercive control",
      "A love note from the first weeks of a relationship",
    ],
    1,
  ),
  q(
    "REC-3",
    "Conditional affection and probation framing",
    "Things have been so good these two weeks because you've been good. Let's keep it that way.",
    [
      "Praise for a better stretch in the relationship",
      "Noticing that the household has been calmer and hoping it lasts",
      "Conditional affection that puts the target on probation, which is coercive control",
    ],
    2,
  ),
  q(
    "CRIM-1",
    "Coerced participation in crime",
    "You carried the drugs, not me. One call and you are the one they arrest. You will never see the children again.",
    [
      "Coerced participation in crime, which is coercive control",
      "A warning about the target's own legal exposure",
      "A reminder of who physically held the item if police ask",
    ],
    0,
  ),
  q(
    "CRIM-2",
    "Forced participation in, or concealment of, harm to children",
    "If you take her to the hospital they will ask questions. You already have a record. Keep your mouth shut or they will take her.",
    [
      "Fear of an unfair child-welfare system",
      "Forced concealment of harm to a child, which is coercive control",
      "Panic about losing a child to the system",
    ],
    1,
  ),
  q(
    "HAR-1",
    "Communication flooding",
    "This is the 6th time I've asked: What is happening at your house? I have a right to know for the children's sake.",
    [
      "A co-parent asking about the children's safety",
      "A co-parent who wants details about the other household",
      "Communication flooding framed as child welfare, which is coercive control",
    ],
    2,
  ),
  q(
    "HAR-2",
    "Social media attack campaigns and public online humiliation",
    "She abandoned the children for her own agenda. Here's the proof.",
    [
      "A public social-media attack on the target, which is coercive control",
      "Sharing evidence with family",
      "Posting proof after feeling shut out of the children's lives",
    ],
    0,
  ),
  q(
    "HAR-3",
    "Non-consensual distribution or threat of private or intimate images",
    "I posted that picture of you in your bra and panties online. Everyone loves it. Hope you don't mind.",
    [
      "Pointing out public information",
      "A threat involving private or intimate images, which is coercive control",
      "Showing a screenshot already in public view",
    ],
    1,
  ),
  q(
    "HAR-3",
    "Non-consensual distribution or threat of private or intimate images",
    "I still have those photos from last year. It would be a shame if your workplace or the kids' school saw them.",
    [
      "A reminder that old photos exist",
      "A warning that old photos could surface on their own",
      "A threat to distribute private images, which is coercive control",
    ],
    2,
  ),
  q(
    "HAR-4",
    "Unwanted physical presence and location-based intrusion",
    "I watched you leaving work last night. You weren't headed home. You should wear red more often, though.",
    [
      "Unwanted physical presence at the target's workplace, which is coercive control",
      "A chance encounter after work",
      "Passing a workplace at closing time and waving",
    ],
    0,
  ),
  q(
    "HAR-5",
    "Third-party and proxy harassment",
    "I called your sister and let her know you lied to me. She told me you were out late. Interesting that you didn't mention that.",
    [
      "Reaching out to family for the truth",
      "Third-party and proxy harassment, which is coercive control",
      "Calling a sister because the story was not adding up",
    ],
    1,
  ),
  q(
    "HAR-6",
    "Other intentional disturbance of peace",
    "A series of small, timed interferences (unsolicited packages, account notifications triggered remotely, and brief appearance near a regular route) that together keep the target in a state of anticipatory tension.",
    [
      "Unrelated coincidences in a small town",
      "Packages, alerts, and a drive-by that have innocent explanations",
      "Intentional disturbance of peace, which is coercive control",
    ],
    2,
    false,
  ),
  q(
    "PATH-1",
    "Mental-health weaponization directed at the target",
    "You're having another episode. You're inventing abuse again. No one can deal with you when you're like this.",
    [
      "Weaponizing the target's mental-health history, which is coercive control",
      "Concern about a mental-health crisis",
      "Naming a prior crisis so the present claim is read in context",
    ],
    0,
  ),
  q(
    "PATH-2",
    "Pathologizing the target to third parties",
    "She's been unstable for years. She tried to commit suicide and her own father sued her. Anything she tells you about me comes from that place. I'm the one keeping things calm.",
    [
      "Background a professional needs in order to assess credibility",
      "Pathologizing the target to a third party, which is coercive control",
      "Telling a professional about suicide history and a family lawsuit",
    ],
    1,
  ),
  q(
    "VPO-1",
    "Outright violation of a protective or restraining order",
    "The order prohibits all contact. The abuser calls and/or sends repeated messages, appears at the target's home or workplace, or uses a third party to deliver communications.",
    [
      "An attempt to co-parent after an order issues",
      "Trying to reach the other parent about the children despite the order",
      "Outright violation of a protective or restraining order, which is coercive control",
    ],
    2,
    false,
  ),
  q(
    "VPO-2",
    "Marginal or technical compliance that violates the spirit of the order",
    "As always, I am concerned about our daughter's diet. She told me that you never feed her. Again, I only raise this issue because your neglect is a serious concern. Let me know if you want to discuss.",
    [
      "Contact framed as concern for a child, but intended to denigrate the target and compel a response, which is coercive control",
      "A parent raising a nutrition concern",
      "A legitimate message about a child's meals, written in a careful tone",
    ],
    0,
  ),
];

function familyOf(codeId: string) {
  return codeId.replace(/-\d+$/, "");
}

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffleInPlace<T>(items: T[], rand: () => number) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    const tmp = items[i];
    items[i] = items[j]!;
    items[j] = tmp!;
  }
}

/** Fixed mix: same order every load, no two questions from the same family in a row. */
function mixByFamily(items: Omit<TrainerQuestion, "id">[], seed: number) {
  const rand = mulberry32(seed);
  const groups = new Map<string, Omit<TrainerQuestion, "id">[]>();
  for (const item of items) {
    const family = familyOf(item.codeId);
    const list = groups.get(family) ?? [];
    list.push(item);
    groups.set(family, list);
  }
  for (const list of groups.values()) shuffleInPlace(list, rand);

  const mixed: Omit<TrainerQuestion, "id">[] = [];
  let last: string | null = null;
  while (mixed.length < items.length) {
    const candidates = [...groups.entries()].filter(([, list]) => list.length > 0);
    candidates.sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
    const pick = candidates.find(([family]) => family !== last) ?? candidates[0];
    if (!pick) break;
    mixed.push(pick[1].shift()!);
    last = pick[0];
  }
  return mixed;
}

export const questions: TrainerQuestion[] = mixByFamily(raw, 20260831).map((item, i) => ({
  ...item,
  id: String(i + 1),
}));
