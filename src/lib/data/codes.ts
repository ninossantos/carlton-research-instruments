export const CODEBOOK_TITLE = "Is it coercive control?";

export type Subcode = {
  id: string;
  slug: string;
  categoryId: string;
  name: string;
  definition: string;
  how?: string;
  function?: string;
  harm?: string;
  why?: string;
  example: string;
  citation: string;
};

export type Category = {
  id: string;
  slug: string;
  number: number;
  name: string;
  blurb: string;
  literature: string;
  subcodes: Subcode[];
};

function sc(
  categoryId: string,
  num: number,
  name: string,
  fields: Omit<Subcode, "id" | "slug" | "categoryId" | "name">,
): Subcode {
  const id = `${categoryId}-${num}`;
  return { id, slug: id.toLowerCase(), categoryId, name, ...fields };
}

const SLUG_ALIASES: Record<string, string> = {
  econ: "eco",
  coer: "crim",
};

export const categories: Category[] = [
  {
    id: "ISO",
    slug: "iso",
    number: 1,
    name: "Isolation",
    blurb:
      "The active process of disconnecting the target from friends, family, colleagues, and other sources of support so that the abuser becomes the primary or sole source for reality, belonging, and support. Isolation is not a passive side-effect of abuse. Isolation is a deliberate set of lonely-making tactics that disrupt both existence and reality.",
    literature: "Stark 2007, 2012; Pence & Paymar 1993; Skoog Waller & Forinder 2025; Dragiewicz et al. 2018; Woodlock 2017.",
    subcodes: [
      sc("ISO", 1, "Restricting or punishing contact with family and friends", {
        definition: "Demands, rules, or punishments that limit, condition, or end the target's contact with family, friends, colleagues, social structure, culture, or other sources of belonging.",
        how: "Forbidding calls and visits, and forcing a them-or-me choice between the abuser and a named person in the network. Indoctrinating withdrawal so the cutoff looks like the target's own decision. Abusers teach that friends and family are contaminated or dangerous until the target ends those relationships one person at a time. The accompanying message is that the target has no one else. Punishing contact after it has already occurred. Interrogation, violence, or withdrawal of resources can follow a visit, a workday, or a call. Isolating the target from work and public life, including requiring the target to stay home and intimidating people at the workplace in order to drive the network away. Blocking family after separation, including using children or a best-interests frame to stop the target seeing a relative, preventing children from seeing a parent or grandparents, and cutting children's contact with family for trivial causes.",
        function: "Cut the target off from social support so the abuser becomes the sole source of belonging. The people who could have received a disclosure, offered a place to go, or contradicted the abuser's account have already been forbidden, labeled dangerous, or driven away.",
        harm: "Progressive loss of family, friends, colleagues, and social connection. Reality-testing and help-seeking shrink to the abuser's version of events. Children lose grandparents, other households, and extracurricular life when the adult network is cut. Belonging is replaced by dependence.",
        why: "Ordinary dislike of a third party, and accurate implementation of a real no-contact order, do not end the target's social world. The conduct here ends the relationship with the third party, or makes that relationship too costly to keep.",
        example: "Why were you texting Dana? I told you she's poison. Delete her number. I don't want you around her.",
        citation: "Erez, Adelman & Gregory 2009; Johnson 2008; Katz 2016; Pence & Paymar 1993; Spearman, Hardesty & Campbell 2023; Stark 2007, 2012; Skoog Waller & Forinder 2025.",
      }),
      sc("ISO", 2, "Controlling or gatekeeping communication channels", {
        definition: "Confiscating, destroying, taking over, or forbidding the devices, accounts, platforms, or methods the target may use to communicate with others, so independent contact becomes difficult or impossible.",
        how: "Confiscating, destroying, forcing the sharing of, or demanding passwords for phones, computers, and accounts, including entering phones and tablets and forbidding calls to family. Banning platforms, forcing blocks, impersonating the target, and taking over passwords. A stolen phone, changed passwords, and messages sent to the target's contacts while the abuser pretends to be the target produce isolation by converting the network itself into an instrument of cutoff. Using technology to isolate after physical distance increases. Geographic exit does not restore a private line. Rural and remote digital cutoff compounds geographic distance from informal and formal support. Shared cloud, family, or device accounts that persist after separation keep the abuser on the only remaining line. Forcing disconnection as safety work that produces isolation. Targets delete accounts, change numbers repeatedly, and block the abuser's friends and family, then become uncontactable to housing, services, friends, family, and work, while the former partner usually continues to have free range online. Relocating can finish the same loss of remaining supports. Stripping devices in disability contexts, cutting the channel on which support would have arrived.",
        function: "Remove or occupy the devices, accounts, and platforms that would let the target reach anyone without the abuser present. Help cannot travel on a channel the abuser already holds, floods, or has forced the target to abandon.",
        harm: "Loss of a private line to support, information, housing, and services. Safety-network disconnection leaves the target uncontactable to the same systems that might have helped. Mental-health harm and non-help-seeking follow when the only remaining line is also the abuser's line.",
        why: "Ordinary household agreements about shared family devices carry no punishment and do not abolish private contact. The conduct here removes the means of speaking to anyone the abuser has not approved.",
        example: "Delete Instagram tonight. I don't want you talking to people on there anymore. If I see the account still up, the phone goes.",
        citation: "Dragiewicz et al. 2018, 2021; Douglas, Harris & Dragiewicz 2019; Dragiewicz, Woodlock, Salter & Harris 2022; Harris & Woodlock 2019; Havard & Lefevre 2020; Skoog Waller & Forinder 2025; Woodlock 2017; Woodlock & Harris 2023.",
      }),
      sc("ISO", 3, "Discrediting or sabotaging supporters", {
        definition: "Systematic denigration, smear, or harassment of the target's friends, family, therapist, advocate, or attorney, aimed at severing trust in those relationships.",
        how: "Denigrating supporters so the target cuts them or so they withdraw. Friends and family are labeled as sexually contaminated, manipulative, or enemies until the target performs the cutoff. Controlling who the target sees and talks to is isolation. Discrediting those people is how remaining ties are made unusable. Harassing the target's people directly, producing proxy isolation, including contacting family in order to find the target. Dual-code HAR when the same conduct is also harassment. Isolation applies when the function is network-severing. Smearing the target in public so the community withdraws or turns on the target, including negative postings on social media. Dual-code HAR-2 and ISO-3 when the function is network-severing. Discrediting professional supporters to the target. Attacks on a therapist, advocate, or attorney designed to make the target drop them are ISO-3. Performing for an evaluator is INST. Constructing the target as mentally unwell to a court or other system is INST and PATH. Continuing isolation and discrediting after separation as a named class of post-separation abuse.",
        function: "Destroy the credibility of remaining supporters so the target stops turning to them, or so those people withdraw. Independent witnesses have already been labeled as liars, mercenaries, or enemies.",
        harm: "The target loses both the people and the credibility of the people who might have offered perspective, validation, or practical help. Lack of support can feel more traumatic than the abuse itself. Remaining supporters, once discredited, cannot test the abuser's version of events.",
        why: "Ordinary one-off criticism of a third party does not aim to sever the relationship. The conduct here destroys remaining independent witnesses.",
        example: "Your therapist is filling your head with garbage. She gets paid to make you think you're a victim.",
        citation: "Pence & Paymar 1993; Spearman, Hardesty & Campbell 2023; Stark 2007, 2012; Sweet 2019; Skoog Waller & Forinder 2025; Woodlock 2017.",
      }),
      sc("ISO", 4, "Restricting movement and physical access to the world", {
        definition: "Forbidding destinations, taking transportation, or requiring permission or escorts, so independent movement depends on the abuser's approval.",
        how: "Detaining the target in the house, including keeping the target from leaving often or at all. Taking transport and keys, hiding keys, disabling vehicles, and denying phones or cars as a method of confinement, including rural households organized around a single car the abuser controls. Relocating the household to a more remote geography, moving the family onto a remote property, destroying other relationships, and restricting technology so miles and cutoff work together. Urban isolation more often drives away friends and work rather than relying on distance. Punishing outings and imposing timed return, including punishment for coffee, a walk, or speaking to a neighbor, calls to check whether shopping took too long, timed return, bans on after-school clubs, and bans on children's parties after accusations that those outings were disloyal. Pairing physical restriction with digital isolation so the target cannot reach support in person once the phone is also gone. Smart locks and other connected devices that restrict exit are ISO-4. The same devices are SUR when they watch. Intruding physically after separation so new geography collapses, including sitting outside a house or workplace. Dual-code HAR when the function is to make independent movement feel pointless.",
        function: "Make independent movement a privilege the abuser can grant or withdraw. The body cannot reach help if keys, vehicles, and exits already belong to the abuser, or if the household has been moved beyond reach of help.",
        harm: "Contraction of the target's lived geography. House detention, disabled vehicles, remote relocation, and timed errands convert ordinary mobility into an infraction. Independent movement feels pointless once the abuser can still appear at a new house or workplace.",
        why: "Ordinary logistical coordination of a shared car or calendar does not convert leaving the house into an infraction. The conduct here confines the body so the social world cannot be reached.",
        example: "You don't need to go to that class. Everything you need is here. End of discussion.",
        citation: "Harris & Woodlock 2019; Johnson 2008; Katz 2016; Pence & Paymar 1993; Stark 2007, 2012; Skoog Waller & Forinder 2025; Woodlock 2017.",
      }),
    ],
  },
  {
    id: "SUR",
    slug: "sur",
    number: 2,
    name: "Surveillance and monitoring",
    blurb:
      "Converts the target's life into an object of continuous visibility: location, communications, activities, and routines, through accounting demands, device access, physical presence, investigators, and everyday technologies. Official New South Wales data recorded harassment, monitoring or tracking in 56 percent of coercive-control incidents between 2024 and 2025.",
    literature: "Dragiewicz et al. 2018; Harris & Woodlock 2019; Woodlock 2017; Turk 2025; Hocking et al. 2025; NSW BOCSAR 2026.",
    subcodes: [
      sc("SUR", 1, "Demanding accounting of whereabouts, time, and activities", {
        definition: "Interrogation about location, companions, schedule, or activities that goes beyond ordinary coordination and carries an accusatory or entitlement frame.",
        how: "Demands for real-time location, photos as proof of place, minute-by-minute accounting of time, and questions framed as entitlement rather than logistics.",
        function: "Establish the abuser's right to know the target's movements and punish deviations from expected patterns.",
        harm: "The conversion of ordinary life into a reportable regime; the target learns that independent movement requires explanation and risks consequences.",
        why: "Ordinary logistical questions about shared schedules or childcare arrangements that lack an interrogative or punitive pattern. The conduct here establishes the abuser's right to know the target's movements and punish deviations from expected patterns.",
        example: "Send me a picture of where you are with today's date visible. Now.",
        citation: "Harris & Woodlock 2019; Woodlock 2017.",
      }),
      sc("SUR", 2, "Accessing or demanding access to devices, accounts, and passwords", {
        definition: "Demands for passwords, evidence of having read private communications, installation or reference to tracking tools, or control over devices and accounts that enable ongoing visibility.",
        how: "Quoting private messages, demanding shared location permanently, requiring passwords or account access, installing or referencing spyware or monitoring software, and controlling shared cloud or family accounts that persist after separation.",
        function: "Eliminate private channels of communication and information so that the target's digital life remains open to the abuser.",
        harm: "The loss of private space; the target cannot communicate, seek information, or store personal material without the possibility of inspection.",
        why: "Mutually agreed shared family accounts absent coercion or punitive enforcement. The conduct here eliminates private channels of communication and information so that the target's digital life remains open to the abuser.",
        example: "I read your messages with Priya last night. Interesting how you talk about me. We'll discuss it when you're home.",
        citation: "Dragiewicz et al. 2018; Hocking et al. 2025; Brown, Harkin & Tanczer; Woodlock 2017.",
      }),
      sc("SUR", 3, "Stalking behaviors and engineered presence", {
        definition: "References to following, appearing uninvited, watching the residence or workplace, or knowledge that could only come from physical or technological surveillance.",
        how: "Statements showing knowledge of the target's location or activities that the target did not disclose, appearances at places the target did not announce, and use of physical trackers, vehicle location data, or smart-device alerts to establish presence.",
        function: "Demonstrate that the abuser remains aware of the target's movements and can materialize without warning.",
        harm: "The collapse of safe space; the target experiences no reliable boundary between public and private life and must constantly calculate the risk of being observed or found.",
        why: "Coincidental encounters that context clearly frames as accidental. The conduct here demonstrates that the abuser remains aware of the target's movements and can materialize without warning.",
        example: "Nice blue jacket today. You should smile more when you walk to your car.",
        citation: "Hocking et al. 2025; Harris & Woodlock 2019; Turk 2025; Woodlock 2017.",
      }),
    ],
  },
  {
    id: "DEG",
    slug: "deg",
    number: 3,
    name: "Degradation",
    blurb:
      "Attacks the target's dignity, self-worth, and personhood through insults, public and private shaming, attacks on competence, and body or sexual denigration. Survivors describe death by a thousand insults, and being broken down until they no longer recognize themselves.",
    literature: "Pence & Paymar 1993; Stark 2007; Gampe, Jeffries & Rathus 2025; Kurbatfinski et al. 2025.",
    subcodes: [
      sc("DEG", 1, "Insults and name-calling", {
        definition: "Direct verbal abuse consisting of slurs, epithets, characterological attacks, or repeated pejoratives directed at the target's person rather than a specific disputed fact.",
        how: "Repeated pejoratives, contemptuous nicknames, and blanket character judgments not tied to a disputed fact.",
        function: "Lower the target's self-regard and mark them as inferior.",
        harm: "The steady accumulation of verbal injury that erodes confidence and makes the target more susceptible to further control.",
        why: "Profanity directed at a situation rather than the person, and disputes about the accuracy of a specific claim when the dispute remains focused on the fact itself. The conduct here lowers the target's self-regard and mark them as inferior.",
        example: "You are honestly the most useless person I've ever met. Ivan the Terrible!",
        citation: "Gampe, Jeffries & Rathus 2025; Pence & Paymar 1993; Stark 2007.",
      }),
      sc("DEG", 2, "Humiliation and shaming", {
        definition: "Statements or acts designed to embarrass, expose, or produce shame in the target, including public humiliation, weaponized public shaming, and post-separation reputation attacks.",
        how: "Mocking in group settings or threads, statements that \"everyone\" thinks the target is pathetic, sharing or threatening to share embarrassing material, and campaigns that attack the target's reputation with family, friends, colleagues, or online audiences.",
        function: "Damage the target's standing with others and internalize shame so that the target self-censors or withdraws.",
        harm: "Public and private loss of dignity, social withdrawal, and the conversion of the target's network into a site of potential exposure.",
        why: "Private disagreement that lacks an audience or shaming frame. The conduct here damages the target's standing with others and internalize shame so that the target self-censors or withdraws.",
        example: "Hey Linda, have you had plastic surgery? Did you get your nose done? Don't you guys think it looks like she's had plastic surgery?",
        citation: "Kurbatfinski et al. 2025; Gampe, Jeffries & Rathus 2025; Pence & Paymar 1993; Stark 2007.",
      }),
      sc("DEG", 3, "Attacks on competence in valued roles", {
        definition: "Messaging that explicitly or implicitly positions the target as a failure in roles that carry personal or social value, most commonly parenting, work, or partnership.",
        how: "Implicit or explicit statements that the target is a bad parent, incompetent worker, or failed partner, and claims that others would be better off without them.",
        function: "Undermine the target's sense of efficacy and make competency in those roles appear impossible.",
        harm: "The erosion of confidence in the very domains that support autonomy and self-respect.",
        why: "Specific, bounded criticism of a single act that does not generalize to the person's overall competence. The conduct here undermines the target's sense of efficacy and make competency in those roles appear impossible.",
        example: "A real parent would never have let that happen. You're not fit for this.",
        citation: "Kurbatfinski et al. 2025; Gampe, Jeffries & Rathus 2025; Stark 2007.",
      }),
      sc("DEG", 4, "Body and sexual shaming", {
        definition: "Denigration of the target's body, appearance, attractiveness, or sexual adequacy.",
        how: "Weight or appearance attacks, comparisons to others, sexual insults, and shaming related to sexual history or performance.",
        function: "Attack a core site of selfhood and produce shame that restricts social participation and intimate autonomy.",
        harm: "Body-related shame, reduced willingness to be seen, and further isolation.",
        why: "Neutral references to appearance that carry no denigrating intent. The conduct here attacks a core site of selfhood and produce shame that restricts social participation and intimate autonomy.",
        example: "No one else would ever want you. Look at yourself.",
        citation: "Kurbatfinski et al. 2025; Gampe, Jeffries & Rathus 2025; Pence & Paymar 1993; Stark 2007.",
      }),
    ],
  },
  {
    id: "REG",
    slug: "reg",
    number: 4,
    name: "Micro-regulation of everyday life",
    blurb:
      "Extends control into the minute details of daily existence: appearance, food, sleep, bodily care, housework, medication, and invented private standards. A 2025 review found survivors commonly live under an unpredictable and shifting rule book.",
    literature: "Stark 2007; Hamberger, Larsen & Lehrner 2017; Crossman & Hardesty 2018; Choudhury, Martland & Luzon 2025; Walker, Hester & McCarthy 2023.",
    subcodes: [
      sc("REG", 1, "Rules about appearance, dress, and presentation", {
        definition: "Explicit or implied rules about clothing, hair, makeup, or overall presentation, with consequences for noncompliance.",
        how: "Directives about what may or may not be worn, requirements for approval of appearance, and punishment for clothing or grooming choices.",
        function: "Assert ownership over the target's public and private presentation.",
        harm: "The loss of autonomy over self-presentation and the conversion of ordinary choices into potential sites of punishment. Common in cults, ideological movements, or extreme religiosity, e.g., Christ Gospel Church, the Taliban, Boko Haram, Khmer Rouge, and in certain high-control celebrity relationships within Hollywood culture involving extreme ownership of a partner's public body and presentation.",
        why: "Ordinary compliments or mutual style preferences that carry no enforcement. The conduct here asserts ownership over the target's public and private presentation.",
        example: "You're not leaving the house in that. Change. \" or \"Cover your face or suffer the consequences. \" or \"I won't be seen with you looking like that. \" or \"You need to show a little more nipple if we are going to capture the media's attention.",
        citation: "Choudhury, Martland & Luzon 2025; Pence & Paymar 1993; Stark 2007.",
      }),
      sc("REG", 2, "Rules about food, sleep, and bodily care", {
        definition: "Control over eating, sleeping, medication, hygiene, or other forms of bodily care.",
        how: "Rules about what or when the target may eat. Control of sleep timing or sleep deprivation. Withholding, forcing, or covertly administering medication or other substances. Decisions about basic care such as bathing.",
        function: "Regulate the target's body and basic capacities for independent functioning.",
        harm: "The conversion of essential bodily needs into instruments of control, producing physical deterioration, dependence, and fear.",
        why: "Ordinary household coordination of meals or bedtimes without punitive framing or bodily control. The conduct here regulates the target's body and basic capacities for independent functioning.",
        example: "No carbs. I already made the meal plan. You'll thank me when you look better.",
        citation: "Choudhury, Martland & Luzon 2025; Stark 2007; Walker, Hester & McCarthy 2023.",
      }),
      sc("REG", 3, "Rules about housework and domestic labor", {
        definition: "Assignment, inspection, or punishment related to cleaning, cooking, childcare, or other domestic tasks that go beyond ordinary household negotiation.",
        how: "Detailed instructions about how and/or when tasks must be performed, inspections, and punishment for perceived shortfalls.",
        function: "Enforce a hierarchy of domestic labor and keep the target occupied under continuous assessment.",
        harm: "The exhaustion of time and energy that might otherwise support autonomy or exit.",
        why: "Ordinary requests for shared household contribution without surveillance or penalty. The conduct here enforces a hierarchy of domestic labor and keep the target occupied under continuous assessment.",
        example: "The house gets cleaned on Fridays before I get home.",
        citation: "Crossman & Hardesty 2018; Pence & Paymar 1993; Stark 2007.",
      }),
      sc("REG", 4, "Rule enforcement and punishment rituals", {
        definition: "The abuser invents a private rule, not actually found in any law, custom, order, or agreement, and presents it as binding, attaching a real or implied penalty for noncompliance. The defining element is the punishment mechanism, not the mere existence of a rule; a rule with no consequence attached is not REG-4.",
        how: "An invented condition on contact, information, or access, paired with a stated or clearly implied cost for violating it. Permission-seeking demanded of the target for matters the abuser has no authority over. Enumerated consequences for infractions of a regime the abuser alone has authored.",
        function: "Keep the target in a state of continuous assessment and uncertainty.",
        harm: "Chronic hypervigilance and the impossibility of predicting what will trigger punishment or chaos.",
        why: "Accurate citation of an actual court order or agreement, even when cited firmly, repeatedly, or over a minor point. The conduct here keeps the target in a state of continuous assessment and uncertainty.",
        example: "You cannot attend our child's football games because the orders clearly state you cannot attend parent-teacher conferences, and this is the same thing.",
        citation: "Choudhury, Martland & Luzon 2025; Crossman & Hardesty 2018; Stark 2007.",
      }),
    ],
  },
  {
    id: "ECO",
    slug: "eco",
    number: 5,
    name: "Economic control and exploitation",
    blurb:
      "Restrict, exploit, or sabotage the target's access to money, credit, employment, education, and other material resources so that exit becomes financially dangerous or impossible. A central mechanism is the creation and concealment of debt.",
    literature: "Hess & Del Rosario 2018; Stark 2007; Adams, Littwin & Javorka 2020; Littwin 2012; Postmus et al. 2012.",
    subcodes: [
      sc("ECO", 1, "Controlling access to money and financial information", {
        definition: "Restricting the target's ability to obtain, use, or understand joint resources and financial information.",
        how: "Withholding access to bank accounts, cash, or cards. Requiring the target to ask for money or account for every expenditure. Hiding statements, passwords, or financial information. Monitoring or dictating all spending.",
        function: "Eliminate independent access to resources and force dependence on the abuser for ordinary needs.",
        harm: "The inability to meet basic needs without the abuser's permission and the loss of knowledge required for independent financial decision-making.",
        why: "Ordinary joint budgeting or shared financial planning conducted without coercion or concealment. The conduct here eliminates independent access to resources and force dependence on the abuser for ordinary needs.",
        example: "I'm going to control the finances. You can have a budget for groceries, but anything else, just tell me and I'll handle it.",
        citation: "Hess & Del Rosario 2018; Pence & Paymar 1993; Stark 2007.",
      }),
      sc("ECO", 2, "Economic exploitation, unauthorized use of joint resources, and coerced debt", {
        definition: "Taking, spending, or generating financial obligations in ways that deplete the target's resources or create liability the target did not knowingly or freely authorize.",
        how: "Taking the target's paycheck, savings, or benefits. Using joint bank accounts, savings, or other shared resources to pay for inappropriate and unauthorized expenses (personal spending, gambling, affairs, mistresses, business losses, or other non-agreed uses). Withdrawing large sums of cash that creates economic hardship or severely restricts the target. Opening joint credit cards, store accounts, or other joint lines of credit with consent and then using that credit excessively without the target's prior knowledge or authorization.",
        function: "Transfer economic harm onto the target while preserving the abuser's control or benefit.",
        harm: "Depleted assets, damaged credit, sudden collection actions, and long-term legal and financial entanglement.",
        why: "Ordinary shared expenses or agreed joint obligations that both parties understand and accept. The conduct here transfers economic harm onto the target while preserving the abuser's control or benefit.",
        example: "I used the joint account for a few things I needed. You don't need to worry about it.",
        citation: "Adams, Littwin & Javorka 2020; Hess & Del Rosario 2018; Littwin 2012; Stark 2007.",
      }),
      sc("ECO", 3, "Employment and education sabotage", {
        definition: "Interfering with the target's ability to obtain, maintain, or benefit from work or education.",
        how: "Preventing the target from working or studying. Harassing the target at work or school. Controlling transport or childcare so employment becomes impossible. Causing job loss through repeated interference. Undermining educational progress.",
        function: "Block independent income and credentials that could support exit or autonomy.",
        harm: "Lost earnings, interrupted education or training, damaged professional reputation, and increased dependence.",
        why: "Ordinary discussion of work or school schedules without interference or punishment. The conduct here blocks independent income and credentials that could support exit or autonomy.",
        example: "You only went back to college so you can meet more men. You don't need more money. I provide enough.",
        citation: "Hess & Del Rosario 2018; Pence & Paymar 1993; Stark 2007.",
      }),
      sc("ECO", 4, "Coercing debt, forcing asset surrender, and destroying resources", {
        definition: "Pressuring or forcing the target to sign documents, take on new debt, or surrender assets, and the direct theft or destruction of the target's resources.",
        how: "Coercing the target to sign loan papers, guarantees, refinancing documents, or other financial instruments. Forcing the target to take on new debt. Requiring the surrender of assets, property titles, or financial rights. Stealing money, property, or other resources. Destroying the target's property or financial resources.",
        function: "Create formal legal liability in the target's name or to strip the target of existing assets.",
        harm: "Legal responsibility for obligations the target did not freely accept, loss of property, and reduced capacity to leave or recover.",
        why: "Ordinary negotiation of shared assets or debts conducted without pressure or threat is not this conduct. The conduct here creates formal legal liability in the target's name or strips the target of existing assets.",
        example: "Sign the loan papers today. I need it to start a new business. Don't make this difficult.",
        citation: "Adams, Littwin & Javorka 2020; Adams et al. 2008; Postmus et al. 2012; Hess & Del Rosario 2018; Littwin 2012; Stark 2007.",
      }),
    ],
  },
  {
    id: "THR",
    slug: "thr",
    number: 6,
    name: "Threats and intimidation",
    blurb:
      "Explicit or implied threats of harm to the target, children, family, pets, or the abuser's own life. Threats to kill are among the strongest predictors of lethality-type charges. Controlling behavior is present in the large majority of intimate partner homicides examined in Australian death reviews, including many cases with little prior physical violence.",
    literature: "Stark 2007; Hovey, Rye, Chambers & Scott 2026; Monckton Smith 2020; Boxall et al. 2022.",
    subcodes: [
      sc("THR", 1, "Threats to harm or kill the target", {
        definition: "Explicit or implied statements that the abuser will physically harm or kill the target.",
        how: "Direct threats to kill or harm, statements that the target will \"leave in a body bag,\" threats of serious injury, and conditional threats tied to the target's behavior.",
        function: "Induce fear and compel compliance by making the cost of resistance appear catastrophic.",
        harm: "The creation of a climate of terror that restricts the target's agency and elevates the risk of serious or lethal violence.",
        why: "Ordinary expressions of anger during an argument that lack threats of harm. The conduct here induces fear and compel compliance by making the cost of resistance appear catastrophic.",
        example: "If you leave, I'll make sure you don't walk away from this.",
        citation: "Hovey, Rye, Chambers & Scott 2026; Stark 2007.",
      }),
      sc("THR", 2, "Threats involving children, family, pets, or others", {
        definition: "Threats to harm children, other family members, pets, or third parties as a means of controlling the target.",
        how: "Threats to take, harm, or kill children. Threats against parents, siblings, or friends. Threats to harm or kill pets. Threats to make false reports that would harm others.",
        function: "Expand the field of fear beyond the target's own body and leverage the target's protective attachments.",
        harm: "The forced prioritization of others' safety over the target's own autonomy and the intensification of entrapment.",
        why: "Ordinary expressions of concern about children's welfare that lack a coercive or punitive function. The conduct here expands the field of fear beyond the target's own body and leverage the target's protective attachments.",
        example: "If you keep pushing this, the kids will pay for it.",
        citation: "Hovey, Rye, Chambers & Scott 2026; Stark 2007.",
      }),
      sc("THR", 3, "Threats of self-harm or suicide used as control", {
        definition: "Statements that the abuser will harm or kill himself or herself if the target leaves, resists, or fails to comply.",
        how: "Threats of suicide tied to the target's behavior, statements that the target will be responsible if the abuser dies, and related emotional blackmail framed as despair.",
        function: "Place responsibility for the abuser's survival on the target and induce guilt or fear that prevents exit.",
        harm: "The conversion of the target's autonomy into a perceived life-or-death decision for someone else.",
        why: "Genuine expressions of distress that are not used to control the target's choices. The conduct here places responsibility for the abuser's survival on the target and induce guilt or fear that prevents exit.",
        example: "If you walk out that door, I won't be alive when you get back. It will be on you.",
        citation: "Boxall et al. 2022; Monckton Smith 2020; Stark 2007.",
      }),
      sc("THR", 4, "Intimidation through displays of force, property destruction, or implied presence", {
        definition: "Non-verbal or indirect actions that communicate the capacity and willingness to cause harm without an explicit verbal threat.",
        how: "Destruction of property, punching walls or doors, displaying weapons, looming physical presence.",
        function: "Maintain fear through demonstration rather than statement.",
        harm: "The collapse of any sense of safe space and the continuous calculation of risk.",
        why: "Accidental property damage or coincidental encounters that context clearly frames as non-intimidating. The conduct here maintains fear through demonstration rather than statement.",
        example: "Would be a shame if this gun went off by accident,\" or menacingly, \"Oops, looks like I broke all your makeup.",
        citation: "Hovey, Rye, Chambers & Scott 2026; Stark 2007.",
      }),
      sc("THR", 5, "Veiled, conditional, and coded threats", {
        definition: "Ambiguous, conditional, or coded statements whose threatening meaning is intelligible primarily through the relationship's shared history.",
        how: "Conditional phrasing, ominous brevity, references to prior incidents or private knowledge, and statements, or digitally delivered equivalents that rely on shared context. Digital forms (text, messaging apps, social media) are included when the coded meaning is clear from relational history.",
        function: "Communicate menace while preserving deniability to outsiders.",
        harm: "The induction of fear combined with reduced recognizability to third parties: the target experiences the full force of the threat while third parties may dismiss it as vague or non-threatening, which isolates the target and undermines help-seeking.",
        why: "Ordinary ambiguous statements that lack a threatening function within the relationship history. The conduct here communicates menace while preserving deniability to outsiders.",
        example: "Remember the lake house? It would be a shame if the same happened to you. \" Flag with ? where history is unavailable and resolve in consensus if possible.",
        citation: "Flynn et al. 2024; Stark 2007.",
      }),
      sc("THR", 6, "Non-verbal weapon intimidation", {
        definition: "Displaying, handling, cleaning, loading, or otherwise referencing a firearm or other weapon in the target's presence or in a message as implicit intimidation, without an accompanying verbal threat.",
        how: "Cleaning, disassembling, or reassembling a gun in the target's presence after conflict. Leaving a firearm visibly placed. Waving or handling a weapon during or after an argument without an explicit verbal threat. Posting or sending images of weapons timed to conflict or separation. Other non-verbal demonstrations of lethal capacity.",
        function: "Demonstrate capacity for serious harm while maintaining plausible deniability.",
        harm: "The elevation of fear, the continuous awareness that lethal means are available, and the restriction of the target's agency through a climate of terror that third parties may fail to recognize.",
        why: "Routine, contextually ordinary weapon handling unconnected to any conflict (for example, preparing for a scheduled hunting trip with no temporal or relational link to a dispute). The conduct here demonstrates capacity for serious harm while maintaining plausible deniability.",
        example: "Just cleaned the 9mm. Made me think of you, actually.",
        citation: "Sullivan et al. 2025; Sorenson & Wiebe 2004.",
      }),
    ],
  },
  {
    id: "GAS",
    slug: "gas",
    number: 7,
    name: "Gaslighting and reality manipulation",
    blurb:
      "The sustained effort to make the target distrust their own perceptions, memory, and judgment so that the abuser's version of events becomes the dominant reality. The abuser achieves this by denying or rewriting shared history, mobilizing stereotypes and structural vulnerabilities, and reversing blame when confronted.",
    literature: "Adair 2025; Tager-Shafrir et al. 2024; Sweet 2019, 2021; Stark 2007.",
    subcodes: [
      sc("GAS", 1, "Reality distortion, denial and rewriting of events", {
        definition: "Denying that events occurred and insisting on counterfactual versions of shared history.",
        how: "Statements such as \"That never happened,\" \"You're remembering it wrong,\" or systematic rewriting of prior conversations, agreements, or incidents. Digital forms (texts, emails, parenting apps) that assert a counterfactual record are included.",
        function: "Make the target distrust their own memory and perception so that the abuser's version becomes the only reliable account.",
        harm: "The erosion of epistemic confidence: the target begins to doubt what they know and becomes more dependent on the abuser's reality.",
        why: "Good-faith disagreement about the interpretation of an ambiguous event. The conduct here makes the target distrust their own memory and perception so that the abuser's version becomes the only reliable account.",
        example: "I never said that. You're inventing things again.",
        citation: "Adair 2025; Tager-Shafrir et al. 2024; Sweet 2019.",
      }),
      sc("GAS", 2, "Mobilizing stereotypes and structural vulnerability", {
        definition: "Leveraging the target's gender, immigration status, psychiatric or substance-use history, sexuality, race, criminal record, or other structural vulnerabilities to undermine credibility with the target and with third parties.",
        how: "Appeals to stereotypes about hysteria, instability, foreignness, or criminality. Statements that no one will believe the target because of a protected or stigmatized characteristic. Claims that institutional actors will side with the abuser on the basis of those characteristics.",
        function: "Recruit existing inequalities and institutional biases so that the target's reports are pre-emptively discounted.",
        harm: "Isolation from potential sources of support and the conversion of structural vulnerability into a silencing mechanism.",
        why: "Accurate, non-weaponized discussion of relevant history offered without the purpose of discrediting. The conduct here recruits existing inequalities and institutional biases so that the target's reports are pre-emptively discounted.",
        example: "Go ahead, call the cops. Who do you think they'll believe, me, or the one with the hospital record?",
        citation: "Adair 2025; Sweet 2019.",
      }),
      sc("GAS", 3, "Blame reversal (DARVO)", {
        definition: "When confronted, the abuser Denies the behavior, Attacks the target's credibility or character, and Reverses Target and Offender blame so that the abuser becomes the injured party and the target is labeled the aggressor.",
        how: "Confrontation met with counter-accusation, offense-taking, and claims that the target is the true aggressor.",
        function: "Protect the abuser's image, preserve control, and silence disclosure.",
        harm: "Increased target self-blame, reduced survivor credibility in the eyes of observers, and heightened distress after attempts to set boundaries or seek help.",
        why: "Genuine expressions of feeling hurt that do not invert responsibility for the abusive pattern. The conduct here protects the abuser's image, preserves control, and silences disclosure.",
        example: "After everything I put up with from you, YOU'RE accusing ME? I should be the one recording these conversations,\" or \"You always play the victim; you have a victim mentality.",
        citation: "Freyd 1997; Sweet 2019.",
      }),
    ],
  },
  {
    id: "SEXC",
    slug: "sexc",
    number: 8,
    name: "Sexual coercion and reproductive control",
    blurb:
      "Sexual coercion within controlling relationships operates through entitlement, pressure, punishment, deception, triangulation, and recruitment of third parties rather than only through physical force. Reproductive coercion is a distinct tactic that interferes with autonomous decision-making about contraception, pregnancy, and pregnancy outcomes.",
    literature: "Bagwell-Gray 2021; Matolcsi 2020; Miller et al. 2010; Pence & Paymar 1993; Stark 2007; Tarzia & Hegarty 2023.",
    subcodes: [
      sc("SEXC", 1, "Pressure, guilt, and entitlement claims regarding sex", {
        definition: "Framing sex as owed, obligatory, or a test of love or loyalty; persistent pressure after refusal; guilt campaigns that convert the target's bodily autonomy into a relational debt.",
        how: "Statements that sex constitutes a wifely or partner duty. Repeated requests after clear refusal. Linking affection, financial support, or relationship stability to sexual compliance. Pressure to engage in specific acts the target has declined.",
        function: "Erodes the target's right to refuse by making non-compliance feel like moral failure, selfishness, or relationship sabotage.",
        harm: "Reaches beyond the sexual act into the target's sense of self-worth, bodily integrity, and spiritual ownership of her own person.",
        why: "Mutual negotiation of sexual preferences conducted without threat, guilt, pressure, or entitlement framing; one-time expressions of desire that respect a refusal. The conduct here erodes the target's right to refuse by making non-compliance feel like moral failure, selfishness, or relationship sabotage.",
        example: "A wife who loved her husband wouldn't keep score like this. After everything I do for you, this is the least you can give.",
        citation: "Bagwell-Gray 2021; Stark 2007.",
      }),
      sc("SEXC", 2, "Punishment or retaliation for refusal", {
        definition: "Withdrawal of affection, rage, accusations of infidelity or frigidity, sulking, or other sanctions explicitly or clearly linked to the target's refusal of sex.",
        how: "Cold silence, rage, or accusations that follow refusal. Threats to seek sex elsewhere framed as the target's fault. Linking sexual non-compliance to broader relationship punishment.",
        function: "Trains the target that bodily refusal carries relational and emotional cost, thereby conditioning future compliance.",
        harm: "Converts ordinary refusal into a punishable offense and installs anticipatory dread around sexual decision-making.",
        why: "Ordinary disappointment expressed without sanction or character attack; genuine mutual renegotiation of sexual frequency. The conduct here trains the target that bodily refusal carries relational and emotional cost, thereby conditioning future compliance.",
        example: "Since apparently I disgust you, don't expect me at your mother's thing on Sunday.",
        citation: "Stark 2007.",
      }),
      sc("SEXC", 3, "Reproductive coercion", {
        definition: "Interference with contraception, pressure regarding pregnancy continuation or termination, monitoring of cycles, or other tactics that strip the target of individual reproductive decision-making. Reproductive coercion operates bidirectionally. Coerced pregnancy tactics include contraception sabotage and pressure to conceive. Birth-giving prevention tactics include pressure or force to terminate a wanted pregnancy.",
        how: "Sabotaging or hiding contraception. Refusing to use condoms. Pressure to become pregnant. Pressure or force to terminate a pregnancy. Monitoring menstrual cycles as a form of surveillance and control.",
        function: "Controls the target's body at the level of fertility itself, binding her future through unknowingly forced pregnancy or forced termination.",
        harm: "Operates both immediately and across the long term (loss of life trajectory, chronic gynecological sequelae, and the spiritual injury of having one's generative capacity commandeered).",
        why: "Mutual, informed decisions about family planning reached without pressure or deception. The conduct here controls the target's body at the level of fertility itself, binding her future through unknowingly forced pregnancy or forced termination.",
        example: "You don't need to refill those. We're having another one, that's final. \" Or \"Have an abortion or I am leaving you.",
        citation: "Miller et al. 2010; Moulton et al. 2021; Grace & Anderson 2018; Stark 2007; Tarzia & Hegarty 2021.",
      }),
      sc("SEXC", 4, "Deception for sexual access", {
        definition: "Obtaining sexual access through material lies or concealment of facts that, if known, would have led the target to withhold consent. The deception functions as a form of coercive control by manufacturing a false basis for intimacy, thereby violating the target's sexual autonomy, dignity, and right to informed choice.",
        how: "Lies, including withholding truth, about identity, monogamy, marital or relationship status, intentions, health status (including STI status), or other material facts that induce sexual consent. Concealment of parallel relationships or intentions that would have altered the target's decision.",
        function: "Violate the target's sexual autonomy, dignity, and right to informed consent.",
        harm: "Centers on the discovery that the body was given under false pretenses: a profound spiritual and emotional betrayal that legal and clinical literature links to lasting trauma, identity fracture, and somatic sequelae.",
        why: "Ordinary self-presentation or privacy-protective omissions that do not go to the core of the sexual agreement, and good-faith misunderstandings later corrected, are not this conduct. The conduct here violates the target's sexual autonomy, dignity, and right to informed consent.",
        example: "A man represents himself as single, available, and committed to a shared future in order to secure sexual and emotional access, while simultaneously maintaining other partners and harboring no intention of the promised relationship.",
        citation: "Chiesa 2017; Stark 2007.",
      }),
      sc("SEXC", 5, "Triangulation as sexual and relational control", {
        definition: "The deliberate introduction or weaponization of a third party (real or implied) to provoke jealousy, competition, insecurity, or compliance in the sexual and relational sphere.",
        how: "Public and/or private flirtation and attention-seeking, messaging, social media spectacles, and/or emotional intimacy with others. Using a third party's attention to punish or devalue the target. Mocking or pathologizing the third party while simultaneously encouraging idealization. Creating situations in which the target must compete for the abuser's sexual or emotional priority. Creating public humiliation for the target(s). The third-party and the target are both targets of destabilization.",
        function: "Destabilizes the target's sense of unique value, keeps the target in a state of anxious monitoring, and asserts the abuser's sexual and emotional dominance.",
        harm: "Systematically erodes secure attachment and converts intimacy into a competitive arena in which the target must continually prove worth.",
        why: "Transparent, mutually agreed non-monogamy conducted with ongoing consent and equal agency; ordinary social interactions without the competitive or punitive frame. The conduct here destabilizes the target's sense of unique value, keeps the target in a state of anxious monitoring, and asserts the abuser's sexual and emotional dominance.",
        example: "The abuser maintains highly attentive public exchanges with another woman, posts about her gifts and admiration, then labels her \"crazy\" when confronted, while accusing the primary partner of \"trespassing boundaries\" and \"disrespecting his space\" for noticing the pattern. The primary partner is left questioning her own perceptions while the triangulation continues.",
        citation: "Bagwell-Gray 2021; Bonomi & Martin 2021; Stark 2007; Sweet 2019.",
      }),
      sc("SEXC", 6, "Coercion into multi-partner or third-party sexual activity", {
        definition: "Pressure, guilt, threats, distorted reasoning, conditional affection, or other conditions used to compel the target to engage in sexual activity with third parties of the same or opposite sex, to participate in swinging or group sex, to allow the abuser to watch, or to permit recording, to perform sexually online with or without compensation when the target does not freely desire these acts. The coercion is typically framed as necessary to please him, save the relationship, help make ends meet, appear sexually adventurous, or maintain financial or relational security.",
        how: "Pressure for threesomes, swinging, partner swapping, allowing the abuser to watch, or permitting recording. Linking compliance to relationship survival, financial support, or cessation of other abuse. Framing refusal as prudery, disloyalty, or proof the relationship is failing.",
        function: "Extend ownership over the target's body to its furthest point. The target's sexuality becomes a resource the abuser can allocate, display, or consume.",
        harm: "Operates on multiple levels (emotional violation, spiritual desecration of the body, physical risk of STI, injury, or unwanted pregnancy) and produces long-term somatic and psychological injury, including chronic pain, gynecological disease, and functional somatic syndromes documented in medical and anthropological literature.",
        why: "Freely desired, unpressured sexual exploration between consenting adults is not this conduct. The conduct here extends ownership over the target's body and allocates the target's sexuality as a resource.",
        example: "If you loved me you'd do this for us. Other women do it for their men. It'll strengthen our relationship. If you won't, maybe we're not as solid as I thought.",
        citation: "Matolcsi 2020; Stark 2007.",
      }),
    ],
  },
  {
    id: "CHI",
    slug: "chi",
    number: 9,
    name: "Children as instruments of control",
    blurb:
      "Children are drawn into the control regime as monitors, messengers, hostages, and grounds for litigation. They are direct targets and co-survivors, not mere witnesses. An abuser uses children to maintain domination after separation, to attack the target's most valued relationship, and to keep the target under continuous emotional, logistical, and legal pressure.",
    literature: "Callaghan et al. 2018; Katz 2016, 2022; Spearman et al. 2025; Stark 2007; Sullivan et al. 2024.",
    subcodes: [
      sc("CHI", 1, "Undermining the target's parenting", {
        definition: "Countermanding the target's decisions, denigrating the target to the children, and positioning the target as the \"bad,\" inadequate, or uncaring parent, either directly to the children or to third-party providers, e.g., therapists, household help, family, school personnel, and others involved in the child's care.",
        how: "Overriding rules the target has set. Encouraging, implicitly or explicitly, the child to harm the other parent. Speaking about the target in belittling or false terms in the children's presence. Telling children the target chose work, a new partner, or personal needs over them. Conveying harmful narratives to schools, doctors, or other providers.",
        function: "Hollow out the parent-child relationship and destroy the target's parental authority.",
        harm: "For the target: loss of authority, retraumatization, and erosion of the parenting bond. For the children: confusion, loyalty conflict, and reduced security with the protective parent.",
        why: "Ordinary differences in parenting style expressed without denigration or triangulation. The conduct here hollows out the parent-child relationship and destroy the target's parental authority.",
        example: "I told them the truth, that mommy chose her job over them,\" or \"Oh Georgey, you hit your mom again? You know better. Want some ice cream?",
        citation: "Katz 2016, 2022; Stark 2007.",
      }),
      sc("CHI", 2, "Using children as monitors, messengers, or leverage", {
        definition: "Recruiting or relying on children to report on the target, involving children in adult process or logistical decisions, triangulating a child into parental conflict, or conditioning access and compliance on children's reported statements.",
        how: "Pressuring children to report who visits the target's home, what the target does, or what the target says. Using children to carry adult messages or threats. Pitting a child against the other parent. Conducting control through handover, access, or service logistics.",
        function: "Extend surveillance and emotional control through the child.",
        harm: "For the target: continuous monitoring and leverage. For the children: placement in an adult role, divided loyalty, fear, and the experience of being treated as an instrument rather than a person.",
        why: "Age-appropriate, non-coercive sharing of ordinary information between households. The conduct here extends surveillance and emotional control through the child.",
        example: "Emma told me someone was at your house Tuesday. I need to know who it is, as this is obviously a critical issue involving her welfare.",
        citation: "Callaghan et al. 2018; Clements et al. 2022; Spearman et al. 2023; Sullivan et al. 2024; Douglas 2018; Katz 2016, 2022.",
      }),
      sc("CHI", 3, "Custody and child-welfare threats as ongoing control", {
        definition: "Invoking family court, custody modification, or child-protective reporting as a standing threat to enforce compliance or punish resistance.",
        how: "Threats to seek custody modification, to report the target to child-protective services, or to use the children's statements against the target in court.",
        function: "Keep the target under continuous legal and emotional threat.",
        harm: "For the target: chronic fear of losing the children and forced engagement with the abuser through litigation. For the children: instability, exposure to ongoing conflict, and the risk of being placed in unsafe arrangements.",
        why: "Legitimate, one-time concerns about a child's safety raised in good faith without a pattern of control. The conduct here keeps the target under continuous legal and emotional threat.",
        example: "My lawyer says judges love mothers who miss exchanges. Keep it up.",
        citation: "Sullivan et al. 2024; Douglas 2018; Katz 2022; Stark 2007.",
      }),
      sc("CHI", 4, "Obstructing joint decision-making", {
        definition: "Withholding consent, significantly delaying, or refusing to finalize a decision the parties are required to make jointly (medical treatment, mental health care, school enrollment/placement, extracurricular commitments) by demanding open-ended additional information, further discussion, or repeated re-litigation of an already-settled point, such that the decision never actually gets made.",
        how: "Withholding consent, significantly delaying, or refusing to finalize a jointly required decision on medical treatment, mental-health care, school enrollment or placement, or extracurricular commitments. Demanding open-ended additional information, further discussion, or repeated re-litigation of an already-settled point, so the decision never actually gets made.",
        function: "Retain veto power over the child's life and frustrate the target's capacity to meet the child's needs.",
        harm: "Unmet health and developmental needs for the children. The target cannot protect or provide for the child without the abuser's permission.",
        why: "A single, time-bound request for clarification or a second opinion before consenting is ordinary co-parenting. The conduct here retains veto power over the child's life and frustrates the target's capacity to meet the child's needs.",
        example: "I hear you on the specialist's recommendation, but before we move forward I really think we need to talk it through more. Can you send me her records again? Maybe a third opinion?",
        citation: "Katz 2016; Spearman et al. 2025; Stark 2007.",
      }),
      sc("CHI", 5, "Gatekeeping access to the child's providers, records, and information", {
        definition: "Controlling or restricting the other parent's independent access to the child's medical, mental-health, educational, or extracurricular providers, records, or related information channels, such that the gatekeeping parent becomes the obligatory intermediary. This may occur through instructions to third parties, unilateral rules imposed on the co-parent, or both.",
        how: "Instructing providers or institutions that the other parent may not contact them, or that all communication must be routed through the abuser. Imposing a rule that the other parent is prohibited from contacting providers or must obtain permission or route all inquiries through the abuser, when the governing court order does not expressly authorize exclusive communication rights. Withholding, delaying, or selectively controlling access to portals, records, appointment information, or provider contact details. Treating final decision-making authority as automatically conferring exclusive contact or information-control rights when the order does not so state.",
        function: "Monopolize information and institutional relationships.",
        harm: "For the children: delayed or incomplete care and the loss of two-parent informational support. For the target: exclusion from knowledge required to parent effectively.",
        why: "Accurate implementation of a court order that expressly grants exclusive communication rights, and ordinary logistical coordination through a designated channel, is not this conduct. The conduct here monopolizes information and institutional relationships.",
        example: "Going forward, all communication with the children's teachers need to come through me. I've already let the admin office know that I am the point of contact, not you.",
        citation: "Elizabeth 2017; Miller & Smolter 2011; Spearman et al. 2023, 2025; Stark 2007.",
      }),
    ],
  },
  {
    id: "INST",
    slug: "inst",
    number: 10,
    name: "Institutional and legal systems abuse",
    blurb:
      "The deliberate weaponization of legal and institutional processes to continue control after separation. The abuser files frivolous or repetitive actions, makes false or exaggerated reports, and manipulates professionals so that courts, police, and evaluators become instruments of ongoing coercion.",
    literature: "Miller & Smolter 2011; Douglas 2018; Gutowski & Goodman 2023; Sweet 2019, 2021.",
    subcodes: [
      sc("INST", 1, "Threats or references to deploying authorities against the target", {
        definition: "Invoking police, child-protective services, immigration authorities, professional licensing boards, or other institutional actors as weapons to induce fear, compel compliance, or punish resistance.",
        how: "Statements that the abuser will or can call police, CPS, immigration, or licensing bodies. References to prior or potential reports used as leverage. Conditional threats tying institutional action to the target's behavior.",
        function: "Convert the threat of institutional intervention into a standing instrument of control.",
        harm: "The continuous calculation of risk that the target's own help-seeking systems will be turned against them, producing hypervigilance, self-silencing, and deepened isolation. The abuser restricts the target's autonomy and space for action by making the possibility of official intervention contingent on the target's compliance. The threat itself, independent of any actual report, extends domination into the institutional domain and deters the target from seeking safety or asserting boundaries.",
        why: "Genuine, non-coercive expressions of concern about a child's safety or an actual emergency that do not function as leverage. The conduct here converts the threat of institutional intervention into a standing instrument of control.",
        example: "One call to CPS about your drinking and everything changes.",
        citation: "Douglas 2018; Sweet 2019.",
      }),
      sc("INST", 2, "Vexatious or strategic litigation references", {
        definition: "Using filings, motions, subpoenas, the cost or duration of litigation itself, or an accurate court order or process as leverage or a threat rather than as a genuine invocation of process.",
        how: "Threats to escalate to counsel, the court, or a third-party evaluator as a consequence for the target's conduct. Accurate citation of an actual order used to pressure or intimidate rather than to request compliance with its actual terms. References to the volume, cost, or duration of proceedings as punishment.",
        function: "Force ongoing contact, financially and psychologically exhaust the target, and control the pace and terms of separation through the legal system.",
        harm: "Resource depletion, chronic stress, forced engagement, and the conversion of the legal process into an additional site of domination. The abuser weaponizes the formal requirements and costs of legal systems to restrict the target's autonomy after physical separation. Every attempt by the target to establish safety or finality becomes an opportunity for further contact, cost, and pressure. The liberty deprivation moves from the private relationship into the courtroom itself.",
        why: "A single, measured reference to what an order requires, offered to explain a position or request compliance, is not this conduct. The conduct here forces ongoing contact, financially and psychologically exhausts the target, and controls the pace and terms of separation through the legal system.",
        example: "Keep this up and see how it looks to the judge when I bring six months of messages like this one.",
        citation: "Douglas 2018; Gutowski & Goodman 2023; Miller & Smolter 2011.",
      }),
      sc("INST", 3, "Manipulating third-party professionals and audiences", {
        definition: "Performing for, recruiting, or deceiving evaluators, therapists, mediators, teachers, custody professionals, or mutual contacts in order to isolate or discredit the target.",
        how: "Statements that an evaluator, therapist, or other professional \"loved\" the abuser or saw the target exactly as the abuser predicted. Coaching or rehearsing presentations to professionals. Selective disclosure of the target's history to third parties to discredit. Recruitment of mutual contacts into the abuser's narrative.",
        function: "Enlist institutional and social audiences into the control structure so that the abuser appears credible and the target appears unstable, alienating, or non-credible.",
        harm: "The loss of external validation, the recruitment of potential sources of support into the abuser's narrative, and intensified isolation. The abuser extends domination beyond the dyad into the professional and social networks the target must rely upon for recognition and safety. By constructing the target as \"the problem\" to the very people and systems positioned to help, the abuser converts help-seeking into further evidence of unreliability and seals the target's isolation.",
        why: "Ordinary, non-manipulative communication with professionals or mutual contacts that does not function to isolate or discredit. The conduct here enlists institutional and social audiences into the control structure so that the abuser appears credible and the target appears unstable, alienating, or non-credible.",
        example: "The evaluator loved me, by the way. You came across exactly how I said you would.",
        citation: "Douglas 2018; Sweet 2019, 2021; Watson & Ancis 2013.",
      }),
      sc("INST", 4, "Immigration document withholding and application interference", {
        definition: "Withholding, confiscating, or destroying the target's passport, visa, green card, or other immigration paperwork, or obstructing, withdrawing, or threatening to withdraw support for a pending immigration petition or application.",
        how: "Statements or acts of withholding, hiding, or destroying immigration documents. Refusing to file or withdrawing a spousal or other petition. Threats to contact immigration authorities. Using the target's dependent status as leverage.",
        function: "Trap the target through legal status dependence and make departure or independent action appear impossible or catastrophically risky.",
        harm: "Profound restriction of mobility, heightened fear of detention or removal, and the conversion of immigration status into a primary instrument of control. The abuser exploits structural vulnerability created by immigration law to eliminate the target's exit options and to enforce compliance. The threat or act of interfering with documents or petitions restricts the target's physical and legal autonomy in a way that is difficult to escape without institutional intervention that the abuser may also control or influence.",
        why: "Neutral discussion of the location of jointly held documents without a control or leverage frame. The conduct here traps the target through legal status dependence and make departure or independent action appear impossible or catastrophically risky.",
        example: "I already called the lawyer to pull your petition. Good luck explaining that to ICE alone.",
        citation: "Erez, Adelman & Gregory 2009; Salcido & Adelman 2004.",
      }),
      sc("INST", 5, "Constructing the target as non-credible", {
        definition: "The abuser uses institutional engagement (courts, police, child protection, immigration, mental-health systems, evaluators, and other professionals) to construct the target as unstable, irrational, vindictive, or otherwise non-credible.",
        how: "Framing the target to police, courts, child-protection workers, therapists, custody evaluators, or immigration officials as crazy, unstable, paranoid, alienating, or non-credible. Selective disclosure of the target's trauma history or mental-health records to discredit. Performing charm or rationality to professionals while the target appears distressed. Using the target's repeated help-seeking itself as proof that the target is the problem.",
        function: "Destroy the target's institutional standing so that systems designed to provide protection instead validate the abuser, isolate the target, and convert help-seeking into further evidence of unreliability.",
        harm: "The loss of credibility with the very institutions the target must rely upon for safety and recognition, intensified isolation, eroded self-trust, and deepened entrapment. Abusers deliberately exploit the target's institutional vulnerabilities, including fear of police, courts, immigration authorities, or mental-health systems, and the lower credibility those institutions often assign to women, particularly women of color, undocumented women, or women with trauma histories and low self-esteem. The abuser intercedes with professionals, reframes the target's accurate reports as delusion or instability, performs as the rational or concerned party, and uses the target's prior help-seeking or trauma responses against them. Institutions that are supposed to help thereby become features of the abuse itself: the target's lack of credibility inside those systems is both produced by the abuser and reinforced by institutional biases. In the aftermath of abuse, the same dynamic continues as the target is required to perform legible \"survivorhood\" while the abuser continues to attack credibility through legal and professional channels.",
        why: "Accurate, non-weaponized sharing of concern for the target's well-being with appropriate professionals when the primary aim is support rather than control or discredit. The conduct here destroys the target's institutional standing so that systems designed to provide protection instead validate the abuser, isolate the target, and convert help-seeking into further evidence of unreliability.",
        example: "She lies about everything. She has no credibility. She's unstable. She was diagnosed with mental illness. Anything she tells you about me comes from that place.",
        citation: "Sweet 2019, 2021.",
      }),
    ],
  },
  {
    id: "REC",
    slug: "rec",
    number: 11,
    name: "Intermittent reward, reconciliation, and conditional affection",
    blurb:
      "Apology, promise, romance, and generosity following abuse are part of the regime, not a departure from it. These tactics condition attachment through intermittent reinforcement, rewire the target's sense of safety, and make later isolation, surveillance, degradation, and threats more effective.",
    literature: "Dutton & Painter 1993; Walker 1979; Stark 2007; Singer 1995.",
    subcodes: [
      sc("REC", 1, "Apology and promise-to-change messages following coded incidents", {
        definition: "Expressions of remorse, regret, or promises of permanent change that function to reset the target's resistance, restore access, and re-secure the attachment bond after controlling behavior has been applied. These messages do not constitute genuine repair. They operate as intermittent reinforcement that trains the target to remain invested despite prior harm, thereby deepening traumatic bonding and making future control tactics more effective.",
        how: "Statements of remorse or reform that appear within the same thread or within a short temporal window after other controlling messages. Promises that the harmful behavior will never happen again, or that the abuser has fundamentally changed. Declarations that re-idealize the target immediately after devaluation or threat.",
        function: "Reset the target's resistance, restore access, and re-secure the attachment bond after controlling behavior. Intermittent reinforcement that trains the target to remain invested despite prior harm.",
        harm: "Deepened traumatic bonding. The target remains invested despite prior harm, and later control tactics land with greater force.",
        why: "Genuine, sustained change in conduct, with no return to control tactics, is not this behavior. The conduct here resets resistance and re-secures the attachment bond after control has already been applied.",
        example: "I hate who I was last night. Never again. You're my whole world,\" followed by repetition of the same behaviors.",
        citation: "Dutton & Painter 1993; Stark 2007; Walker 1979.",
      }),
      sc("REC", 2, "Weaponized affection and love-bombing", {
        definition: "Intense, often premature or exaggerated expressions of love, unique connection, destiny, value, or belonging that function to create a false sense of safety, lower the target's defenses, condition rapid attachment, and establish intermittent reinforcement.",
        how: "Early or rapidly escalating declarations of love, soulmate status, or permanent bond that arrive before corresponding knowledge or trust exists. Hyperbolic or totalizing claims of the target's unique value used as a lure. Demonstrative generosity, gifts, or grand gestures timed to disarm resistance or reverse separation moves. Sequences in which high-affection messages are followed by silence, coldness, incongruent behavior, or coded control.",
        function: "Create a false sense of safety, lower the target's defenses, condition rapid attachment, and prepare the ground for devaluation, isolation, and later tactics.",
        harm: "Primary: the flood of affectional language and attention rewires the target's neurobiology (oxytocin and dopamine pathways) so that subsequent withdrawal produces confusion, anxiety, self-doubt, and dependence. What appears as love is a control mechanism that prepares the ground for devaluation, isolation, and later tactics.",
        why: "Steady, reciprocal care that develops gradually, without later withdrawal used as leverage, is ordinary affection. The conduct here creates a false sense of safety and conditions rapid attachment so later control can land.",
        example: "Since the day I met you, our connection is even beyond ourselves. I love you and I cherish and relish all of your being. \". Followed by unexplained silence or devaluation.",
        citation: "Dutton & Painter 1993; Singer 1995; Stark 2007.",
      }),
      sc("REC", 3, "Conditional affection and probation framing", {
        definition: "Expressions of affection, forgiveness, normalcy, or restored goodwill that are explicitly or implicitly conditioned on the target's compliance, improved behavior, or acceptance of the abuser's terms. These messages function as ongoing behavioral control: the target learns that safety, warmth, and belonging are contingent rewards that can be withdrawn for noncompliance.",
        how: "Statements that link continued affection or peace to the target's \"good\" behavior. Framing of recent calm as the result of the target's obedience or improvement. Probation-like language that positions the target as on trial (\"keep this up and things can stay good\"). Affection offered only after the target has conceded a demand or abandoned resistance.",
        function: "Convert ordinary relational goods into instruments of regulation. The target learns that safety, warmth, and belonging are contingent rewards that can be withdrawn for noncompliance.",
        harm: "The conversion of ordinary relational goods into instruments of regulation, producing chronic hypervigilance, self-monitoring, and eroded autonomy.",
        why: "Unconditional care that does not attach behavioral contingencies is ordinary affection. The conduct here converts warmth and belonging into instruments of regulation.",
        example: "Things have been so good these two weeks because you've been good. Let's keep it that way.",
        citation: "Dutton & Painter 1993; Stark 2007; Walker 1979.",
      }),
    ],
  },
  {
    id: "CRIM",
    slug: "crim",
    number: 12,
    name: "Coerced criminality and forced complicity in harm to children",
    blurb:
      "Two related mechanisms that manufacture official vulnerability: forcing the target into crime, then holding the exposure as leverage; and compelling participation in or concealment of harm to children, then presenting that inability as the target's own culpability.",
    literature: "Bettinson 2022, 2024; Centre for Women's Justice 2022; Hope & Swaine Williams 2025; Katz 2016, 2022; Prison Reform Trust 2017; Warshaw et al. 2014; Douglas & Walsh 2010.",
    subcodes: [
      sc("CRIM", 1, "Coerced participation in crime", {
        definition: "Forcing, compelling, pressuring, or arranging for the target to commit a criminal offense, to take responsibility for the abuser's offense, or to remain in a position of criminal exposure that the abuser then uses as leverage.",
        how: "Forcing the target to take responsibility for the abuser's drugs, weapons, stolen goods, fraud, or other offenses so that the abuser's own risk of arrest is reduced. The target becomes the person police find with the contraband. Compelling theft, fraud, or other offending to fund the abuser's habits, lifestyle, or demands. Substance-use coercion as a pathway into criminal exposure. The abuser compels use, sabotages recovery, then uses that use, or the resulting record, as leverage with police, courts, child protection, and immigration authorities. Immigration-linked coerced crime, distinct from a bare threat to contact ICE. The abuser first creates or exploits an offense connected to status, then uses the evidence to threaten disclosure. Using the criminal justice system itself as an extension of coercive control: malicious allegations, coerced statements or passwords, and prosecution of the target while the primary abuser is not charged.",
        function: "Transfer legal risk onto the target and create a permanent instrument of control. The target cannot leave, report, or seek help without risking arrest, deportation, professional ruin, or loss of children.",
        harm: "A criminal record, immigration jeopardy, loss of employment or license, destroyed credibility in family court and with police and experts, and the continuous knowledge that the abuser can disclose the manufactured offense at any moment.",
        why: "Traditional duress law typically requires an imminent threat of death or serious injury. That standard fails to capture patterned compulsion in which compliance is the target's safest available option across weeks, months, or years. Ordinary conflict does not force a person into an offense and then leverage the evidence.",
        example: "You carried it, not me. One call and you are the one they arrest. You will never see the children again.",
        citation: "Phillips et al. 2020; Warshaw et al. 2014; Bettinson 2022, 2024; Erez, Adelman & Gregory 2009; Galoob & Sheley 2022; Hope & Swaine Williams 2025; Centre for Women's Justice 2022; Prison Reform Trust 2017; Warshaw & Tinnon 2018.",
      }),
      sc("CRIM", 2, "Forced participation in, or concealment of, harm to children", {
        definition: "The abuser compels the target to take part in, witness, enable, or conceal harm to a child (physical, sexual, emotional, or neglect), or sets conditions that prevent the target from protecting the child, then treats that inability as the target's own failure.",
        how: "Compelled silence: the target is forbidden to report, seek medical care, or disclose, under threat of further violence, loss of the children, exposure of the target's own coerced criminality, immigration consequences, or other leverage. Manufactured failure to protect: the abuser creates the conditions that make protection impossible, then presents that inability to institutions as the target's neglect.",
        function: "Eliminate the adult target's protective agency, harm the children as a means of punishing the adult, and manufacture child-protection and criminal liability that the abuser can later spend as leverage.",
        harm: "For children: direct abuse, concealment of injury, delayed care, and a parent who cannot protect them. For the adult target: moral injury, criminal or child-protection liability, loss of custody, and the knowledge that disclosing the child's harm may cost the children or the target's liberty.",
        why: "Once children and the adult target are understood as co-victims of the same campaign, the failure-to-protect frame collapses. The adult target's capacity to protect was itself a target of the campaign. Ordinary parental disagreement about discipline does not compel participation in harm to a child, compel silence about a child's injuries, or later spend that silence as official liability.",
        example: "If you take her to the hospital they will ask questions. You already have a record. Keep your mouth shut or they will take her.",
        citation: "Douglas & Walsh 2010; Humphreys & Absler 2011; Katz 2016, 2022.",
      }),
    ],
  },
  {
    id: "HAR",
    slug: "har",
    number: 13,
    name: "Harassment",
    blurb:
      "Relentless pursuit and interruption: flooding, public smear, image-based abuse, unwanted presence, proxy harassment, and other disturbance of peace. Function and density relative to need, not the tone of any one message.",
    literature: "Dragiewicz et al. 2018; Harris & Woodlock 2019; Stark 2007; Toews & Bermea 2017; Woodlock 2017; Henry et al. 2023.",
    subcodes: [
      sc("HAR", 1, "Communication flooding", {
        definition: "High-volume contact, or contact that functions to occupy the target's attention, make allegations, punish unavailability, and/or compel response, judged by function and cumulative pattern rather than the tone or stated purpose of any single message.",
        how: "Escalating strings within short windows. Sustained repetition that re-raises closed issues or continues after the target has responded, declined, or requested reduced contact. Civil, logistical, or child-framed contact whose volume or persistence outstrips any legitimate need. Contact timed to interrupt sleep, work, or recovery.",
        function: "Occupy attention, punish unavailability, and compel response.",
        harm: "Exhaustion, interrupted sleep and work, and the conversion of ordinary channels into a site of punishment for unavailability.",
        why: "Multiple messages during a genuine emergency, proportionate good-faith contact on a live time-sensitive issue, and ordinary co-parenting coordination within agreed channels are not this conduct. The conduct here occupies attention, punishes unavailability, and compels response.",
        example: "I want an answer about what is happening at your house for the children's sake.",
        citation: "Dragiewicz et al. 2018; Miller & Smolter 2011; Stark 2007; Toews & Bermea 2017; Woodlock 2017.",
      }),
      sc("HAR", 2, "Social media attack campaigns and public online humiliation", {
        definition: "Use of social media platforms or other public digital spaces to post, share, or amplify content that denigrates, exposes, or isolates the target, including smear campaigns, doxxing of private information, or coordinated public shaming that functions to damage reputation, sever support networks, and maintain presence in the target's social world.",
        how: "Public posts or comments that characterize the target as unstable, unfit, dishonest, or dangerous. Sharing private communications or personal details out of context. Tagging, mentioning, or directing mutual contacts to damaging content. Creation of accounts or groups for the purpose of ongoing public attack.",
        function: "Convert the target's online and offline community into an instrument of control and degradation.",
        harm: "The conversion of the target's online and offline community into an instrument of control and degradation.",
        why: "Private messages that do not reach a wider audience, and accurate limited statements in formal legal filings without public distribution, are not this conduct. The conduct here converts the target's online and offline community into an instrument of control and degradation.",
        example: "A post to mutual friends and family stating, \"She abandoned the children for her own agenda. Here's the proof,\" accompanied by selective screenshots.",
        citation: "Dragiewicz et al. 2018; Spearman et al. 2023; Harris & Woodlock 2019; Woodlock 2017.",
      }),
      sc("HAR", 3, "Non-consensual distribution or threat of private or intimate images", {
        definition: "Creating, sharing, threatening to share, or otherwise weaponizing private, intimate, or sexual images or recordings of the target without consent. This form of image-based abuse functions to destroy privacy, induce fear of exposure, and compel compliance by converting the target's body and history into instruments of control.",
        how: "Non-consensual distribution of intimate images to third parties or online platforms. Sending previously private images back to the target as a reminder of power. Pressure or coercion to create additional images under threat of prior material being released.",
        function: "Destroy privacy, induce fear of exposure, and compel compliance by converting the target's body and history into instruments of control.",
        harm: "Destroyed privacy, fear of exposure, and compelled compliance under threat of intimate-image release.",
        why: "Consensual sharing within the original intended audience with no subsequent non-consensual distribution or threat; ordinary non-intimate photographs shared without a control or exposure frame. The conduct here destroys privacy, induces fear of exposure, and compels compliance by converting the target's body and history into instruments of control.",
        example: "Look what I found online\" after content is posted; \"I still have those photos from last year. It would be a shame if your workplace or the kids' school saw them.",
        citation: "Dragiewicz et al. 2018; Henry et al. 2023; Woodlock 2017.",
      }),
      sc("HAR", 4, "Unwanted physical presence and location-based intrusion", {
        definition: "Appearing uninvited or remaining at the target's home, workplace, children's school, or other known locations in a manner that communicates surveillance, entitlement, or menace, functioning to reassert physical proximity, induce fear, and disrupt the target's sense of safety in ordinary spaces.",
        how: "Showing up at the workplace or residence without legitimate purpose, invitation, or knowingly unwanted. Waiting near entrances or vehicles. Repeated drive-bys or loitering that the target experiences as monitoring. Engineered \"coincidental\" encounters at locations the target did not disclose.",
        function: "Reassert physical proximity, induce fear, and disrupt the target's sense of safety in ordinary spaces.",
        harm: "The invasion of physical and psychological territory.",
        why: "Court-ordered or mutually agreed exchanges of children at designated locations when conducted within the terms of the order; genuine, one-time accidental encounters acknowledged as such and not repeated. The conduct here reasserts physical proximity, induces fear, and disrupts the target's sense of safety in ordinary spaces.",
        example: "The abuser appears outside the target's workplace at closing time and later texts, \"Nice to see you leaving. You should smile more.",
        citation: "Stark 2007; Toews & Bermea 2017; Woodlock 2017.",
      }),
      sc("HAR", 5, "Third-party and proxy harassment", {
        definition: "Contacting, following, questioning, or recruiting friends, family members, coworkers, neighbors, or other third parties to obtain information about the target, deliver messages, monitor activities, or apply pressure, thereby extending the control regime through the target's support network.",
        how: "Calls or messages to the target's workplace, coworkers, family, or friends seeking personal information, making allegations, to establish \"my side of the story,\" or to gain the favor of. Instructing or encouraging third parties to report on the target's movements or contacts. Using children or mutual acquaintances as intermediaries for unwanted contact or information-gathering.",
        function: "Isolate the target, assert power and control, gain attention, generate secondary surveillance, and make the social environment itself a site of intrusion.",
        harm: "Cumulative loss of autonomy, safety, and space for action.",
        why: "Ordinary, limited logistical contact with shared providers or family that remains within agreed or court-ordered channels and does not seek extraneous personal information or apply pressure. The conduct here isolates the target, asserts power and control, gains attention, generates secondary surveillance, and makes the social environment itself a site of intrusion.",
        example: "I called your sister and let her know you lied to me. She told me you were out late. Interesting that you didn't mention that.",
        citation: "Dragiewicz et al. 2018; Spearman et al. 2023; Toews & Bermea 2017; Woodlock 2017.",
      }),
      sc("HAR", 6, "Other intentional disturbance of peace", {
        definition: "Any other form of persistent, unwanted interference that functions to disrupt the target's ordinary peace, routines, or sense of safety when the behavior does not fully meet the criteria of HAR-1 through HAR-5 but still operates as harassment within the control regime. This residual category captures multimodal or emerging tactics whose primary effect is the intentional occupation of the target's attention and environment.",
        how: "Combinations of low-level contacts across multiple channels that cumulatively produce the same disruptive effect. Novel or context-specific intrusions (for example, repeated delivery of unwanted items, contacting third parties, interference with utilities or accounts in a non-economic frame, or engineered disruptions of daily routines) when the controlling function is clear.",
        function: "Occupy the target's attention and environment through persistent, unwanted interference that does not fully meet HAR-1 through HAR-5.",
        harm: "Anticipatory tension and the collapse of ordinary peace, even when no single contact looks like flooding, smear, or physical intrusion.",
        why: "Isolated inconveniences without pattern or controlling purpose; ordinary conflicts or logistical friction that lack the intent to disturb peace as a control tactic. The conduct here occupies the target's attention and environment through persistent, unwanted interference that does not fully meet HAR-1 through HAR-5.",
        example: "A series of small, timed interferences (unsolicited packages, account notifications triggered remotely, and brief appearance near a regular route) that together keep the target in a state of anticipatory tension.",
        citation: "Dragiewicz et al. 2018; Harris & Woodlock 2019; Stark 2007; Woodlock 2017.",
      }),
    ],
  },
  {
    id: "PATH",
    slug: "path",
    number: 14,
    name: "Pathologizing",
    blurb:
      "The abuser converts the target's normal responses to abuse, past trauma, or mental-health struggles into proof that the target is the problem. Directed at the target, and to third parties. Distinct from gaslighting, which rewrites reality.",
    literature: "Cooper & Sweet 2025; Freyd 1997; Smith & Freyd 2014; Stark 2007; Sweet 2019.",
    subcodes: [
      sc("PATH", 1, "Mental-health weaponization directed at the target", {
        definition: "The abuser uses mental-health labels, trauma histories, or diagnostic language directly toward the target to destroy credibility, portray the target as unstable, untrustworthy, and unworthy of consideration, and elevate the abuser's own position as the sane, reliable, stable party. The tactic simultaneously attacks the target's internal sense of validation and works to cut off belonging within the relationship and community itself. Real traumatic events or mental-health struggles may be referenced (\"you tried to commit suicide,\" \"even your father sued you\") yet are deployed as weapons rather than as shared concerns.",
        how: "Direct statements that the target is crazy, paranoid, unstable, or mentally ill. Weaponization of prior trauma or diagnoses against the target. References to real events, including suicide attempts, family estrangement, or prior hospitalizations, used to shame or discredit rather than to support. Framing the target's disclosure of abuse or distress as further proof of pathology.",
        function: "Make the target doubt their own perceptions, feel undeserving of support, and accept a diminished status relative to the abuser.",
        harm: "Destroyed internal validation, cut belonging inside the relationship and community, and a target who stops trusting their own account of events.",
        why: "Genuine concern offered without a discrediting function is not this conduct. The conduct here makes the target doubt their own perceptions, feel undeserving of support, and accept a diminished status relative to the abuser.",
        example: "You're having another episode. You tried to kill yourself before and now you're inventing abuse again. No one can trust anything you say when you're like this.",
        citation: "Cooper & Sweet 2025; Stark 2007; Sweet 2019.",
      }),
      sc("PATH", 2, "Pathologizing the target to third parties", {
        definition: "The abuser presents the target to third parties (family, friends, therapists, attorneys, custody evaluators, police, clinicians) as unstable, untrustworthy, or mentally ill in order to destroy the target's credibility with those parties, isolate the target from support and belonging, and elevate the abuser's standing as the credible, concerned party. In litigation-active cases or institutional settings, the abuser may actively recruit or manipulate therapists, attorneys, evaluators, and other professionals. Real traumatic events or mental-health facts may be disclosed selectively (\"she tried to commit suicide,\" \"even her father hates her and sued her\") to paint the target as the problem.",
        how: "Statements to third parties that the target is crazy, unstable, delusional, or a danger. Selective disclosure of real trauma or mental-health history to discredit rather than to seek help for the target. Efforts to influence therapists, custody evaluators, courts, attorneys, or police with pathologizing narratives. Framing the target's credible reports of abuse as symptoms of mental illness.",
        function: "Institutional isolation and the conversion of potential sources of support into agents of discredit.",
        harm: "Institutional isolation. Potential sources of support become agents of discredit.",
        why: "Accurate, non-weaponized sharing of concern for the target's well-being with appropriate professionals, when the primary aim is support rather than control, is not this conduct. The conduct here isolates the target from institutions and converts potential sources of support into agents of discredit.",
        example: "She's been unstable for years. She tried to commit suicide and her own father sued her. Anything she tells you about me comes from that place. I'm the one trying to keep things calm.",
        citation: "Cooper & Sweet 2025; Freyd 1997; Smith & Freyd 2014; Stark 2007; Sweet 2019.",
      }),
    ],
  },
  {
    id: "VPO",
    slug: "vpo",
    number: 15,
    name: "Violation of protective or restraining orders",
    blurb:
      "Protective orders exist to restore liberty. Violation, outright or through technical compliance that defies the order's protective purpose, continues the regime after separation. The message the target receives is that no one, including the court, can provide protection.",
    literature: "Douglas 2018; Katz et al. 2020; Miller & Smolter 2011; Stark 2007.",
    subcodes: [
      sc("VPO", 1, "Outright violation of a protective or restraining order", {
        definition: "Any contact, approach, communication, or conduct that directly breaches the explicit terms of a civil or criminal protective or restraining order.",
        how: "Contact of any kind (in person, electronic, third-party, or via children) when the order prohibits it. Presence at prohibited locations (home, workplace, school, or other protected places). Any communication that the order forbids.",
        function: "Demonstrate that the abuser remains unconstrained by institutional authority, to force continued presence in the target's life, and reassert dominance after formal separation.",
        harm: "The target learns that institutional authority does not constrain the abuser. Forced presence continues after formal separation.",
        why: "Contact that falls strictly inside the order's explicit permissions and contains no control content. Emergency contact required by genuine child safety issues and immediately reported. The conduct here demonstrates that the abuser remains unconstrained by institutional authority, forces continued presence in the target's life, and reasserts dominance after formal separation.",
        example: "The order prohibits all contact. The abuser calls and/or sends repeated messages, appears at the target's home or workplace, or uses a third party to deliver communications.",
        citation: "Douglas 2018; Miller & Smolter 2011; Stark 2007.",
      }),
      sc("VPO", 2, "Marginal or technical compliance that violates the spirit of the order", {
        definition: "Conduct that stays within the boundaries of the literal wording of a protective or restraining order while defying the spirit of its protective purpose. Common forms include transforming child-centered communication limitations into a regime of masked harassment, staging \"coincidental\" appearances, orchestrating or trying to orchestrate joint child-related meetings that the order restricts, framed as \"for the children. \"",
        how: "Permitted contact expanded into masked forms of control. Staged coincidental appearances at locations the target frequents. Pressure for joint attendance at child-related activities.",
        function: "Keep the target engaged and regulated while claiming legal innocence, to test and stretch institutional boundaries, and demonstrate that the order provides no real shield.",
        harm: "The order itself becomes a site of continued domination. Third parties struggle to recognize the control, which increases isolation.",
        why: "Brief, neutral, strictly child-related communication that stays within the order's limits and contains no control or degradation content is not this conduct. The conduct here keeps the target engaged and regulated while claiming legal innocence, tests and stretches institutional boundaries, and demonstrates that the order provides no real shield.",
        example: "As always, I am concerned about our daughter's diet. She told me that you never feed her. Again, I only raise this issue because your neglect is a serious concern. Let me know if you want to discuss.",
        citation: "Katz et al. 2020; Douglas 2018; Miller & Smolter 2011; Stark 2007.",
      }),
    ],
  },

];


export const allSubcodes: Subcode[] = categories.flatMap((c) => c.subcodes);

function resolveSlug(slug: string) {
  const s = slug.toLowerCase();
  if (SLUG_ALIASES[s]) return SLUG_ALIASES[s];
  const m = s.match(/^(econ|coer)-(\d+)$/);
  if (m) return `${SLUG_ALIASES[m[1]]}-${m[2]}`;
  return s;
}

export function getCategory(slug: string) {
  const s = resolveSlug(slug);
  return categories.find((c) => c.slug === s || c.id.toLowerCase() === s);
}

export function getSubcode(slug: string) {
  const s = resolveSlug(slug);
  return allSubcodes.find((c) => c.slug === s || c.id.toLowerCase() === s);
}

const STOPWORDS = new Set([
  "a",
  "an",
  "the",
  "and",
  "or",
  "but",
  "if",
  "to",
  "of",
  "in",
  "on",
  "for",
  "with",
  "from",
  "as",
  "at",
  "by",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "do",
  "does",
  "did",
  "not",
  "no",
  "nor",
  "i",
  "me",
  "my",
  "we",
  "our",
  "you",
  "your",
  "he",
  "him",
  "his",
  "she",
  "her",
  "they",
  "them",
  "their",
  "this",
  "that",
  "these",
  "those",
  "it",
  "its",
  "so",
  "than",
  "then",
  "too",
  "very",
  "can",
  "will",
  "just",
  "about",
  "into",
  "over",
  "also",
  "only",
  "own",
  "same",
  "other",
  "how",
  "what",
  "when",
  "where",
  "who",
  "why",
  "would",
  "could",
  "should",
  "have",
  "has",
  "had",
  "again",
  "always",
  "never",
  "more",
  "some",
  "any",
  "all",
]);

const SYNONYMS: Record<string, string[]> = {
  kid: ["child", "children"],
  kids: ["child", "children"],
  coparent: ["parenting", "child", "children", "custody"],
  coparenting: ["parenting", "child", "children", "custody"],
  mom: ["mother", "family", "parent", "contact"],
  mother: ["family", "parent", "contact"],
  dad: ["father", "family", "parent", "contact"],
  father: ["family", "parent", "contact"],
  parents: ["family", "contact"],
  grandma: ["family", "grandparents"],
  grandpa: ["family", "grandparents"],
  friend: ["friends", "contact", "network"],
  friends: ["friend", "contact", "network"],
  phone: ["device", "devices", "passwords", "accounts", "communication"],
  cellphone: ["device", "devices", "phone"],
  iphone: ["device", "devices", "phone"],
  password: ["passwords", "accounts", "devices"],
  passwords: ["password", "accounts", "devices"],
  instagram: ["platforms", "accounts", "social", "communication"],
  facebook: ["platforms", "accounts", "social"],
  snapchat: ["platforms", "accounts", "social"],
  tiktok: ["platforms", "accounts", "social"],
  email: ["accounts", "communication"],
  text: ["messages", "communication", "flooding"],
  texts: ["messages", "communication", "flooding"],
  texting: ["messages", "communication", "flooding"],
  money: ["financial", "finances", "account", "debt", "economic"],
  bank: ["financial", "account", "finances"],
  paycheck: ["employment", "earnings", "financial"],
  salary: ["employment", "earnings", "financial"],
  job: ["employment", "work"],
  bills: ["financial", "finances"],
  credit: ["debt", "financial"],
  loan: ["debt", "financial"],
  gps: ["whereabouts", "location", "stalking", "surveillance"],
  location: ["whereabouts", "stalking"],
  tracking: ["whereabouts", "surveillance", "stalking"],
  spy: ["surveillance", "stalking", "devices"],
  camera: ["surveillance", "stalking"],
  crazy: ["unstable", "mental", "credibility", "pathologizing"],
  insane: ["unstable", "mental", "credibility"],
  bipolar: ["mental", "pathologizing"],
  gaslight: ["denial", "rewriting", "reality"],
  gaslighting: ["denial", "rewriting", "reality"],
  lovebomb: ["affection"],
  lovebombing: ["affection"],
  bombing: ["affection"],
  honeymoon: ["affection", "apology"],
  sorry: ["apology", "promise"],
  gun: ["weapon", "firearm", "intimidation"],
  guns: ["weapon", "firearm", "intimidation"],
  knife: ["weapon", "intimidation"],
  kill: ["harm", "threat"],
  murder: ["harm", "threat"],
  suicide: ["selfharm", "alive", "threat"],
  abortion: ["reproductive"],
  pregnant: ["reproductive"],
  pregnancy: ["reproductive"],
  condom: ["reproductive"],
  pill: ["reproductive", "birth"],
  sex: ["sexual"],
  rape: ["sexual", "coercion"],
  nudes: ["images", "intimate", "photos"],
  nude: ["images", "intimate", "photos"],
  porn: ["images", "intimate"],
  ice: ["immigration"],
  visa: ["immigration"],
  deport: ["immigration"],
  cps: ["authorities", "welfare"],
  dcs: ["authorities", "welfare"],
  police: ["cops", "authorities"],
  cops: ["police", "authorities"],
  lawyer: ["attorney", "litigation", "court"],
  attorney: ["lawyer", "litigation", "court"],
  court: ["litigation", "judge"],
  judge: ["court", "litigation"],
  custody: ["child", "children", "parenting"],
  tro: ["protective", "restraining", "order"],
  restraining: ["protective", "order"],
  stalking: ["engineered", "presence", "whereabouts"],
  following: ["stalking", "presence"],
  watching: ["stalking", "presence", "whereabouts"],
  cheating: ["triangulation", "partners"],
  affair: ["triangulation", "partners"],
  jealous: ["contact", "friends", "restricting"],
  fat: ["body", "shaming"],
  ugly: ["body", "shaming"],
  stupid: ["insults"],
  chores: ["housework", "domestic"],
  diet: ["food", "body"],
  clothes: ["appearance", "dress"],
  makeup: ["appearance", "dress"],
  car: ["movement", "transportation"],
  keys: ["movement", "transportation"],
  flooding: ["messages", "communication"],
  constantly: ["flooding", "repeated"],
  repeatedly: ["flooding"],
  smashed: ["destruction", "property", "intimidation"],
  broke: ["destruction", "property"],
  dog: ["pets"],
  cat: ["pets"],
  pet: ["pets"],
  go: ["movement"],
  leave: ["movement", "leave"],
  out: ["movement"],
  stay: ["movement", "home"],
  house: ["home", "movement"],
  against: ["leverage", "threat", "children"],
  using: ["leverage", "messengers", "monitors"],
};

function normalize(s: string) {
  return s.toLowerCase().replace(/['’]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

function tokenize(s: string) {
  return normalize(s)
    .split(/\s+/)
    .filter((t) => t.length >= 2 && !STOPWORDS.has(t));
}

function tokenHit(hay: Set<string>, token: string) {
  if (hay.has(token)) return true;
  if (token.length < 5) return false;
  for (const h of hay) {
    if (h.length < 5) continue;
    const [longer, shorter] = h.length >= token.length ? [h, token] : [token, h];
    if (longer.startsWith(shorter) && longer.length - shorter.length <= 3) return true;
  }
  return false;
}

const WEAK = new Set([
  "control",
  "target",
  "abuser",
  "conduct",
  "behavior",
  "pattern",
  "person",
  "people",
  "life",
  "time",
  "used",
  "using",
  "make",
  "made",
  "keep",
  "kept",
  "against",
  "see",
]);

export function searchCodes(q: string) {
  const raw = q.trim();
  if (!raw) return allSubcodes;

  const queryNorm = normalize(raw);
  const queryTokens = tokenize(raw);
  const compactId = queryNorm.replace(/\s+/g, "");
  const tokensToUse = queryTokens.length ? queryTokens : queryNorm.split(/\s+/).filter(Boolean);

  const scored = allSubcodes.map((c) => {
    const cat = categories.find((x) => x.id === c.categoryId);
    const nameHay = `${c.id} ${c.name} ${cat?.name ?? ""} ${cat?.id ?? ""}`;
    const bodyHay = [
      c.definition,
      c.how,
      c.function,
      c.harm,
      c.why,
      c.example,
      c.citation,
      cat?.blurb,
      cat?.literature,
    ]
      .filter(Boolean)
      .join(" ");
    const nameNorm = normalize(nameHay);
    const allNorm = `${nameNorm} ${normalize(bodyHay)}`;
    const nameTokens = new Set(tokenize(nameHay));
    const allTokens = new Set(tokenize(`${nameHay} ${bodyHay}`));

    let score = 0;
    let directHits = 0;
    let anyHits = 0;

    if (c.id.toLowerCase() === compactId || c.slug === compactId) score += 200;
    if (queryNorm.length >= 3 && nameNorm.includes(queryNorm)) score += 70;
    else if (queryNorm.length >= 5 && allNorm.includes(queryNorm)) score += 45;

    for (const t of tokensToUse) {
      const directName = tokenHit(nameTokens, t);
      const directAll = directName || tokenHit(allTokens, t);
      const syn = SYNONYMS[t] ?? [];
      const synName = !directAll && syn.some((v) => tokenHit(nameTokens, v));
      const synAll = !directAll && (synName || syn.some((v) => tokenHit(allTokens, v)));
      const weak = WEAK.has(t) ? 0.25 : 1;
      if (directName) {
        score += 32 * weak;
        directHits += 1;
        anyHits += 1;
      } else if (directAll) {
        score += 16 * weak;
        directHits += 1;
        anyHits += 1;
      } else if (synName) {
        score += 14 * weak;
        anyHits += 1;
      } else if (synAll) {
        score += 6 * weak;
        anyHits += 1;
      }
    }

    if (!anyHits) score = 0;
    return { c, score, directHits };
  });

  return scored
    .filter((row) => row.score >= 10)
    .sort((a, b) => b.score - a.score || b.directHits - a.directHits || a.c.id.localeCompare(b.c.id))
    .slice(0, 16)
    .map((row) => row.c);
}
