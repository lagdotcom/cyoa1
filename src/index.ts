import { Story } from "inkjs";
import type { InkList } from "inkjs/engine/InkList";

import { playerGotItem, startAnalytics } from "./analytics";
import inkSrc from "./game.ink";

function initHTML(parent: HTMLElement) {
  const browserDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (browserDark) parent.classList.add("dark");

  const header = parent.getElementsByTagName("header")[0];
  const aside = parent.getElementsByTagName("aside")[0];
  const main = parent.getElementsByTagName("main")[0];

  return { header, aside, main };
}

function mkDiv(parent: HTMLElement, className: string, innerText?: string) {
  const div = document.createElement("div");
  div.className = className;
  if (innerText) div.innerText = innerText;
  parent.appendChild(div);

  return div;
}

function loadEngine(parent: HTMLElement) {
  startAnalytics();

  const { aside, main } = initHTML(parent);

  const story = new Story(inkSrc);

  const outerInventory = mkDiv(aside, "inventory");
  const inventoryLabel = document.createElement("span");
  inventoryLabel.innerText = "Inventory:";
  outerInventory.appendChild(inventoryLabel);
  const inventory = mkDiv(outerInventory, "items", "None");
  const foundItems = new Set();

  story.ObserveVariable("Inventory", (n, v: InkList) => {
    const items = v.orderedItems.map(
      (kv) => kv.Key.itemName ?? kv.Key.fullName,
    );
    inventory.innerText = items.length ? items.join(", ") : "None";

    for (const item of items) {
      if (!foundItems.has(item)) {
        foundItems.add(item);
        playerGotItem(item);
      }
    }
  });

  continueStory();

  function continueStory() {
    const texts = mkDiv(main, "texts");

    while (story.canContinue) {
      const text = story.Continue();
      if (text) mkDiv(texts, "line", text);
    }

    if (story.currentChoices.length) {
      const choices = mkDiv(main, "choices");
      for (const choice of story.currentChoices) {
        const button = document.createElement("button");
        button.className = "choice";
        button.innerText = choice.text;
        choices.appendChild(button);

        button.addEventListener("click", () => {
          story.ChooseChoiceIndex(choice.index);

          main.removeChild(choices);
          // mkDiv(main, "chosen", choice.text);

          continueStory();
        });
      }

      const marker = mkDiv(choices, "marker");
      marker.scrollIntoView();
    } else {
      const marker = mkDiv(texts, "marker");
      marker.scrollIntoView();
    }
  }
}

window.addEventListener("load", () => loadEngine(document.body));
