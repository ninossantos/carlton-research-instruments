# Handoff for Grok Bot

Add Carlton Research Instruments to the Carlton Research website.

Repository: https://github.com/ninossantos/carlton-research-instruments

Intended public host: https://instruments.carltonresearch.com/

This repository is the instruments app. This is not the Coercive Control Law Tracker. This is not Hopeful Child.

## Task

1. Deploy this repository so https://instruments.carltonresearch.com/ serves the app.
2. Keep the law tracker on https://tracker.carltonresearch.com/ from https://github.com/ninossantos/carlton-research-law-tracker
3. Do not merge the two products into one page.
4. Do not add a second WordPress submenu that duplicates the instrument tabs. The app already has:

   Home · Instruments · Coercive Control Trackers · Services · Insights · About · Contact

5. Request a case review already links to https://carltonresearch.com/contact/
6. If WordPress needs a wrapper page, use one Custom HTML iframe. Do not paste React source into WordPress. Do not add a second menu item for the iframe until Carisa confirms.

Placeholder iframe (swap the `src` if the host differs):

```html
<iframe
  title="Carlton Research Instruments"
  src="https://instruments.carltonresearch.com/"
  style="width:100%;min-height:1400px;border:0;"
  loading="lazy"
></iframe>
```

## Routes to keep live

- `/` instruments home
- `/observatory` Observatory
- `/observatory/:id` jurisdiction dossier
- `/case-fit` Case-fit primer
- `/literature` Literature map
- `/codebook` Is it coercive control?
- `/codebook/:code` behavior page
- `/trainer` Test Your Knowledge

## Do not publish

- PRO, RES, UNCODED
- Include, Exclude, Coding Note
- Any upload of a file, screenshot, export, or document
- Any child name
- Coding-manual teaching copy
- Part III, Version, or codebook catalog language on the public surface

## Copy rules already in the app

- No dummy subjects (it is, there is, there are)
- No em dashes or en dashes
- American English
- Footer: Not diagnostic of a pattern of coercive control. Not legal advice.

## Brand

Carlton Research, LLC  
Principal: Carisa Carlton, M.A.  
Public site: https://carltonresearch.com/
